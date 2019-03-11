import React from 'react'
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { Input } from 'mdbreact'
import { Tooltip } from 'antd';

const _gf = require('../../globalFunctions')

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
      <Tooltip title={uiconf.tooltip} mouseEnterDelay={0.7}>
        <label
          style={{
            marginBottom: 15,
            fontSize: size,
            fontWeight: "bold",
            color: this.getLabelFontColour(uiconf)
          }}
        >
          {uiconf.label}&nbsp;
        </label>
      </Tooltip>
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

    let { label, inputWidth, col, valueFrom, valueTo, editMode, prefix, suffix } = this.props
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
                  <h6>{prefix}&nbsp;</h6>
                </td>
              }
              <td width="49%">
                <Input size="sm" id={this.getId("from")} readOnly={!editMode}
                  style={{ height: "21px", marginTop: "-31px", marginBottom: "-25px", color: _gf.getFontColour(editMode), /*width: inputWidth,*/ border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                  value={this.fixNullOrUndefinedValue(valueFrom)}
                  onChange={this.valueFromChange.bind(this)} />
              </td>
              {
                suffix &&
                <td>
                  <h6>{suffix}&nbsp;</h6>
                </td>
              }
              <td>
                <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</h6>
              </td>
              {
                prefix &&
                <td>
                  <h6>{prefix}&nbsp;</h6>
                </td>
              }
              <td width="49%">
                <Input size="sm" id={this.getId("to")} readOnly={!editMode}
                  style={{ height: "21px", marginTop: "-31px", marginBottom: "-25px", color: _gf.getFontColour(editMode), /*width: inputWidth,*/ border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                  value={this.fixNullOrUndefinedValue(valueTo)}
                  onChange={this.valueToChange.bind(this)} />
              </td>
              {
                suffix &&
                <td>
                  <h6>{suffix}&nbsp;</h6>
                </td>
              }
            </tr>
          </tbody>
        </table>

        {/* <div className="row" style={{ marginBottom: "-15px"}}>

                    <span style={{ width: "16px" }} />

                    {this.getPrefix()}

                    <Input size="sm" id={this.getId("from")} readOnly={!editMode}
                        style={{ height: "21px", marginTop: "-31px", marginBottom: "-25px", color: _gf.getFontColour(editMode), width: inputWidth, border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                        value={this.fixNullOrUndefinedValue(valueFrom)}
                        onChange={this.valueFromChange.bind(this)} />

                    {this.getSuffix()}

                    <h6 style={{ marginLeft: "10px", marginRight: "10px" }}> - </h6>

                    {this.getPrefix()}

                    <Input size="sm" id={this.getId("to")} readOnly={!editMode}
                        style={{ height: "21px", marginTop: "-31px", marginBottom: "-25px", color: _gf.getFontColour(editMode), width: inputWidth, border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                        value={this.fixNullOrUndefinedValue(valueTo)}
                        onChange={this.valueToChange.bind(this)} />

                    {this.getSuffix()}
                </div> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeComponent)