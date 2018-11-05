import React from 'react'
import { apiBaseURL } from "../../../config/serviceURLs.cfg"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import ReactTooltip from 'react-tooltip'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import { DEAGreenDark } from '../../../config/colours.cfg'

const mapStateToProps = (state, props) => {
  let { lookupData: { researchType, targetAudience, sector, sectorType, typology } } = state
  return { researchType, targetAudience, sector, sectorType, typology }
}

class ResearchDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, researchType, targetAudience, sector, sectorType, typology } = this.props

    return (
      <>
        {/* <br /> */}

        <div className="row">
          <TextComponent
            col="col-md-4"
            label="Author:"
            id="txtResearchAuthor"
            value={details.Author}
            setValueKey={"SET_RESEARCH_AUTHOR"}
            parentId={details.ResearchDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Paper link:"
            id="txtResearchPaperLink"
            value={details.PaperLink}
            setValueKey={"SET_RESEARCH_PAPER_LINK"}
            parentId={details.ResearchDetailId}
          />
          <SelectComponent
            id="selResearchType"
            col="col-md-4"
            label="Research type:"
            selectedValue={details.ResearchTypeId}
            data={researchType}
            setSelectedValueKey={"SET_RESEARCH_RESEARCH_TYPE"}
            parentId={details.ResearchDetailId}
            dispatch={"LOAD_RESEARCH_TYPE"}
            persist="ResearchType"
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
            setSelectedValueKey={"SET_RESEARCH_TARGET_AUDIENCE"}
            parentId={details.ResearchDetailId}
            dispatch={"LOAD_TARGET_AUDIENCE"}
            persist="TargetAudience"
            allowEdit={true}
            newItemTemplate={{
              "TargetAudienceId": 0,
              "Value": "",
              "Description": ""
            }}
          />
          <TreeSelectComponent
            id="selResearchSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={"SET_RESEARCH_SECTOR"}
            parentId={details.ResearchDetailId}
            dispatch={"LOAD_SECTOR"}
            persist="Sector"
            type="tree"
            dependencies={[
              { key: "SectorTypeId", value: sectorType, type: "std" },
              { key: "ParentSectorId", value: sector, type: "tree" },
              { key: "TypologyId", value: typology, type: "std" }
            ]}
            allowEdit={true}
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
        <hr style={{ borderWidth: "2px", borderStyle: "solid", borderColor: DEAGreenDark }} />
        <br />

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps)(ResearchDetailsItem)