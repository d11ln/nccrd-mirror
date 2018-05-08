'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import AdaptationDetailsItem from './AdaptationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { adaptationData: { adaptationDetails } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { adaptationDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAdaptationDetails: payload => {
      dispatch({ type: ACTION_TYPES.ADD_ADAPTATION_DETAILS, payload })
    }
  }
}

class AdaptationDetailsTab extends React.Component {

  constructor(props) {
    super(props)
    this.addClick = this.addClick.bind(this)
  }

  loadDetails() {

    let { adaptationDetails } = this.props
    let details = []

    if (typeof adaptationDetails !== 'undefined') {
      for (let i of adaptationDetails.sort((a, b) => parseInt(a.AdaptationDetailId) - parseInt(b.AdaptationDetailId))) {
        details.push(<AdaptationDetailsItem key={i.AdaptationDetailId} details={i} />)
      }

      return details
    }
    return <div />
  }

  addClick(){
    let { addAdaptationDetails, projectDetails } = this.props
    addAdaptationDetails(projectDetails.ProjectId);
  }

  render() {

    let { editMode } = this.props

    return (
      <>

        <Button hidden={!editMode} style={{ marginLeft: "-1px", marginBottom: "8px" }} color="secondary" className="btn-sm" onTouchTap={this.addClick} >
          <i className="fa fa-plus-circle" aria-hidden="true" />
          &nbsp;&nbsp;
          Add Adaptation Details
        </Button>

        {this.loadDetails()}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsTab)