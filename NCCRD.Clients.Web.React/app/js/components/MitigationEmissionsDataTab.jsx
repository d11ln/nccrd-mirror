'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import { LOAD_MITIGATION_EMISSIONS, SET_LOADING, ADD_MITIGATION_EMISSIONS } from "../constants/action-types"
import MitigationEmissionsDataItem from './MitigationEmissionsDataItem.jsx'

const mapStateToProps = (state, props) => {
  let { projectData: { emissionsData, editMode } } = state
  return { emissionsData, editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMitigationEmissions: payload => {
      dispatch({ type: LOAD_MITIGATION_EMISSIONS, payload })
    },
    addMitigationDetails: payload => {
      dispatch({ type: ADD_MITIGATION_EMISSIONS, payload })
    },
    setLoading: payload => {
        dispatch({ type: SET_LOADING, payload })
    }
  }
}

class MitigationEmissionsDataTab extends React.Component {

  constructor(props) {
    super(props)

    this.addClick = this.addClick.bind(this)
  }

  componentDidMount() {

    //Load MitigationDetails
    let { loadMitigationEmissions, setLoading, projectId } = this.props

    setLoading(true);

    fetch(apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID//' + projectId, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadMitigationEmissions(res)
      setLoading(false)
    })

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

    let { addMitigationDetails } = this.props
    addMitigationDetails("")
  }

  render() {

    let { editMode } = this.props

    return (
      <div>

        <Button hidden={!editMode} style={{ marginLeft: "0px" }} color="secondary" className="btn-sm" onTouchTap={this.addClick} >
          <i className="fa fa-plus-circle" aria-hidden="true" />
          &nbsp;&nbsp;
          Add Mitigation Details
        </Button>

        {this.loadDetails()}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationEmissionsDataTab)