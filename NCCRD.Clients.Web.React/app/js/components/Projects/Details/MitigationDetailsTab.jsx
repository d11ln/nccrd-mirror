'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import MitigationDetailsItem from './MitigationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { mitigationData: { mitigationDetails } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { mitigationDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMitigationDetails: payload => {
      dispatch({ type: ACTION_TYPES.ADD_MITIGATION_DETAILS, payload })
    }
  }
}

class MitigationDetailsTab extends React.Component {

  constructor(props) {
    super(props)

    this.addClick = this.addClick.bind(this)
  }

  loadDetails() {

    let { mitigationDetails } = this.props
    let details = []

    if (typeof mitigationDetails !== 'undefined') {

      for (let i of mitigationDetails.sort((a, b) => parseInt(a.MitigationDetailId) - parseInt(b.MitigationDetailId))) {
        details.push(<MitigationDetailsItem key={i.MitigationDetailId} details={i} />)
      }

      return details
    }
    return <div />
  }

  addClick() {

    let { addMitigationDetails, projectDetails } = this.props
    addMitigationDetails(projectDetails.ProjectId)
  }

  render() {

    let { editMode } = this.props

    return (
      <>

        <Button hidden={!editMode} style={{ marginLeft: "0px" }} color="secondary" className="btn-sm" onTouchTap={this.addClick} >
          <i className="fa fa-plus-circle" aria-hidden="true" />
          &nbsp;&nbsp;
          Add Mitigation Details
        </Button>

        {this.loadDetails()}

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationDetailsTab)