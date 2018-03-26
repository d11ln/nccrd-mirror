'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import { apiBaseURL } from "../constants/apiBaseURL"
import * as ACTION_TYPES from "../constants/action-types"

const mapStateToProps = (state, props) => {
    let { editListModalData: { show, items, dispatch, persist } } = state
    return { show, items, dispatch, persist }
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

        this.state = { items: [], confirmSave: false, editing: false }
    }

    componentDidUpdate() {

        let { items, setEditList } = this.props

        if (items.length > 0) {

            let newItems = []

            items.map(item => {
                newItems.push({ id: item.id, value: item.value })
            })

            //Clear items from store
            setEditList({ items: [] })

            //Update local state
            this.setState({ items: newItems })
        }
    }

    valueChange(id, e) {

        let { items } = this.state
        let newValue = e.target.value

        //Update changed item
        let changedItems = items.filter(x => x.id === id)
        if (changedItems.length > 0) {
            changedItems[0].value = newValue
        }

        //Refresh state
        this.setState({ items: items, editing: true })
    }

    save() {

        //Toggle confirm save 
        this.setState({ confirmSave: true })
    }

    confirmSave() {

        let { dispatchToStore, dispatch, persist, setLoading } = this.props
        let { items } = this.state

        setLoading(true)

        let strPostData = JSON.stringify(items.filter(x => x.id > 0))
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
                   
                    //Dispatch to store
                    dispatchToStore(dispatch, items)

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

        //Close modal
        let { setEditList } = this.props
        setEditList({ show: false })
    }

    renderItems() {

        let { show } = this.props
        let { items } = this.state

        if (show) {

            let itemJSX = []

            items.map((item) => {

                if (item.id > 0) {

                    itemJSX.push(
                        <input
                            key={item.id}
                            type="text"
                            value={item.value}
                            onChange={this.valueChange.bind(this, item.id)}
                        />
                    )
                }
            })

            return itemJSX
        }
        else {
            return <div />
        }
    }

    render() {

        let { show } = this.props
        let { items, confirmSave } = this.state

        return (
            <div>
                <Modal isOpen={show} role="dialog" >
                    <ModalHeader>Edit list values</ModalHeader>
                    <ModalBody>
                        {this.renderItems()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditListModal)