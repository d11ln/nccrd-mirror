import React from 'react'
import { connect } from 'react-redux'
import {
  ListGroup, ListGroupItem, Input, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter
} from 'mdbreact'
import { apiBaseURL } from "../../../../config/serviceURLs.js"
import { Tree, TreeSelect, Select } from 'antd'

//AntD TreeSelect + Select
// import Tree from 'antd/lib/tree'
// import TreeSelect from 'antd/lib/tree-select'
// import Select from 'antd/lib/select'
// import '../../../../../css/antd.tree.css' //Overrides default antd.tree css
// import '../../../../../css/antd.select.css' //Overrides default antd.select css
const TreeNode = Tree.TreeNode
const TreeSelectNode = TreeSelect.TreeNode
const Option = Select.Option;

const _gf = require("../../../../globalFunctions")
const _ = require('lodash')
const o = require("odata")

const mapStateToProps = (state, props) => {
  let { editListModalData: { show, data, dispatch, persist, type, dependencies, newItemTemplate } } = state
  let user = state.oidc.user
  return { show, data, dispatch, persist, type, dependencies, newItemTemplate, user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditList: (payload) => {
      dispatch({ type: "SET_EDIT_LIST", payload })
    },
    setLoading: (payload) => {
      dispatch({ type: "SET_LOADING", payload })
    },
    dispatchToStore: (key, payload) => {
      dispatch({ type: key, payload })
    }
  }
}

class EditTreeModal extends React.Component {

  constructor(props) {
    super(props)

    this.onSelect = this.onSelect.bind(this)
    this.renderDetails = this.renderDetails.bind(this)
    this.cloneData = this.cloneData.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onExpand = this.onExpand.bind(this)
    this.dependencyTreeSelect = this.dependencyTreeSelect.bind(this)

    this.state = { _data: [], selectedItemId: 0, confirmSave: false, expandedKeys: [] }
  }

  componentDidMount() {
    this.cloneData();
  }

  componentDidUpdate() {
    this.cloneData();
  }

  cloneData() {

    let { data, setEditList } = this.props

    if (data.length > 0) {

      let tmpData = []
      data.map(item => {
        tmpData.push(_.clone(item))
      })

      //Clear items from store
      setEditList({ data: [] })

      //Update local state
      this.setState({ _data: tmpData })
    }
  }

