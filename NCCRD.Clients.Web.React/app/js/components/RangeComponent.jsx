'use strict'

import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { projectData: { editMode } } = state
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
      return <label style={{ fontSize: this.props.size }}>{this.props.prefix}&nbsp;</label>
    }
  }

  getSuffix() {
    if (typeof this.props.suffix !== "undefined") {
      return <label style={{ fontSize: this.props.size }}>&nbsp;{this.props.suffix}</label>
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
    let { label } = this.props
    if (label !== "") {
      return (
        <div>
          <label style={{ fontWeight: "bold" }}>{label}</label>
          <br />
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }

  fixUndefinedValue(value) {

    if (typeof value === 'undefined') {
      value = ""
    }

    return value
  }

  getFontColour() {
    if (this.props.editMode) {
      return "steelblue"
    }
    else {
      return "black"
    }
  }

  valueFromChange(event) {
    if (typeof this.props.setValueFromKey !== 'undefined' && !isNaN(event.target.value)) {
      this.props.setValueFrom(this.props.setValueFromKey, event.target.value)
    }
  }

  valueToChange(event) {
    if (typeof this.props.setValueToKey !== 'undefined' && !isNaN(event.target.value)) {
      this.props.setValueTo(this.props.setValueToKey, event.target.value)
    }
  }

  render() {

    let { label, inputWidth, col, size, align, valueFrom, valueTo, editMode } = this.props
    valueFrom = this.fixUndefinedValue(valueFrom)
    valueTo = this.fixUndefinedValue(valueTo)

    return (
      <div className={col}>

        {this.getLabel()}

        {this.getPrefix()}
        <input id={this.getId("from")} type="text" readOnly={!editMode}
          style={{ color: this.getFontColour(), width: inputWidth, fontSize: size, textAlign: align }} value={valueFrom}
          onChange={this.valueFromChange.bind(this)}
        />
        {this.getSuffix()}

        <label style={{ marginLeft: "10px", marginRight: "10px", fontSize: size }}> - </label>

        {this.getPrefix()}
        <input id={this.getId("to")} type="text" readOnly={!editMode}
          style={{ color: this.getFontColour(), width: inputWidth, fontSize: size, textAlign: align }} value={valueTo}
          onChange={this.valueToChange.bind(this)}
        />
        {this.getSuffix()}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeComponent)