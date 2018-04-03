'use strict'

import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../constants/action-types"

const mapStateToProps = (state, props) => {
    let { globalData: { editMode } } = state
    let editListModalStateChanged = state.editListModalData.show
    return { editMode, editListModalStateChanged }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedValue: (key, payload) => {
            dispatch({ type: key, payload })
        },
        setEditList: (payload) => {
            dispatch({ type: ACTION_TYPES.SET_EDIT_LIST, payload })
        }
    }
}

class SelectComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this)
        this.getDisabledState = this.getDisabledState.bind(this)
    }

    preProcessData(data) {

        let preProcessedItems = []

        //Pre-process items
        data.map(item => {

            let parentKeys = Object.keys(item).filter(key => key.startsWith("Parent") && key.endsWith("Id"))

            if (parentKeys.length > 0) {
                //Push item with parentId
                preProcessedItems.push({
                    id: item[Object.keys(item)[0]],
                    value: item[Object.keys(item)[1]],
                    parentId: item[parentKeys[0]]
                })
            }
            else {
                //Push item without parentId
                preProcessedItems.push({
                    id: item[Object.keys(item)[0]],
                    value: item[Object.keys(item)[1]],
                    parentId: null
                })
            }
        })

        return preProcessedItems
    }

    selectOptions(data) {

        //const { data } = this.props
        let ar = []

        if (typeof data !== 'undefined') {

            let procData = this.preProcessData(data) //data

            //Insert "[Edit list values...]" entry
            if (procData.filter(x => x.value === "[Edit list values...]").length === 0) {
                procData.splice(0, 0, {
                    "id": -1,
                    "value": "[Edit list values...]",
                })
            }

            for (let i of procData) {
                ar.push({ value: i.id, label: i.value })
            }
        }

        return ar
    }

    getFontColour() {
        if (this.props.editMode) {
            return "steelblue"
        }
        else {
            return "black"
        }
    }

    onSelect(selectedOption) {

        let selectedValue = 0
        if (selectedOption !== null) {
            selectedValue = selectedOption.value
        }

        if (selectedValue === -1) {
            //Setup and Show EditListModal
            let { setEditList, data, treeData, dispatch, persist, type, dependencies } = this.props

            if (typeof type === 'undefined') {
                type = "std"
            }
            if (typeof dependencies === 'undefined') {
                dependencies = []
            }

            setEditList({
                show: true, data: data, treeData: treeData, dispatch: dispatch, persist: persist, type: type,
                dependencies: dependencies
            })
        }
        else {
            //Dispatch to store
            let { setSelectedValueKey, setSelectedValue } = this.props
            if (typeof this.props.setSelectedValueKey !== 'undefined') {
                setSelectedValue(setSelectedValueKey, { value: selectedValue, id: this.props.parentId })
            }
        }
    }

    getDisabledState() {
        let { editMode, editModeOverride } = this.props

        let disabledState = true

        if (typeof editModeOverride !== "undefined" && editModeOverride === true) {
            disabledState = false
        }
        else if (typeof editMode !== "undefined" && editMode === true) {
            disabledState = false
        }

        return disabledState
    }

    render() {

        let { col, label, id, onChange, selectedValue, data } = this.props

        return (
            <div className={col}>
                <label style={{ fontWeight: "bold" }}>{label}</label>
                <Select id={id}
                    disabled={this.getDisabledState()}
                    name={id}
                    value={selectedValue}
                    options={this.selectOptions(data)}
                    onChange={this.onSelect}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent)