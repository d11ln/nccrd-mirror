import React from 'react'
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
    setValue: (key, payload) => {
      dispatch({ type: key, payload })
    }
  }
}

class TextComponent extends React.Component {

  constructor(props) {
    super(props);

    let { value } = props
    this.state = { ...this.state, value }
  }

  fixNullOrUndefinedValue(value) {

    if (typeof value === 'undefined' || value === null) {
      value = ""
    }

    return value
  }

  getLabelFontColour(uiconf) {
    if (typeof uiconf.required != 'undefined' && uiconf.required === true) {
      return "red"
    }
    else {
      return "black"
    }
  }

  valueChange(event) {

    let { setValue, setValueKey, parentId, editMode, numeric } = this.props

    if (typeof setValueKey !== 'undefined') {

      let value = event.target.value
      if (numeric) {
        if (value === "") {
          value = 0
        }
        else {
          value = parseFloat(value.replace(/,/g, "").replace("[^a-zA-Z0-9 -]", ""));
        }
      }

      setValue(setValueKey, { value, id: parentId, state: editMode === true ? "modified" : "original" })
    }
  }

  render() {

    let { col, label, id, editMode, value } = this.props
    let uiconf = UILookup(id, label)

    value = this.fixNullOrUndefinedValue(value)
    label = this.fixNullOrUndefinedValue(label)

    return (
      <div className={col} style={{ paddingRight: 20 }}>
        {
          (label !== "") &&
          <Tooltip title={uiconf.tooltip} mouseEnterDelay={0.7}>
            <label
              style={{
                marginBottom: "0px",
                fontWeight: "bold",
                color: this.getLabelFontColour(uiconf)
              }}
            >
              {uiconf.label}
            </label>
          </Tooltip>

        }
        <Input
          size="sm"
          id={id}
          readOnly={!editMode}
          value={value.toString()}
          onChange={this.valueChange.bind(this)}
          style={{
            width: "98.4%",
            height: "21px",
            marginTop: "-15px",
            marginBottom: "-20px",
            color: _gf.getFontColour(editMode),
            border: "1px solid lightgrey",
            borderRadius: "5px",
            padding: "5px"
          }}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextComponent)