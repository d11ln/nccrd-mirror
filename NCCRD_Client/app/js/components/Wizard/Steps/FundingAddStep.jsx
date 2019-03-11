import React from 'react'
import { Button } from 'mdbreact'

import './shared.css'

class FundingAddStep extends React.Component {

  constructor(props) {
    super(props);

    this.addFunding = this.addFunding.bind(this)
  }

  addFunding(){

    let { onAddClick } = this.props

    if(onAddClick){
      onAddClick()
    }
  }

  render() {

    return (
      <>
        <h5>
          Would you like to add funding details to this project?
        </h5>

        <br />

        <Button className="inline-button" color="primary" onClick={this.addFunding}>
          Add Funding
        </Button>
      </>
    )
  }
}

export default FundingAddStep