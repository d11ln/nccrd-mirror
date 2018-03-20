'use strict'

import React from 'react'
import TextareaAutosize from "react-textarea-autosize"
import { connect } from 'react-redux'

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

class TextAreaComponent extends React.Component {

  constructor(props) {
    super(props);
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

  valueChange(event) {
    if (typeof this.props.setValueKey !== 'undefined') {
      this.props.setValue(this.props.setValueKey, { value: event.target.value, id: this.props.parentId})
    }
  }

  render() {

    let { col, label, editMode, id, value } = this.props
    value = this.fixUndefinedValue(value)

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <TextareaAutosize
          readOnly={!editMode}
          style={{
            borderStyle: "solid",
            borderWidth: "0px 0px 1px 0px",
            borderColor: "#b4b4b4",
            paddingBottom: "4px",
            color: this.getFontColour()
          }}
          value={value}
          onChange={this.valueChange.bind(this)}
        />
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaComponent)