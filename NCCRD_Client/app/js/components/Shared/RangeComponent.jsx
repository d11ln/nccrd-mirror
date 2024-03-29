import React from 'react'
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { Input } from 'mdbreact'
import { Tooltip } from 'antd';
import DualTip from './DualTip.jsx';

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  return { editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setValueFrom: (key, payload) => {
      dispatch({ type: key, payload })
      dispatch({ type: "SET_PROJECT_DETAILS_VERIFIED", payload: { value: false, state: 'modified' } })
    },
    setValueTo: (key, payload) => {
      dispatch({ type: key, payload })
      dispatch({ type: "SET_PROJECT_DETAILS_VERIFIED", payload: { value: false, state: 'modified' } })
    }
  }
}

class RangeComponent extends React.Component {

  constructor(props) {
    super(props);
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
      <DualTip label={uiconf.label} primaryTip={uiconf.tooltip} secondaryTip={uiconf.tooltip2} required={uiconf.required} />
    )
  }

  valueFromChange(event) {

    let { setValueFromKey, setValueFrom, parentId, editMode } = this.props

    if (typeof setValueFromKey !== 'undefined' /*&& !isNaN(event.target.value)*/) {
      setValueFrom(setValueFromKey, { value: event.target.value, id: parentId, state: editMode === true ? "modified" : "original" })
    }
  }

  valueToChange(event) {

    let { setValueToKey, setValueTo, parentId, editMode } = this.props

    if (typeof setValueToKey !== 'undefined' /*&& !isNaN(event.target.value)*/) {
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

    let { label, inputWidth, col, valueFrom, valueTo, editMode, prefix, suffix, numeric } = this.props
    valueFrom = this.fixNullOrUndefinedValue(valueFrom)
    valueTo = this.fixNullOrUndefinedValue(valueTo)

    return (
      <div className={col} style={{ paddingRight: 25 }}>

        {this.getLabel()}

        <table>
          <tbody>
            <tr>
              {
                prefix &&
                <td>
                  <h6 style={{ marginTop: 7 }}>{prefix}&nbsp;</h6>
                </td>
              }
              <td width="49%">
                <Input
                  size="sm"
                  type={ numeric ? "number" : text }
                  id={this.getId("from")}
                  readOnly={!editMode}
                  style={{
                    height: "21px",
                    marginTop: "-27px",
                    marginBottom: "-25px",
                    color: _gf.getFontColour(editMode),
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    padding: "5px"
                  }}
                  value={this.fixNullOrUndefinedValue(valueFrom)}
                  onChange={this.valueFromChange.bind(this)} />
              </td>
              {
                suffix &&
                <td>
                  <h6 style={{ marginTop: 7 }}>{suffix}&nbsp;</h6>
                </td>
              }
              <td>
                <h6 style={{ marginTop: 7 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</h6>
              </td>
              {
                prefix &&
                <td>
                  <h6 style={{ marginTop: 7 }}>{prefix}&nbsp;</h6>
                </td>
              }
              <td width="49%">
                <Input
                  size="sm"
                  type={ numeric ? "number" : text }
                  id={this.getId("to")}
                  readOnly={!editMode}
                  style={{
                    height: "21px",
                    marginTop: "-27px",
                    marginBottom: "-25px",
                    color: _gf.getFontColour(editMode),
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    padding: "5px"
                  }}
                  value={this.fixNullOrUndefinedValue(valueTo)}
                  onChange={this.valueToChange.bind(this)} />
              </td>
              {
                suffix &&
                <td>
                  <h6 style={{ marginTop: 7 }}>{suffix}&nbsp;</h6>
                </td>
              }
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeComponent)