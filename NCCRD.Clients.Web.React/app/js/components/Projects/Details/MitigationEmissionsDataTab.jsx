'use strict'

import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
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
      dispatch({ type: ACTION_TYPES.ADD_MITIGATION_EMISSIONS, payload })
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
      <>
        <div style={{ position: "fixed", right: "14%", bottom: "65px", zIndex: "99" }}>
          <Button hidden={!editMode} data-tip="Add Emissions Data" tag="a" size="sm" floating color="purple" onClick={this.addClick}>
            <Fa icon="plus" />
          </Button>
        </div>

        {this.loadDetails()}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationEmissionsDataTab)