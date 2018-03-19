'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import { LOAD_RESEARCH_TYPE, LOAD_TARGET_AUDIENCE, LOAD_SECTOR, SET_LOADING } from "../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { researchType, targetAudience, sector } } = state
  return { researchType, targetAudience, sector }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadResearchType: payload => {
      dispatch({ type: LOAD_RESEARCH_TYPE, payload })
    },
    loadTargetAudience: payload => {
      dispatch({ type: LOAD_TARGET_AUDIENCE, payload })
    },
    loadSectors: payload => {
      dispatch({ type: LOAD_SECTOR, payload })
    },
    setLoading: payload => {
        dispatch({ type: SET_LOADING, payload })
    }
  }
}

class ResearchDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  loadResearchType(){

    //Load ResearchType
    let { loadResearchType } = this.props

    fetch(apiBaseURL + 'api/ResearchType/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadResearchType(res)
    })
  }

  loadTargetAudience(){

    //Load TargetAudience
    let { loadTargetAudience } = this.props

    fetch(apiBaseURL + 'api/TargetAudience/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadTargetAudience(res)
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
      this.loadResearchType(),
      this.loadTargetAudience(),
      this.loadSectors()
    ).done(() => { setLoading(false) })
  }

  render() {

    let { details, researchType, targetAudience, sector } = this.props

    return (
      <div>
        <br />

        <div className="row">
          <TextComponent col="col-md-4" readOnly="true" label="Author:" id="txtAuthor" value={details.Author} />
          <TextComponent col="col-md-4" readOnly="true" label="Paper link:" id="txtPaperLink" value={details.PaperLink} />
          <SelectComponent col="col-md-4" label="Research type:" readOnly="true" value={details.ResearchTypeId} options={researchType} />
        </div>

        <br />

        <div className="row">
          <SelectComponent col="col-md-4" label="Target audience::" readOnly="true" value={details.TargetAudienceId} options={targetAudience} />
          <SelectComponent col="col-md-4" label="Sector:" readOnly="true" value={details.SectorId} options={sector} />
        </div>

        <br/>
        <hr/>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDetailsItem)