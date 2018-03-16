'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_MITIGATION_DETAILS } from "../constants/action-types"
import MitigationDetailsItem from './MitigationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { projectData: { mitigationDetails } } = state
  return { mitigationDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMitigationDetails: payload => {
      dispatch({ type: LOAD_MITIGATION_DETAILS, payload })
    }
  }
}

class MitigationDetailsTab extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    //Load MitigationDetails
    let { loadMitigationDetails, projectId } = this.props
    fetch(apiBaseURL + 'api/MitigationDetails/GetByProjectId/' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadMitigationDetails(res)
    })

  }

  loadDetails() {

    let { mitigationDetails } = this.props
    let details = []

    if (typeof mitigationDetails !== 'undefined') {

      for (let i of mitigationDetails) {
        details.push(<MitigationDetailsItem key={i.MitigationDetailId} details={i} />)
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

export default connect(mapStateToProps, mapDispatchToProps)(MitigationDetailsTab)