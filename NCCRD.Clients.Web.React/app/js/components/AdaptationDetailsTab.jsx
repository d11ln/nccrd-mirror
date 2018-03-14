'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_ADAPTATION_DETAILS } from "../constants/action-types"
import AdaptationDetailsItem from './AdaptationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { projectData: { adaptationDetails } } = state
  return { adaptationDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAdaptationDetails: payload => {
      dispatch({ type: LOAD_ADAPTATION_DETAILS, payload })
    }
  }
}

class AdaptationDetailsTab extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    //Load AdaptationDetails
    let { loadAdaptationDetails, projectId } = this.props
    fetch(apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadAdaptationDetails(res)
    })

  }

  loadDetails() {

    let { adaptationDetails } = this.props
    let details = []

    if (typeof adaptationDetails !== 'undefined') {

      for (let i of adaptationDetails) {
        details.push(<AdaptationDetailsItem key={i.AdaptationDetailId} details={i} />)
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

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsTab)