import React from 'react'
import { Button, Row, Col, Input, FormInline, Fa } from 'mdbreact'
import { connect } from 'react-redux'

import './shared.css'
import './AdaptationAddStep.css'

const mapStateToProps = (state, props) => {
  let { adaptationData: { adaptationDetails } } = state
  return { adaptationDetails }
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
    let { addAdaptationDetails } = this.props
    addAdaptationDetails();
  }

  getActionItem(index, details, line) {
    return (
      <div key={"AdaptationAction#" + (index + 1)}>
        <Row className="adaptation-action-item-row">
          <Col>
            <FormInline>
              <h6 className="adaptation-action-item-label">Adaptation #{index + 1}</h6>
              <Input label="As Research" type="checkbox" id={`chkResearch${index + 1}`} />
              <Input disabled label="With Funding (*coming soon*)" type="checkbox" id={`chkFunding${index + 1}`} />
              <Button size="sm" color="danger">
                <Fa className="button-icon" icon="trash" />
                Remove
              </Button>
            </FormInline>
          </Col>
        </Row>
        {
          line === true &&
          <hr className="adaptation-horizontal-separator" />
        }
      </div>

    )
  }

  render() {

    let { adaptationDetails } = this.props

    return (
      <>
        <h5>
          Would you like to add an adaptation action to this project?
        </h5>

        <div className="vertical-spacer" />

        <Button className="inline-button" color="primary" onClick={this.addAdaptation}>
          Add Adaptation
        </Button>

        <div className="vertical-spacer" />
        <div className="vertical-spacer" />

        {
          adaptationDetails.map(item => {
            let index = adaptationDetails.indexOf(item)
            return this.getActionItem(index, item, index < adaptationDetails.length - 1)
          })
        }
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationAddStep)