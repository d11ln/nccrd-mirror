'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_RESEARCH_DETAILS, SET_LOADING, ADD_RESEARCH_DETAILS } from "../constants/action-types"
import ResearchDetailsItem from './ResearchDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { researchData: { researchDetails } } = state
  let { globalData: { editMode } } = state
  return { researchDetails, editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadResearchDetails: payload => {
      dispatch({ type: LOAD_RESEARCH_DETAILS, payload })
    },
    addResearchDetails: payload => {
      dispatch({ type: ADD_RESEARCH_DETAILS, payload })
    },
    setLoading: payload => {
        dispatch({ type: SET_LOADING, payload })
    }
  }
}

class ResearchDetailsTab extends React.Component {

  constructor(props) {
    super(props)

    this.addClick = this.addClick.bind(this)
  }

  componentDidMount() {

    //Load ResearchDetails
    let { loadResearchDetails, setLoading, projectId } = this.props

    setLoading(true)

    fetch(apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadResearchDetails(res)
      setLoading(false)
    })

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

    let { addResearchDetails } = this.props
    addResearchDetails("")
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