  renderTreeNodes(data) {

    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} />
    })
  }

  renderTreeSelectNodes(data) {

    return data.map((item) => {
      if (item.children) {
        return (
          <TreeSelectNode value={item.text} title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} dataRef={item}>
            {this.renderTreeSelectNodes(item.children)}
          </TreeSelectNode>
        )
      }
      return <TreeSelectNode value={item.text} title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} />
    })
  }

  renderDetails() {

    let { dependencies } = this.props
    let { selectedItemId, _data } = this.state
    let detailElements = []

    if (typeof _data !== 'undefined' && _data.length > 0 && selectedItemId > 0) {

      let idKey = Object.keys(_data[0])[0].toString()
      let valueKey = Object.keys(_data[0])[1].toString()
      let filteredItems = _data.filter(x => x[idKey].toString() === selectedItemId.toString())
      let editDetails = []

      //Fill "editDetail"
      if (filteredItems.length > 0) {
        let item = filteredItems[0]
        Object.keys(item).map(key => {
          editDetails.push({ id: selectedItemId, key: key, value: item[key] })
        })
      }

      //Render "editDetails"
      editDetails.filter(x => x.key !== 'modifiedState').map(item => {
        if (item.key !== editDetails[0].key) {

          //Fix nulls
          if (item.value === null) {
            item.value = ""
          }

          //Look for dependencies
          let deps = dependencies.filter(d => d.key === item.key)
          if (deps.length > 0) {

            let depItem = deps[0]

            //Push label
            detailElements.push(<label key={item.id + "_" + item.key + "_label"} style={{ fontSize: "smaller" }}>{item.key.toString()}</label>)

            if (depItem.type === "std") {
              //If 'std' dependency found - render select
              //Convert value
              let displayValue = "Select..."
              if (item.value > 0) {
                let dataItem = depItem.value.filter(x => x[Object.keys(x)[0]] === item.value)[0]
                if (typeof dataItem !== 'undefined' && dataItem !== null && typeof dataItem[Object.keys(dataItem)[1]] !== 'undefined') {
                  displayValue = dataItem[Object.keys(dataItem)[1]]
                }
              }

              detailElements.push(
                <Select
                  key={item.id + "_" + item.key + "_select"}
                  style={{ width: "100%", marginBottom: "25px" }}
                  onChange={this.dependencySelect.bind(this, item.key)}
                  value={displayValue}
                >
                  {this.renderSelectOptions(depItem.value, item.key)}
                </Select>
              )

              detailElements.push(<br key={item.id + "_" + item.key + "break"} />)
            }
            else if (depItem.type === "tree") {
              //If 'tree' dependency found - render select-tree
              let treeData = []
              let selVal = []

              if (_data.length > 0) {
                treeData = this.transformDataTree(depItem.value)
              }

              //Get selected value
              let currentItem = _data.filter(x => x[idKey] == this.state.selectedItemId)[0]
              if (typeof currentItem !== 'undefined') {

                let valObj = depItem.value.filter(x => x[idKey] == currentItem[item.key])[0]
                if (typeof valObj !== 'undefined') {

                  selVal = valObj[valueKey]
                }
              }

              detailElements.push(
                <TreeSelect
                  key={item.id + "_" + item.key + "_tree_select"}
                  showSearch
                  searchPlaceholder="Search..."
                  style={{ width: "100%", marginBottom: "25px" }}
                  value={selVal}
                  dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                  placeholder="Select..."
                  allowClear
                  onChange={this.dependencyTreeSelect.bind(this, item.key)}
                >
                  {this.renderTreeSelectNodes(treeData)}
                </TreeSelect>
              )
            }
          }
          else {

            // If no dependency found - render input
            detailElements.push(
              <div key={item.id + "_" + item.key + "_input"} style={{ marginRight: "15px" }}>
                <label>{item.key.toString()}</label>
                <Input value={item.value.toString()}
                  style={{ marginTop: "-25px", border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                  onChange={this.valueChange.bind(this, item.id, item.key)} />
              </div>
            )
          }
        }
      })
    }

    return detailElements
  }

  renderSelectOptions(data, key) {

    let ar = []

    if (typeof data !== 'undefined') {

      let procData = this.processData(data)
      for (let i of procData) {
        ar.push(
          <Option key={i.id} value={i.value}>
            {i.value}
          </Option>
        )
      }
    }

    return ar
  }

  processData(data) {

    let processedItems = []

    //Pre-process items
    data.map(item => {
      processedItems.push({
        id: item[Object.keys(item)[0]],
        value: item[Object.keys(item)[1]]
      })
    })

    return processedItems
  }

  onSelect(selectedKeys, info) {

    let id = selectedKeys[0]

    if (typeof id === 'undefined') {
      id = 0
    }

    this.setState({ selectedItemId: id })
  }

  valueChange(id, key, e) {

    let { _data } = this.state
    let newValue = e.target.value

    //Update changed data items
    let filteredItems = _data.filter(x => x[Object.keys(x)[0]].toString() === id.toString())
    if (filteredItems.length > 0) {

      //Update with changed value
      filteredItems[0][key.toString()] = newValue
      filteredItems[0].modifiedState = true
    }

    //Update state
    this.setState({ _data: _data })
  }

  recursiveTreeSearch(nodes, searchId) {

    let searchNodes = nodes.filter(x => x.id.toString() === searchId.toString())

    nodes.map(x => {
      if (searchNodes.length == 0 && typeof x.children !== 'undefined') {

        let children = this.recursiveTreeSearch(x.children, searchId)
        if (children.length > 0) {
          searchNodes.push(...children)
        }
      }
    })

    return searchNodes
  }

  dependencySelect(key, value) {

    let selectedValue = 0
    let { _data, selectedItemId } = this.state
    let { dependencies } = this.props
    let depData = null

    //Get select data
    let depItem = dependencies.filter(d => d.key === key)[0]
    if (typeof depItem != 'undefined') {
      depData = depItem.value
    }

    //Convert value
    if (value !== null && depData !== null) {
      let dataItem = depData.filter(x => x[Object.keys(x)[1]] === value)[0]
      if (typeof dataItem !== 'undefined' && dataItem !== null) {
        selectedValue = parseInt(dataItem[Object.keys(dataItem)[0]])
      }
    }

    let idKey = Object.keys(_data[0])[0]
    let currentItem = _data.filter(x => x[idKey] == selectedItemId)[0]
    if (typeof currentItem !== 'undefined') {

      //Update with changed value
      currentItem[key] = selectedValue
      currentItem.modifiedState = true

      //Update state
      this.setState({ _data: _data })
    }
  }

  dependencyTreeSelect(key, value, label, extra) {

    let { _data, selectedItemId, expandedKeys } = this.state
    let selectedId = null
    let idKey = Object.keys(_data[0])[0].toString()
    let parentIdKey = 'Parent' + idKey
    let currentItem = _data.filter(x => x[idKey] == selectedItemId)[0]

    if (typeof extra.triggerNode !== 'undefined') {
      selectedId = extra.triggerNode.props.eventKey
    }

    if (typeof currentItem !== 'undefined') {

      //Fix own-parent loop
      if (key === parentIdKey && selectedId == currentItem[idKey]) {
        selectedId = null
      }

      //Update with changed value (if different)
      if (currentItem[key] != selectedId) {
        currentItem[key] = selectedId
        currentItem.modifiedState = true
      }

      //Update state
      this.setState({ _data: _data, expandedKeys: [...expandedKeys, selectedId !== null ? selectedId : ""] })


    }
  }

  cancel() {

    //Reset state
    this.setState({ selectedItemId: 0, confirmSave: false, _data: [] })

    //Close modal
    let { setEditList } = this.props
    setEditList({ show: false })
  }

  save() {
    //Toggle confirm save 
    this.setState({ confirmSave: true })
  }

  cancelConfirm() {
    //Toggle confirm save 
    this.setState({ confirmSave: false })
  }

  confirmSave() {

    let { dispatchToStore, dispatch, persist, setLoading, data, user } = this.props
    let { _data } = this.state

    //Update items
    setLoading(true)

    //Get changed items
    let postData = { Id: 123456 }
    let postDataItems = []
    _data.filter(x => x.modifiedState === true).forEach(x => {
      let clone = _.clone(x)
      delete clone.modifiedState
      postDataItems.push(clone)
    })
    postData[persist] = postDataItems

    //Prep post params
    let url = apiBaseURL + "Lookups"

    //Handle error messages with error-config in order 
    //to get error message back and not just code
    o().config({
      error: (code, error) => {
        //Try to get & parse error message
        let errorJS = JSON.parse(error)
        let message = errorJS.value
        if (typeof message === 'undefined') message = errorJS.error.message
        if (typeof message === 'undefined') message = "(See log for error details)"

        //Log error message & details
        alert("Unable to save changes.\n\n" + message)
        console.error("Unable to save changes", code, errorJS)
      }
    })

    o(apiBaseURL + "Lookups")
      .post(postData)
      .save(
        (data) => {
          //Success
          o().config({ error: null }) //Reset error config

          //Toggle confirm save 
          this.setState({ confirmSave: false })

          //Merge changes into props
          let merged = _.merge(_data)
          let valueKey = Object.keys(merged[0])[1].toString()
          merged = _.orderBy(merged, valueKey, 'asc'); // Use Lodash to sort array by 'Value'

          //Dispatch to store
          dispatchToStore(dispatch, merged)

          setLoading(false)

          //Close modal
          let { setEditList } = this.props
          setEditList({ show: false })
        },
        (status) => {
          //Failed
          o().config({ error: null }) //Reset error config
          setLoading(false)
        }
      )
  }

  add() {

    //Add new item
    let { newItemTemplate } = this.props
    let { _data, selectedItemId } = this.state

    //Clone existing item
    let newItem = _.clone(newItemTemplate)

    //Clear values
    Object.keys(newItem).map(key => {
      newItem[key] = 0
    })

    //Setup and insert data item
    let newItemId = _gf.getRndInteger(1111111, 9999999)
    let newItemText = "Item_" + newItemId.toString() //"ENTER VALUE HERE"
    newItem[Object.keys(newItem)[0]] = newItemId
    newItem[Object.keys(newItem)[1]] = newItemText
    newItem.modifiedState = true

    if (typeof selectedItemId !== 'undefined' && selectedItemId > 0) {
      newItem['Parent' + Object.keys(newItem)[0]] = selectedItemId
    }
    else {
      newItem['Parent' + Object.keys(newItem)[0]] = null
    }

    _data.splice(0, 0, newItem)

    //Update state
    this.setState({ _data: [..._data], selectedItemId: newItemId })
  }

  transformDataTree(effectiveData, globalData, level = 0) {


    let treeNodes = []
    let parentIdKey = "Parent" + Object.keys(effectiveData[0])[0].toString()

    if (typeof globalData === 'undefined') {
      globalData = effectiveData
    }

    if (level === 0) {
      effectiveData = effectiveData.filter(x => x[parentIdKey] === null)
    }

    effectiveData.map(item => {

      let newTreeNode = {
        id: item[Object.keys(item)[0]],
        text: item[Object.keys(item)[1]],
        modifiedState: item.modifiedState
      }

      let children = globalData.filter(x => x[parentIdKey] == newTreeNode.id)
      if (children.length > 0) {
        newTreeNode.children = this.transformDataTree(children, globalData, (level + 1))
      }

      treeNodes.push(newTreeNode)
    })

    return treeNodes
  }

  getParentKeys(id, data) {

    let parentKeys = []

    if (data.length > 0 && id > 0) {

      let idKey = Object.keys(data[0])[0].toString()
      let parentIdKey = "Parent" + idKey

      let selectedItem = data.filter(x => x[idKey] == id)[0]

      if (selectedItem[parentIdKey] !== null) {
        let parentId = selectedItem[parentIdKey].toString()
        parentKeys.push(parentId)
        parentKeys.push(...this.getParentKeys(parentId, data))
      }
    }

    return parentKeys
  }

  onExpand(expandedKeys) {
    this.setState({ expandedKeys: expandedKeys })
  }

  render() {

    let { show } = this.props
    let { confirmSave, editDetails, _data, selectedItemId, expandedKeys } = this.state

    let treeData = []
    if (_data.length > 0) {
      treeData = this.transformDataTree(_data)
    }

    return (
      <>
        <Container>
          <Modal fade={false} isOpen={show} toggle={this.cancel} size="fluid" style={{ width: "80%" }} >

            <ModalHeader toggle={this.cancel}>Edit list values</ModalHeader>

            <ModalBody height="80%">
              <div className="row">

                <div className="col-md-4" style={{ overflowY: "auto", height: "65vh", fontSize: "large" }}>
                  <h5 style={{ marginBottom: "15px", textDecoration: "underline" }}>Select item to edit:</h5>
                  <Tree key={_gf.GetUID()}
                    onSelect={this.onSelect}
                    defaultSelectedKeys={[selectedItemId.toString()]}
                    defaultExpandedKeys={[...expandedKeys, ...this.getParentKeys(selectedItemId, _data), selectedItemId.toString()]}
                    onExpand={this.onExpand}
                  >
                    {this.renderTreeNodes(treeData)}
                  </Tree>
                </div>

                <div className="col-md-8" style={{ borderLeft: "solid 1px", overflowY: "auto", height: "65vh" }}>
                  <h5 style={{ marginBottom: "25px", textDecoration: "underline" }}>Edit item details:</h5>
                  {this.renderDetails()}
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="col-md-4" hidden={confirmSave}>
                <Button size="sm" color="default" onClick={this.add.bind(this)}>
                  &nbsp;&nbsp;Add {selectedItemId === 0 ? "root item" : "child item"}&nbsp;&nbsp;
                                </Button>
              </div>

              <div className="col-md-8">
                <div hidden={confirmSave} style={{ float: "right" }}>
                  <Button size="sm" color="warning" onClick={this.save.bind(this)}>&nbsp;&nbsp;Save&nbsp;&nbsp;</Button>
                  <Button size="sm" color="secondary" onClick={this.cancel.bind(this)}>Cancel</Button>
                </div>
                <div hidden={!confirmSave} style={{ float: "right" }}>
                  <label>Please confirm to save changes?&nbsp;</label>
                  <Button size="sm" color="warning" onClick={this.confirmSave.bind(this)}>Confirm</Button>
                  <Button size="sm" color="secondary" onClick={this.cancelConfirm.bind(this)}>Cancel</Button>
                </div>
              </div>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTreeModal)