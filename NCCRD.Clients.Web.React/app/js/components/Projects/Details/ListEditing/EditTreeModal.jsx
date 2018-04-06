'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import { apiBaseURL } from "../constants/apiBaseURL"
import * as ACTION_TYPES from "../constants/action-types"
import Select from 'react-select'

const _ = require('lodash')

const mapStateToProps = (state, props) => {
  let { editListModalData: { show, data, treeData, dispatch, persist, type, dependencies } } = state
  return { show, data, treeData, dispatch, persist, type, dependencies }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditList: (payload) => {
      dispatch({ type: ACTION_TYPES.SET_EDIT_LIST, payload })
    },
    setLoading: (payload) => {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
    },
    dispatchToStore: (key, payload) => {
      dispatch({ type: key, payload })
    }
  }
}

let changedItems = []

class EditTreeModal extends React.Component {

  constructor(props) {
    super(props)

    this.cancel = this.cancel.bind(this)
    this.renderList = this.renderList.bind(this)
    this.renderDetails = this.renderDetails.bind(this)
    // this.fillTree = this.fillTree.bind(this)

    changedItems = []
    this.state = { selectedItemId: 0, confirmSave: false }
  }

  save() {
    //Toggle confirm save 
    this.setState({ confirmSave: true })
  }

  valueChange(id, key, e) {

    let { data } = this.props
    let newValue = e.target.value

    //Update changed item
    let filteredItems = data.filter(x => x[Object.keys(x)[0]] === id)
    if (filteredItems.length > 0) {

      //Clone source item
      let changedItem = changedItems.filter(x => x[Object.keys(x)[0]] === id)[0]
      if (typeof changedItem === 'undefined') {
        changedItem = _.clone(filteredItems[0])
      }

      //Update with changed value
      changedItem[key.toString()] = newValue

      //Merge with existing changes
      changedItems = changedItems.filter(x => x[Object.keys(x)[0]] !== id)
      changedItems.push(changedItem)
    }
  }

  // componentDidUpdate() {
  //   this.fillTree()
  // }

  confirmSave() {

    let { dispatchToStore, dispatch, persist, setLoading } = this.props

    //Update items
    setLoading(true)

    console.log("changedItems:", changedItems)

    //let strPostData = JSON.stringify(items.filter(x => x.id > 0))
    //let url = apiBaseURL + persist

    //Save items to DB
    // return fetch(url, {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: strPostData
    // })
    //   .then((res) => res.json())
    //   .then((res) => {

    //     setLoading(false)

    //     if (res === true) {

    //       //Saved successully...

    //       //Toggle confirm save 
    //       this.setState({ confirmSave: false })

    //       //Dispatch to store
    //       dispatchToStore(dispatch, items)

    //       //Close modal
    //       let { setEditList } = this.props
    //       setEditList({ show: false })

    //     }
    //     else {

    //       //Save failed...

    //       alert("Unable to save changes. See log for details.")
    //       console.log("ERROR:", res)
    //     }
    //   })
  }

  cancelConfirm() {
    this.setState({ confirmSave: false })
  }

  cancel() {

    //Reset state
    changedItems = []
    this.setState({ selectedItemId: 0, confirmSave: false })

    //Close modal
    let { setEditList } = this.props
    setEditList({ show: false })
  }

  // GetUID() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }

  listItemClick(id, e) {
    this.setState({ selectedItemId: id })
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

  // getDependencyItems(options, e) {
  //   let items = []

  //   if (typeof options !== 'undefined' && options !== null)
  //     options.map(item => {
  //       items.push({
  //         value: item[Object.keys(item)[0]],
  //         label: item[Object.keys(item)[1]]
  //       })
  //     })

  //   return items
  // }

  // treeItemClick(tree, dispatch = true) {

  //   let selectedNodeId = tree.getSelections()[0]
  //   let { loadSectorFilter } = this.props

  //   if (typeof selectedNodeId !== 'undefined') {

  //     //Get node data
  //     let nodeData = tree.getDataById(selectedNodeId)

  //     //Dispatch to store
  //     if (dispatch === true) {
  //       loadSectorFilter(nodeData.id)
  //     }
  //   }
  //   else {

  //     if (dispatch === true) {

  //       //Dispatch to store
  //       loadSectorFilter(0)
  //     }
  //   }
  // }

  // fillTree() {

  //   const { treeData } = this.props

  //   if (typeof treeData !== 'undefined' && typeof treeData.dataSource !== 'undefined') {

  //     $('#treeList').tree(treeData)

  //     //Setup tree events
  //     // let tree = $('#treeList').tree()

  //     // if (this.state.eventsAdded === 0 && typeof tree !== 'undefined') {
  //     //     this.state.eventsAdded = 1
  //     //     tree.on("click", () => this.onClick(tree))

  //     //     this.setSelectedNode(tree)
  //     //     this.onClick(tree, false)

  //     //     //Save tree to state - for later reference/use
  //     //     this.setState({ tree: tree })
  //     // }
  //   }
  // }

  renderList(processedItems) {

    let { type } = this.props

    if (type === 'std') {
      let listItems = []

      //Render standard list items
      processedItems.map(item => {
        if (item.id > 0) {
          let { selectedItemId } = this.state
          listItems.push(<ListGroupItem style={{ cursor: "pointer" }}
            hover="true"
            onClick={this.listItemClick.bind(this, item.id)}
            key={item.id}
            active={selectedItemId === item.id}
          >&nbsp;{item.value}</ListGroupItem>)
        }
      })

      return (<ListGroup>{listItems}</ListGroup>)
    }
  }

  renderDetails() {

    let { type, dependencies, data } = this.props
    let { selectedItemId } = this.state

    let filteredItems = data.filter(x => x[Object.keys(x)[0]] === selectedItemId)
    let editDetails = []
    let detailElements = []

    //Fill "editDetail"
    if (filteredItems.length > 0) {
      let item = filteredItems[0]
      Object.keys(item).map(key => {
        editDetails.push({ id: selectedItemId, key: key, value: item[key] })
      })
    }

    //Render "editDetails"
    editDetails.map(item => {
      if (item.key !== editDetails[0].key) {

        //Transpose changes
        let tChanges = changedItems.filter(x => x[Object.keys(x)[0]].toString() === selectedItemId.toString())
        if (tChanges.length > 0) {
          item.value = tChanges[0][item.key]
        }

        //Fix nulls
        if (item.value === null) {
          item.value = ""
        }

        //Look for dependency matches
        let deps = dependencies.filter(d => d.key === item.key)
        if (deps.length > 0) {

          //If match found - render select
          // detailElements.push(<label key={this.GetUID()} style={{ fontSize: "smaller" }}>{item.key.toString()}</label>)
          // detailElements.push(<Select key={this.GetUID()}
          //   value={item.value.toString()}
          //   options={this.selectOptions(deps[0].value)}
          //   // onChange={this.onSelect}
          //   style={{ marginBottom: "20px" }}
          // />)
        }
        else {

          //If not match found - render input
          detailElements.push(
            <Input key={item.id + "_" + item.key + "_input"} label={item.key.toString()} defaultValue={item.value.toString()}
              onChange={this.valueChange.bind(this, item.id, item.key)} />)
        }
      }
    })

    return detailElements
  }

  render() {

    let { show, data, type } = this.props
    let { confirmSave, editDetails } = this.state
    let processedItems = this.processData(data)

    return (
      <div>
        <Modal isOpen={show} toggle={this.cancel} size="fluid" style={{ width: "80%" }} >

          <ModalHeader toggle={this.cancel}>Edit list values</ModalHeader>

          <ModalBody height="80%">
            <div className="row">
              <div hidden={type !== "std"} className="col-md-4" style={{ overflowY: "auto", height: "65vh" }}>
                <h5 style={{ marginBottom: "15px", textDecoration: "underline" }}>Select item to edit:</h5>
                {this.renderList(processedItems)}
              </div>

              <div id="treeList" hidden={type !== "tree"} className="col-md-4" style={{ overflowY: "auto", height: "65vh" }}>
                {/* tree data here */}
              </div>

              <div className="col-md-8" style={{ borderLeft: "solid 1px", overflowY: "auto", height: "65vh" }}>
                <h5 style={{ marginBottom: "25px", textDecoration: "underline" }}>Edit item details:</h5>
                {this.renderDetails()}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <div hidden={confirmSave} style={{ float: "right" }}>
              <Button size="sm" color="warning" onClick={this.save.bind(this)}>&nbsp;&nbsp;Save&nbsp;&nbsp;</Button>
              <Button size="sm" color="secondary" onClick={this.cancel.bind(this)}>Cancel</Button>
            </div>
            <div hidden={!confirmSave} style={{ float: "right" }}>
              <label>Please confirm to save changes?&nbsp;</label>
              <Button size="sm" color="warning" onClick={this.confirmSave.bind(this)}>Confirm</Button>
              <Button size="sm" color="secondary" onClick={this.cancelConfirm.bind(this)}>Cancel</Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTreeModal)