'use strict'

import React from 'react'
//import autosize from "autosize"
import TextareaAutosize from "react-textarea-autosize"

class TextAreaComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   autosize(this.textarea); 
  // }

  fixUndefinedValue(value) {

    if (typeof value === 'undefined') {
      value = ""
    }

    return value
  }

  render() {

    let { col, label, readOnly, id, value } = this.props
    value = this.fixUndefinedValue(value)

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <TextareaAutosize
          style={{borderStyle: "solid", borderWidth: "0px 0px 1px 0px", borderColor: "#b4b4b4", paddingBottom: "5px"}}
          value={value}
        />
      </div>
    )

  }
}

export default TextAreaComponent