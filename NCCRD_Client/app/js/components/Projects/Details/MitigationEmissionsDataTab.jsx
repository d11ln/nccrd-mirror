import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import { connect } from 'react-redux'
import MitigationEmissionsDataItem from './MitigationEmissionsDataItem.jsx'

const mapStateToProps = (state, props) => {
  let { emissionsData: { emissionsData } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { emissionsData, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MitigationEmissionsDataTab extends React.Component {

  constructor(props) {
    super(props)
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

  render() {

    return (
      <>
        {this.loadDetails()}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationEmissionsDataTab)