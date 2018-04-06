'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import { apiBaseURL } from "../../../../constants/apiBaseURL"
import * as ACTION_TYPES from "../../../../constants/action-types"
import Select from 'react-select'

const _ = require('lodash')

const mapStateToProps = (state, props) => {
  let { editListModalData: { show, data, dispatch, persist, dependencies, newItemTemplate } } = state
  return { show, data, dispatch, persist, dependencies, newItemTemplate }
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

class EditListModal extends React.Component {

  constructor(props) {
    super(props)

    this.cancel = this.cancel.bind(this)
    this.renderList = this.renderList.bind(this)
    this.renderDetails = this.renderDetails.bind(this)
    this.dependencySelect = this.dependencySelect.bind(this)    

    this.state = { _data: [], selectedItemId: 0, confirmSave: false }
  }

  GetUID() {
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //   var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //   return v.toString(16);
    // })

    return new Date().valueOf()
  }

  componentDidUpdate() {

    let { data, setEditList } = this.props

    if (data.length > 0) {

      let tmpData = [] //_.clone(data)
      data.map(item => {
        tmpData.push(_.clone(item))
      })

      //Clear items from store
      setEditList({ data: [] })

      //Update local state
      this.setState({ _data: tmpData })
    }
  }

  add() {

    //Add new item
    let { newItemTemplate } = this.props
    let { _data } = this.state

    //Clone existing item
    let newItem = _.clone(newItemTemplate)

    //Clear values
    Object.keys(newItem).map(key => {
      newItem[key] = ""
    })

    //Set Id to GUID
    let newItemId = this.GetUID()
    newItem[Object.keys(newItem)[0]] = newItemId
    newItem[Object.keys(newItem)[1]] = "ENTER VALUE HERE"
    newItem.modifiedState = true

    //Update state
    _data.splice(0, 0, newItem)
    this.setState({ _data: _data, selectedItemId: newItemId })
  }

  save() {
    //Toggle confirm save 
    this.setState({ confirmSave: true })
  }

  valueChange(id, key, e) {

    let { _data } = this.state
    let newValue = e.target.value

    //Update changed item
    let filteredItems = _data.filter(x => x[Object.keys(x)[0]] === id)
    if (filteredItems.length > 0) {

      //Update with changed value
      filteredItems[0][key.toString()] = newValue
      filteredItems[0].modifiedState = true

      //Update state
      this.setState({ _data: _data })
    }
  }

  dependencySelect(key, selectedOption) {

    let selectedValue = 0
    let { _data, selectedItemId } = this.state

    if (selectedOption !== null) {
      selectedValue = selectedOption.value
    }

    let currentItem = _data.filter(x => x[Object.keys(x)[0]] === selectedItemId)[0]
    if(typeof currentItem !== 'undefined'){

      //Update with changed value
      currentItem[key] = selectedValue
      currentItem.modifiedState = true

      //Update state
      this.setState({ _data: _data })
    }

  }

  confirmSave() {

    let { dispatchToStore, dispatch, persist, setLoading, data } = this.props
    let { _data } = this.state

    //Update items
    setLoading(true)

    //Get changed items
    let changedItems = _data.filter(x => x.modifiedState === true)

    //Prep post params
    let strPostData = JSON.stringify(changedItems)
    let url = apiBaseURL + persist

    //Save items to DB
    return fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: strPostData
    })
      .then((res) => res.json())
      .then((res) => {

        setLoading(false)

        if (res === true) {

          //Saved successully...

          //Toggle confirm save 
          this.setState({ confirmSave: false })

          //Merge changes into props
          let merged = _.merge(_data)

          //Dispatch to store
          dispatchToStore(dispatch, merged)

          //Close modal
          let { setEditList } = this.props
          setEditList({ show: false })

        }
        else {

          //Save failed...
          alert("Unable to save changes. See log for details.")
          console.log("ERROR:", res)
        }
      })
  }

  cancelConfirm() {
    this.setState({ confirmSave: false })
  }

  cancel() {

    //Reset state
    this.setState({ selectedItemId: 0, confirmSave: false, _data: [] })

    //Close modal
    let { setEditList } = this.props
    setEditList({ show: false })
  }

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

  renderSelectOptions(data) {

    let ar = []

    if (typeof data !== 'undefined') {

      let procData = this.processData(data)
      for (let i of procData) {
        ar.push({ value: i.id, label: i.value })
      }
    }

    return ar
  }

  renderList() {

    let processedItems = this.processData(this.state._data)
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

  renderDetails() {

    let { type, dependencies } = this.props
    let { selectedItemId, _data } = this.state

    let filteredItems = _data.filter(x => x[Object.keys(x)[0]] === selectedItemId)
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
    editDetails.filter(x => x.key !== 'modifiedState').map(item => {
      if (item.key !== editDetails[0].key) {

        //Fix nulls
        if (item.value === null) {
          item.value = ""
        }

        //Look for dependencies
        let deps = dependencies.filter(d => d.key === item.key)
        if (deps.length > 0) {

          //If dependency found - render select
          detailElements.push(<label key={this.GetUID()} style={{ fontSize: "smaller" }}>{item.key.toString()}</label>)
          detailElements.push(<Select key={item.id + "_" + item.key + "_select"}
            value={item.value.toString()}
            options={this.renderSelectOptions(deps[0].value)}
            onChange={this.dependencySelect.bind(this, item.key)}
            style={{ marginBottom: "25px" }}
          />)
        }
        else {

          //If no dependency found - render input
          detailElements.push(
            <Input key={item.id + "_" + item.key + "_input"} label={item.key.toString()} defaultValue={item.value.toString()}
              onChange={this.valueChange.bind(this, item.id, item.key)} />)
        }
      }
    })

    return detailElements
  }

  render() {

    let { show } = this.props
    let { confirmSave, editDetails, _data } = this.state

    return (
      <div>
        <Modal isOpen={show} toggle={this.cancel} size="fluid" style={{ width: "80%" }} >

          <ModalHeader toggle={this.cancel}>Edit list values</ModalHeader>

          <ModalBody height="80%">
            <div className="row">
              <div className="col-md-4" style={{ overflowY: "auto", height: "65vh" }}>
                <h5 style={{ marginBottom: "15px", textDecoration: "underline" }}>Select item to edit:</h5>
                {this.renderList()}
              </div>

              <div className="col-md-8" style={{ borderLeft: "solid 1px", overflowY: "auto", height: "65vh" }}>
                <h5 style={{ marginBottom: "25px", textDecoration: "underline" }}>Edit item details:</h5>
                {this.renderDetails()}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="col-md-2" hidden={confirmSave}>
              <Button size="sm" color="primary" onClick={this.add.bind(this)}>&nbsp;&nbsp;Add&nbsp;&nbsp;</Button>
            </div>

            <div className="col-md-10">
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListModal)