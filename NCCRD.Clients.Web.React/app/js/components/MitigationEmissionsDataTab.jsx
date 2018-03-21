'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { ADD_MITIGATION_EMISSIONS } from "../constants/action-types"
import MitigationEmissionsDataItem from './MitigationEmissionsDataItem.jsx'

const mapStateToProps = (state, props) => {
  let { emissionData: { emissionsData } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { emissionsData, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMitigationDetails: payload => {
      dispatch({ type: ADD_MITIGATION_EMISSIONS, payload })
    }
  }
}

class MitigationEmissionsDataTab extends React.Component {

  constructor(props) {
    super(props)

    this.addClick = this.addClick.bind(this)
  }

  loadDetails() {

    let { emissionsData } = this.props
    let details = []

    if (typeof emissionsData !== 'undefined') {

      for (let i of emissionsData.sort((a, b) => parseInt(a.MitigationEmissionsDataId) - parseInt(b.MitigationEmissionsDataId))) {
        details.push(<MitigationEmissionsDataItem key={i.MitigationEmissionsDataId} details={i} />)
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
      <div>

        <Button hidden={!editMode} style={{ marginLeft: "0px" }} color="secondary" className="btn-sm" onTouchTap={this.addClick} >
          <i className="fa fa-plus-circle" aria-hidden="true" />
          &nbsp;&nbsp;
          Add Emissions Data
        </Button>

        {this.loadDetails()}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationEmissionsDataTab)