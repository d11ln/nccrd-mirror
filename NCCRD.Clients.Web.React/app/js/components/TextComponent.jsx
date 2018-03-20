'use strict'

import React from 'react'
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

class TextComponent extends React.Component {

  constructor(props) {
    super(props);

    let { value } = props
    this.state = { ...this.state, value }
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
      this.props.setValue(this.props.setValueKey, event.target.value)
    }
  }

  render() {

    let { col, label, id, editMode, value } = this.props
    value = this.fixUndefinedValue(value)

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <input
          id={id} type="text" readOnly={!editMode} value={value} onChange={this.valueChange.bind(this)}
          style={{ color: this.getFontColour() }}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextComponent)