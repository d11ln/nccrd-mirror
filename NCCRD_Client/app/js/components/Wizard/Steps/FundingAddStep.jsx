import React from 'react'
import { Button,  Row, Col, FormInline, Fa } from 'mdbreact'
import { connect } from 'react-redux'

import './shared.css'
import './FundingAddStep.css'

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

  getActionItem(index, details, line) {
    return (
      <div key={"FundingAction#" + (index + 1)}>
        <Row className="funding-action-item-row">
          <Col>
            <FormInline>
              <h6 className="funding-action-item-label">Funding #{index + 1}</h6>
              <Button size="sm" color="danger">
                <Fa className="button-icon" icon="trash" />
                Remove
              </Button>
            </FormInline>
          </Col>
        </Row>
        {
          line === true &&
          <hr className="funding-horizontal-separator" />
        }
      </div>

    )
  }

  render() {

    let { projectFunderDetails } = this.props

    return (
      <>
        <h5>
          Would you like to add funding details to this project?
        </h5>

        <div className="vertical-spacer" />

        <Button className="inline-button" color="primary" onClick={this.addFunding}>
          Add Funding
        </Button>

        <div className="vertical-spacer" />
        <div className="vertical-spacer" />

        {
          projectFunderDetails.map(item => {
            let index = projectFunderDetails.indexOf(item)
            return this.getActionItem(index, item, index < projectFunderDetails.length - 1)
          })
        }
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundingAddStep)