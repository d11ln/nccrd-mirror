import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import { connect } from 'react-redux'
import ResearchDetailsItem from './ResearchDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { researchData: { researchDetails } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { researchDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class ResearchDetailsTab extends React.Component {

  constructor(props) {
    super(props)
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

  render() {

    return (
      <>
        {this.loadDetails()}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDetailsTab)