'use strict'

import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  return { editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedValue: (key, payload) => {
      dispatch({ type: key, payload })
    }
  }
}

class SelectComponent extends React.Component {

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this)
    this.getDisabledState = this.getDisabledState.bind(this)
  }

  selectOptions() {

    const { options } = this.props
    let ar = []

    if (typeof options !== 'undefined') {
      for (let i of options) {
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

    //Dispatch to store
    let { setSelectedValueKey, setSelectedValue } = this.props
    if (typeof this.props.setSelectedValueKey !== 'undefined') {
      setSelectedValue(setSelectedValueKey, { value: selectedValue, id: this.props.parentId})
    }
  }

  getDisabledState() {
    let { editMode, editModeOverride } = this.props

    let disabledState = true

    if (typeof editModeOverride !== "undefined" && editModeOverride === true) {
      disabledState = false
    }
    else if(typeof editMode !== "undefined" && editMode === true) {
      disabledState = false
    }

    return disabledState
  }

  render() {

    let { col, label, id, onChange, selectedValue } = this.props

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>

        <Select id={id}
          disabled={this.getDisabledState()}
          name={id}
          value={selectedValue}
          options={this.selectOptions()}
          onChange={this.onSelect}
        />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent)