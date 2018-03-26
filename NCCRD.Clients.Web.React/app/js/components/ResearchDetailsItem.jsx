'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import * as ACTION_TYPES from "../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { researchType, targetAudience, sector } } = state
  return { researchType, targetAudience, sector }
}

class ResearchDetailsItem extends React.Component {

  constructor(props) {
    super(props)
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
            setValueKey={ACTION_TYPES.SET_RESEARCH_AUTHOR}
            parentId={details.ResearchDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Paper link:"
            id="txtPaperLink"
            value={details.PaperLink}
            setValueKey={ACTION_TYPES.SET_RESEARCH_PAPER_LINK}
            parentId={details.ResearchDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Research type:"
            selectedValue={details.ResearchTypeId}
            options={researchType}
            setSelectedValueKey={ACTION_TYPES.SET_RESEARCH_RESEARCH_TYPE}
            parentId={details.ResearchDetailId}
            dispatch={ACTION_TYPES.LOAD_RESEARCH_TYPE}
            persist={"api/ResearchType/AddOrUpdate"}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            col="col-md-4"
            label="Target audience::"
            selectedValue={details.TargetAudienceId}
            options={targetAudience}
            setSelectedValueKey={ACTION_TYPES.SET_RESEARCH_TARGET_AUDIENCE}
            parentId={details.ResearchDetailId}
            dispatch={ACTION_TYPES.LOAD_TARGET_AUDIENCE}
            persist={"api/TargetAudience/AddOrUpdate"}
          />
          <SelectComponent
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            options={sector}
            setSelectedValueKey={ACTION_TYPES.SET_RESEARCH_SECTOR}
            parentId={details.ResearchDetailId}
            // dispatch={ACTION_TYPES.LOAD_SECTOR}
            // persist={"api/Sector/AddOrUpdate"}
          />
        </div>

        <br />
        <hr />

      </div>
    )
  }
}

export default connect(mapStateToProps)(ResearchDetailsItem)