'use strict'

import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class SelectComponent extends React.Component {

  constructor(props) {
    super(props);

    //let { value } = props
    //this.state = { ...this.state, value }
  }

  selectOptions() {

    const { options } = this.props
    let ar = [] //[{ value: "0", label: "Not selected" }]

    if (typeof options !== 'undefined') {
        for (let i of options) {
            ar.push({ value: i.id, label: i.value })
        }
    }

    return ar
}

  render() {

    //let { value } = this.state
    let { col, label, id, readOnly, value } = this.props

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>

        <Select id={id}
          readOnly={readOnly}
          name={id}
          value={value}
          options={this.selectOptions()}
        />

      </div>
    )
  }
}

export default SelectComponent