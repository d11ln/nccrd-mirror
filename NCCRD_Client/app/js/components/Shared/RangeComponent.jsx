'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { UILookup } from "../../constants/ui_config.js"
import { Input } from 'mdbreact'

const mapStateToProps = (state, props) => {
    let { globalData: { editMode } } = state
    return { editMode }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValueFrom: (key, payload) => {
            dispatch({ type: key, payload })
        },
        setValueTo: (key, payload) => {
            dispatch({ type: key, payload })
        }
    }
}

class RangeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.getFontColour = this.getFontColour.bind(this)
    }

    getPrefix() {
        if (typeof this.props.prefix !== "undefined") {
            return <h6>{this.props.prefix}&nbsp;</h6>
        }
    }

    getSuffix() {
        if (typeof this.props.suffix !== "undefined") {
            return <h6>&nbsp;{this.props.suffix}</h6>
        }
    }

    getId(key) {
        if (key === "from") {
            return this.props.id + "From"
        }
        else {
            return this.props.id + "To"
        }
    }

    getLabel() {

        let { label, id, size } = this.props

        let uiconf = UILookup(id, label)

        return (
            <div>
                <label data-tip={uiconf.tooltip} style={{ fontSize: size, fontWeight: "bold", color: this.getLabelFontColour(uiconf) }}>{uiconf.label}&nbsp;</label>
            </div>
        )
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

    valueFromChange(event) {

        let { setValueFromKey, setValueFrom, parentId, editMode } = this.props

        if (typeof setValueFromKey !== 'undefined' && !isNaN(event.target.value)) {
            setValueFrom(setValueFromKey, { value: event.target.value, id: parentId, state: editMode === true ? "modified" : "original" })
        }
    }

    valueToChange(event) {

        let { setValueToKey, setValueTo, parentId, editMode } = this.props

        if (typeof setValueToKey !== 'undefined' && !isNaN(event.target.value)) {
            setValueTo(setValueToKey, { value: event.target.value, id: parentId, state: editMode === true ? "modified" : "original" })
        }
    }

    fixNullOrUndefinedValue(value) {

        if (typeof value === 'undefined' || value === null) {
            value = ""
        }

        return value.toString()
    }

    render() {

        let { label, inputWidth, col, valueFrom, valueTo, editMode } = this.props
        valueFrom = this.fixNullOrUndefinedValue(valueFrom)
        valueTo = this.fixNullOrUndefinedValue(valueTo)

        return (
            <div className={col}>

                {this.getLabel()}

                <div className="row">

                    <span style={{ width: "16px" }} />

                    {this.getPrefix()}

                    <Input size="sm" id={this.getId("from")} readOnly={!editMode}
                        style={{ height: "22px", marginTop: "-31px", marginBottom: "-25px", color: this.getFontColour(), width: inputWidth, border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                        value={this.fixNullOrUndefinedValue(valueFrom)}
                        onChange={this.valueFromChange.bind(this)} />

                    {this.getSuffix()}

                    <h6 style={{ marginLeft: "10px", marginRight: "10px" }}> - </h6>

                    {this.getPrefix()}

                    <Input size="sm" id={this.getId("to")} readOnly={!editMode}
                        style={{ height: "22px", marginTop: "-31px", marginBottom: "-25px", color: this.getFontColour(), width: inputWidth, border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                        value={this.fixNullOrUndefinedValue(valueTo)}
                        onChange={this.valueToChange.bind(this)} />

                    {this.getSuffix()}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeComponent)