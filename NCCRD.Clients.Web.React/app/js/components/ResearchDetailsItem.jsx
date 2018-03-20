'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import {
  LOAD_RESEARCH_TYPE, LOAD_TARGET_AUDIENCE, LOAD_SECTOR, SET_LOADING, SET_RESEARCH_AUTHOR, SET_RESEARCH_PAPER_LINK,
  SET_RESEARCH_RESEARCH_TYPE, SET_RESEARCH_TARGET_AUDIENCE, SET_RESEARCH_SECTOR
} from "../constants/action-types"

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

  loadResearchType() {

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

  loadTargetAudience() {

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

  loadSectors() {

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
          <TextComponent
            col="col-md-4"
            label="Author:"
            id="txtAuthor"
            value={details.Author}
            setValueKey={SET_RESEARCH_AUTHOR + "|" + details.ResearchDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Paper link:"
            id="txtPaperLink"
            value={details.PaperLink}
            setValueKey={SET_RESEARCH_PAPER_LINK + "|" + details.ResearchDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Research type:"
            selectedValue={details.ResearchTypeId}
            options={researchType}
            setSelectedValueKey={SET_RESEARCH_RESEARCH_TYPE + "|" + details.ResearchDetailId}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            col="col-md-4"
            label="Target audience::"
            selectedValue={details.TargetAudienceId}
            options={targetAudience}
            setSelectedValueKey={SET_RESEARCH_TARGET_AUDIENCE + "|" + details.ResearchDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            options={sector}
            setSelectedValueKey={SET_RESEARCH_SECTOR + "|" + details.ResearchDetailId}
          />
        </div>

        <br />
        <hr />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDetailsItem)