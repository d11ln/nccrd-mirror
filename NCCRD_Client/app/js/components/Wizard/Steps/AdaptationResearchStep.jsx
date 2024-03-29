import React from 'react'
import { Button, Row, Col, Fa, Badge } from 'mdbreact'
import { connect } from 'react-redux'
import SelectComponent from '../../Shared/SelectComponent.jsx';
import TextComponent from '../../Shared/TextComponent.jsx';
import { Popover } from 'antd'

import "./shared.css"

const mapStateToProps = (state, props) => {
  let { adaptationData: { adaptationDetails } } = state
  let { lookupData: {
    researchType, targetAudience, sector, sectorType, typology, researchMaturity
  } } = state
  return {
    researchType, targetAudience, sector, sectorType, typology, researchMaturity, adaptationDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class AdaptationResearchStep extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { details, researchType, targetAudience, sector, sectorType, typology, researchMaturity } = this.props

    return (
      <>
        <Row>
          <TextComponent
            col="col-md-6"
            label="Author:"
            id="txtResearchAuthor"
            value={details.ResearchDetail.Author}
            setValueKey={"SET_ADAPTATION_RESEARCH_AUTHOR"}
            parentId={details.AdaptationDetailId}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <TextComponent
            col="col-md-6"
            label="Paper Link:"
            id="txtResearchPaperLink"
            value={details.ResearchDetail.PaperLink}
            setValueKey={"SET_ADAPTATION_RESEARCH_PAPER_LINK"}
            parentId={details.AdaptationDetailId}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <SelectComponent
            id="selResearchType"
            col="col-md-6"
            label="Research Type:"
            selectedValue={details.ResearchDetail.ResearchTypeId}
            data={researchType}
            setSelectedValueKey={"SET_ADAPTATION_RESEARCH_RESEARCH_TYPE"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_RESEARCH_TYPE"}
            persist="ResearchType"
            allowEdit={true}
            newItemTemplate={{
              "ResearchTypeId": 0,
              "Value": "",
              "Description": ""
            }}
            allowClear={true}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <SelectComponent
            id="selResearchTargetAudience"
            col="col-md-6"
            label="Target Audience:"
            selectedValue={details.ResearchDetail.TargetAudienceId}
            data={targetAudience}
            setSelectedValueKey={"SET_ADAPTATION_RESEARCH_TARGET_AUDIENCE"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_TARGET_AUDIENCE"}
            persist="TargetAudience"
            allowEdit={true}
            newItemTemplate={{
              "TargetAudienceId": 0,
              "Value": "",
              "Description": ""
            }}
            allowClear={true}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <SelectComponent
            id="selResearchResearchMaturity"
            col="col-md-6"
            label="Research Maturity:"
            selectedValue={details.ResearchDetail.ResearchMaturityId}
            data={researchMaturity}
            setSelectedValueKey={"SET_ADAPTATION_RESEARCH_MATURITY"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_RESEARCH_MATURITY"}
            persist="ResearchMaturity"
            allowEdit={false}
            newItemTemplate={{
              "ResearchMaturity": 0,
              "Value": "",
              "Description": ""
            }}
            allowClear={true}
          />
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationResearchStep)