'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_ADAPTATION_DETAILS, SET_LOADING, ADD_ADAPTATION_DETAILS } from "../constants/action-types"
import AdaptationDetailsItem from './AdaptationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { projectData: { adaptationDetails, editMode } } = state
  return { adaptationDetails, editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAdaptationDetails: payload => {
      dispatch({ type: LOAD_ADAPTATION_DETAILS, payload })
    },
    addAdaptationDetails: payload => {
      dispatch({ type: ADD_ADAPTATION_DETAILS, payload })
    },
    setLoading: payload => {
      dispatch({ type: SET_LOADING, payload })
    }
  }
}

class AdaptationDetailsTab extends React.Component {

  constructor(props) {
    super(props)
    this.addClick = this.addClick.bind(this)
  }

  componentDidMount() {

    //Load AdaptationDetails
    let { loadAdaptationDetails, setLoading, projectId } = this.props

    setLoading(true)

    fetch(apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadAdaptationDetails(res)
      setLoading(false)
    })

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
    let { addAdaptationDetails } = this.props
    addAdaptationDetails("");
  }

  render() {

    let { editMode } = this.props

    return (
      <div>

        <Button hidden={!editMode} style={{ marginLeft: "0px" }} color="secondary" className="btn-sm" onTouchTap={this.addClick} >
          <i className="fa fa-plus-circle" aria-hidden="true" />
          &nbsp;&nbsp;
          Add Adaptation Details
        </Button>

        {this.loadDetails()}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsTab)