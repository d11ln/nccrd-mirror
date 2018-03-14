'use strict'

import React from 'react'

class TextComponent extends React.Component {

  constructor(props) {
    super(props);
    
    let { value } = props
    this.state = { ...this.state, value }
  }

  render() {

    let { value } = this.state
    let { col, label, id, readOnly } = this.props

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <input id={id} type="text" readOnly={readOnly} value={value} />
      </div>
    )
  }
}

export default TextComponent