'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_MITIGATION_DETAILS, SET_LOADING } from "../constants/action-types"
import MitigationDetailsItem from './MitigationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { projectData: { mitigationDetails } } = state
  return { mitigationDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMitigationDetails: payload => {
      dispatch({ type: LOAD_MITIGATION_DETAILS, payload })
    },
    setLoading: payload => {
        dispatch({ type: SET_LOADING, payload })
    }
  }
}

class MitigationDetailsTab extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    //Load MitigationDetails
    let { loadMitigationDetails, setLoading, projectId } = this.props

    setLoading(true)

    fetch(apiBaseURL + 'api/MitigationDetails/GetByProjectId/' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadMitigationDetails(res)
      setLoading(false)
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