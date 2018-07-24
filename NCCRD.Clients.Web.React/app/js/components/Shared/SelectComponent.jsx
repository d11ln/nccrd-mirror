'use strict'

import React from 'react'
import { Select, SelectInput, SelectOptions, SelectOption } from 'mdbreact';
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../constants/action-types"
import { UILookup } from "../../constants/ui_config.js"

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

let allowChange = false

class SelectComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this)
        this.getDisabledState = this.getDisabledState.bind(this)
        this.onClick = this.onClick.bind(this);
        this.otherDropdownsClose = this.otherDropdownsClose.bind(this);
    }

    onClick(e) {

        if(this.getDisabledState()){
            return;
        }

        // check if select is multiple
        if (e.target.dataset.multiple === 'true') {
            return;
        }

        if (e.target.classList.contains('select-dropdown')) {
            this.otherDropdownsClose();
            e.target.nextElementSibling.classList.add('fadeIn');
        } else {
            this.otherDropdownsClose();
        }
    }

    otherDropdownsClose() {
        let dropdowns = document.querySelectorAll('.dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('fadeIn')) {
                dropdowns[i].classList.remove('fadeIn');
            }
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
    }

    componentDidUpdate() {

        let { selectedValue, data } = this.props

        if (selectedValue !== 0 && this.preProcessData(data).filter(x => x.id === selectedValue).length === 0) {
            this.onSelect(null)
        }
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

    selectOptions() {

        const { data, dataFilterKey, dataFilterValue, allowEdit } = this.props

        let ar = []
        let filteredData = data

        if (typeof filteredData !== 'undefined') {

            if (typeof dataFilterKey !== 'undefined' && typeof dataFilterValue !== 'undefined') {
                filteredData = data.filter(x => x[dataFilterKey] == dataFilterValue)
            }

            let procData = this.preProcessData(filteredData)

            if (allowEdit === true) {

                //Insert "[Edit list values...]" entry
                if (procData.filter(x => x.value === "[Edit list values...]").length === 0) {
                    procData.splice(0, 0, {
                        "id": -1,
                        "value": "[Edit list values...]",
                    })
                }
            }

            for (let i of procData) {
                //ar.push({ value: i.id, label: i.value })
                ar.push(<SelectOption key={i.id} triggerOptionClick={this.onSelect}><span style={{color: "black"}}>{i.value}</span></SelectOption>)
            }
        }

        return ar
    }

    getLabelFontColour(uiconf) {
        if (typeof uiconf.required != 'undefined' && uiconf.required === true) {
            return "red"
        }
        else {
            return "black"
        }
    }

    getFontColour() {
        if (this.props.editMode) {
            return "#2BBBAD"
        }
        else {
            return "black"
        }
    }

    onSelect(value) {

        let { setSelectedValueKey, setSelectedValue, editMode, parentId, setEditList, data, dispatch, persist, type, dependencies, newItemTemplate } = this.props
        let selectedValue = 0

        if (value !== null) {
            if (value === '[Edit list values...]') {
                selectedValue = -1
            }
            else {
                let dataItem = data.filter(x => x.Value === value)[0]
                if (typeof dataItem !== 'undefined' && dataItem !== null) {
                    selectedValue = parseInt(dataItem[Object.keys(dataItem)[0]])
                }
            }
        }

        if (selectedValue === -1) {
            //Setup and Show EditListModal
            if (typeof type === 'undefined') {
                type = "std"
            }
            if (typeof dependencies === 'undefined') {
                dependencies = []
            }

            setEditList({
                show: true, data: data, dispatch: dispatch, persist: persist, type: type,
                dependencies: dependencies, newItemTemplate: newItemTemplate
            })
        }
        else {
            //Dispatch to store
            if (typeof setSelectedValueKey !== 'undefined') {
                setSelectedValue(setSelectedValueKey, { value: selectedValue, id: parentId, state: editMode === true ? "modified" : "original" })
            }
        }

        allowChange = false

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

        let { col, label, id, selectedValue, data } = this.props
        let uiconf = UILookup(id, label)
        let displayValue = "Select..."

        if (selectedValue > 0) {
            let dataItem = data.filter(x => x[Object.keys(x)[0]] === selectedValue)[0]
            if (typeof dataItem !== 'undefined' && dataItem !== null && typeof dataItem.Value  !== 'undefined') {
                displayValue = dataItem.Value
            }
        }

        return (
            <div className={col}>
                <label data-tip={uiconf.tooltip} style={{ fontWeight: "bold", color: this.getLabelFontColour(uiconf) }}>{uiconf.label}</label>
                <Select color="default">
                    <SelectInput  style={{ height: "35px", color: this.getFontColour(), border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }} value={displayValue}></SelectInput>
                    <SelectOptions>
                        {this.selectOptions()}
                    </SelectOptions>
                </Select>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent)