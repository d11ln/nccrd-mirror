'use strict'

import React from 'react'

class RangeComponent extends React.Component {

  constructor(props) {
    super(props);
    let { valueFrom, valueTo } = props
    this.state = { ...this.state, valueFrom, valueTo }
  }

  getPrefix() {
    if (typeof this.props.prefix !== "undefined") {
      return <label style={{ fontSize: this.props.size }}>{this.props.prefix}&nbsp;</label>
    }
  }

  getSuffix() {
    if (typeof this.props.suffix !== "undefined") {
      return <label style={{ fontSize: this.props.size }}>&nbsp;{this.props.suffix}</label>
    }
  }

  getId(key) {
    if (key === "from") {
      return this.props.id + "From"
    }
    else {
      return this.props.id + "To"
    }
  }

  getLabel(){
    let { label } = this.props
    if(label !== "")
    {
      return (
        <div>
          <label style={{ fontWeight: "bold" }}>{label}</label>
          <br />
        </div>
      )
    }
    else
    {
      return (
        <div></div>     
      )
    }
  }

  render() {

    const { valueFrom, valueTo } = this.state
    const { label, inputWidth, col, readOnly, size, align } = this.props

    return (
      <div className={col}>

        {this.getLabel()}

        {this.getPrefix()}
        <input id={this.getId("from")} type="text" readOnly={readOnly} style={{ width: inputWidth, fontSize: size, textAlign: align }} value={valueFrom} />
        {this.getSuffix()}

        <label style={{ marginLeft: "10px", marginRight: "10px", fontSize: size }}> - </label>

        {this.getPrefix()}
        <input id={this.getId("to")} type="text" readOnly={readOnly} style={{ width: inputWidth, fontSize: size, textAlign: align }} value={valueTo} />
        {this.getSuffix()}

      </div>
    )
  }
}

export default RangeComponent