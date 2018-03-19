'use strict'

import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { projectData: { editMode } } = state
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

    //Set initial internal state
    this.state = { selectedValue: props.value }
    this.onSelect = this.onSelect.bind(this)
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

  onSelect(selectedOption){
    
    let selectedValue = 0
    if(selectedOption !== null)
    {
      selectedValue = selectedOption.value
    }

    //Update internal state
    this.setState({ selectedValue: selectedValue})

    //Raise callback
    let { selectCallback } = this.props
    if(typeof selectCallback !== 'undefined'){
      selectCallback(selectedValue)
    }

    //Dispatch to store
    let { setSelectedValueKey, setSelectedValue } = this.props
    if(typeof this.props.setSelectedValueKey !== 'undefined'){
      setSelectedValue(setSelectedValueKey, selectedValue)
    }
  }
  
  render() {

    let { col, label, id, readOnly, onChange } = this.props
    let selectedValue = this.state.selectedValue

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>

        <Select id={id}
          readOnly={readOnly}
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