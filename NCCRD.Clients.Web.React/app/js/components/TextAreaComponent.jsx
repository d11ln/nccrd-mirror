'use strict'

import React from 'react'
import autosize from "autosize"

class TextAreaComponent extends React.Component {

  constructor(props) {
    super(props);

    let { value } = props
    this.state = { ...this.state, value }
  }

  componentDidMount() {
    autosize(this.textarea);
  }

  render() {

    let { value} = this.state
    let { col, label, readOnly, id} = this.props

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <textarea readOnly={readOnly} id={id} style={{ overflow: "auto" }} ref={c => (this.textarea = c)} type="text" className="md-textarea" value={value} />
      </div>
    )
  }
}

export default TextAreaComponent