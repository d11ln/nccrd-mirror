'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextAreaComponent from './TextAreaComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import { LOAD_ADAPTATION_PURPOSE, LOAD_SECTOR, SET_LOADING } from "../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { adaptationPurpose, sector } } = state
  return { adaptationPurpose, sector }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAdaptationPurpose: payload => {
      dispatch({ type: LOAD_ADAPTATION_PURPOSE, payload })
    },
    loadSectors: payload => {
      dispatch({ type: LOAD_SECTOR, payload })
    },
    setLoading: payload => {
        dispatch({ type: SET_LOADING, payload })
    }
  }
}

class AdaptationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  loadAdaptationPurpose(){

    //Load AdaptationPurpose
    let { loadAdaptationPurpose } = this.props

    fetch(apiBaseURL + 'api/AdaptationPurpose/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadAdaptationPurpose(res)
    })
  }

  loadSectors(){

    //Load Sectors
    let { loadSectors } = this.props

    fetch(apiBaseURL + 'api/Sector/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadSectors(res)
    })
  }

  componentDidMount() {

    let { setLoading } = this.props

    setLoading(true)

    $.when(
      this.loadAdaptationPurpose(),
      this.loadSectors()
    ).done(() => { setLoading(false) })
  }

  render() {

    let { details, adaptationPurpose, sector } = this.props

    return (
      <div>
        <br />

        <div className="row">
          <TextAreaComponent col="col-md-12" readOnly="true" label="Description:" id="txtDescription" value={details.Description} />
        </div>

        <br />

        <div className="row">
          <SelectComponent col="col-md-4" label="Purpose:" readOnly="true" value={details.AdaptationPurposeId} options={adaptationPurpose} />
          <SelectComponent col="col-md-4" label="Sector:" readOnly="true" value={details.SectorId} options={sector} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsItem)