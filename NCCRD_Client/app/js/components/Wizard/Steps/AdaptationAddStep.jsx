import React from 'react'
import { Button, Input } from 'mdbreact'
import { connect } from 'react-redux'

import './shared.css'

const mapStateToProps = (state, props) => {
  let { projectData: { projectDetails } } = state
  return { projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAdaptationDetails: payload => {
      dispatch({ type: "ADD_ADAPTATION_DETAILS", payload })
    }
  }
}

class AdaptationAddStep extends React.Component {

  constructor(props) {
    super(props);

    this.addAdaptation = this.addAdaptation.bind(this)
  }

  addAdaptation() {
    let { projectDetails, addAdaptationDetails } = this.props
    addAdaptationDetails(projectDetails.ProjectId);
  }

  render() {

    return (
      <>
        <h5>
          Would you like to add an adaptation action to this project?
        </h5>

        <div className="vertical-spacer" />

        <Button className="inline-button" color="primary" onClick={this.addAdaptation}>
          Add Adaptation
        </Button>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationAddStep)