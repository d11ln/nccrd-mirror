'use strict'

import React from 'react'

class TextComponent extends React.Component {

  constructor(props) {
    super(props);
    
    let { value } = props
    this.state = { ...this.state, value }
  }

  fixUndefinedValue(value){

    if(typeof value === 'undefined'){
      value = ""
    }

    return value
  }

  render() {

    let { col, label, id, readOnly, value } = this.props
    value = this.fixUndefinedValue(value)

    return (
      <div className={col}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <input id={id} type="text" readOnly={readOnly} value={value} />
      </div>
    )
  }
}

export default TextComponent