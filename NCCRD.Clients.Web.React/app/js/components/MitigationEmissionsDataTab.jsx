'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_MITIGATION_EMISSIONS } from "../constants/action-types"
import MitigationEmissionsDataItem from './MitigationEmissionsDataItem.jsx'

const mapStateToProps = (state, props) => {
  let { projectData: { emissionsData } } = state
  return { emissionsData }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMitigationEmissions: payload => {
      dispatch({ type: LOAD_MITIGATION_EMISSIONS, payload })
    }
  }
}

class MitigationEmissionsDataTab extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    //Load MitigationDetails
    let { loadMitigationEmissions, projectId } = this.props
    fetch(apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID//' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadMitigationEmissions(res)
    })

  }

  loadDetails() {

    let { emissionsData } = this.props
    let details = []

    if (typeof emissionsData !== 'undefined') {

      for (let i of emissionsData) {
        details.push(<MitigationEmissionsDataItem key={i.MitigationEmissionsDataId} details={i} />)
      }

      return details
    }
    return <div />
  }

  render() {
    return (
      <div>
        {this.loadDetails()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationEmissionsDataTab)