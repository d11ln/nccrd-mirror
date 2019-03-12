import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'

import './shared.css'

const mapStateToProps = (state, props) => {
  let { projectFundersData: { projectFunderDetails } } = state
  return { projectFunderDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProjectFunderDetails: payload => {
      dispatch({ type: "ADD_PROJECTFUNDER_DETAILS", payload })
    }
  }
}

class FundingAddStep extends React.Component {

  constructor(props) {
    super(props);
    this.addFunding = this.addFunding.bind(this)
  }

  addFunding() {
    let { projectFunderDetails, addProjectFunderDetails } = this.props
    addProjectFunderDetails(projectFunderDetails.ProjectId)
  }

  render() {

    return (
      <>
        <h5>
          Would you like to add funding details to this project?
        </h5>

        <div className="vertical-spacer" />

        <Button className="inline-button" color="primary" onClick={this.addFunding}>
          Add Funding
        </Button>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundingAddStep)