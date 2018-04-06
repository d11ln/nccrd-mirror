'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import ResearchDetailsItem from './ResearchDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { researchData: { researchDetails } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { researchDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addResearchDetails: payload => {
      dispatch({ type: ACTION_TYPES.ADD_RESEARCH_DETAILS, payload })
    }
  }
}

class ResearchDetailsTab extends React.Component {

  constructor(props) {
    super(props)

    this.addClick = this.addClick.bind(this)
  }

  loadDetails() {

    let { researchDetails } = this.props
    let details = []

    if (typeof researchDetails !== 'undefined') {

      for (let i of researchDetails.sort((a, b) => parseInt(a.ResearchDetailId) - parseInt(b.ResearchDetailId))) {
        details.push(<ResearchDetailsItem key={i.ResearchDetailId} details={i} />)
      }

      return details
    }
    return <div />
  }

  addClick() {

    let { addResearchDetails, projectDetails } = this.props
    addResearchDetails(projectDetails.ProjectId)
  }

  render() {

    let { editMode } = this.props

    return (
      <div>

        <Button hidden={!editMode} style={{ marginLeft: "0px" }} color="secondary" className="btn-sm" onTouchTap={this.addClick} >
          <i className="fa fa-plus-circle" aria-hidden="true" />
          &nbsp;&nbsp;
          Add Research Details
        </Button>

        {this.loadDetails()}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDetailsTab)