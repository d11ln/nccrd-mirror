'use strict'

import React from 'react'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import ReactTooltip from 'react-tooltip'

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
      <>
        <br />

        <div className="row">
          <TextComponent
            col="col-md-4"
            label="Author:"
            id="txtResearchAuthor"
            value={details.Author}
            setValueKey={ACTION_TYPES.SET_RESEARCH_AUTHOR}
            parentId={details.ResearchDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Paper link:"
            id="txtResearchPaperLink"
            value={details.PaperLink}
            setValueKey={ACTION_TYPES.SET_RESEARCH_PAPER_LINK}
            parentId={details.ResearchDetailId}
          />
          <SelectComponent
            id="selResearchType"
            col="col-md-4"
            label="Research type:"
            selectedValue={details.ResearchTypeId}
            data={researchType}
            setSelectedValueKey={ACTION_TYPES.SET_RESEARCH_RESEARCH_TYPE}
            parentId={details.ResearchDetailId}
            dispatch={ACTION_TYPES.LOAD_RESEARCH_TYPE}
            persist={"api/ResearchType/AddOrUpdate"}
            allowEdit={true}
            newItemTemplate={{
              "ResearchTypeId": 0,
              "Value": "",
              "Description": ""
            }}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            id="selResearchTargetAudience"
            col="col-md-4"
            label="Target audience:"
            selectedValue={details.TargetAudienceId}
            data={targetAudience}
            setSelectedValueKey={ACTION_TYPES.SET_RESEARCH_TARGET_AUDIENCE}
            parentId={details.ResearchDetailId}
            dispatch={ACTION_TYPES.LOAD_TARGET_AUDIENCE}
            persist={"api/TargetAudience/AddOrUpdate"}
            allowEdit={true}
            newItemTemplate={{
              "TargetAudienceId": 0,
              "Value": "",
              "Description": ""
            }}
        />
          <SelectComponent
            id="selResearchSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={ACTION_TYPES.SET_RESEARCH_SECTOR}
            parentId={details.ResearchDetailId}
            dispatch={ACTION_TYPES.LOAD_SECTOR}
            persist={"api/Sector/AddOrUpdate"}
            allowEdit={false}
            newItemTemplate={{
              "SectorId": 0,
              "Value": "",
              "SectorTypeId": 0,
              "ParentSectorId": 0,
              "TypologyId": 0
            }}
          />
        </div>

        <br />
        <hr />

        <ReactTooltip />
      </>
    )
  }
}

export default connect(mapStateToProps)(ResearchDetailsItem)