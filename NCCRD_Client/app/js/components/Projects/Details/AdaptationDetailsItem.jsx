import React from 'react'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import TextComponent from '../../Shared/TextComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { DEAGreenDark } from '../../../config/colours.js'

const _gf = require("../../../globalFunctions")

const mapStateToProps = (state, props) => {
  let { adaptationData: { adaptationDetails } } = state
  let { globalData: { editMode } } = state
  let { lookupData: {
    researchType, targetAudience, adaptationPurpose, sector, sectorType, typology, hazards, projectStatus,
    feasibility
  } } = state
  return {
    researchType, targetAudience, adaptationPurpose, sector, sectorType, typology, hazards, projectStatus, adaptationDetails,
    editMode, feasibility
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAdaptationDetailsResearchDetails: payload => {
      dispatch({ type: "SET_ADAPTATION_DETAILS_RESEARCH_DETAILS", payload })
    }
  }
}

class AdaptationDetailsItem extends React.Component {
  constructor(props) {
    super(props)
  }

  onResearchChange(value) {
    let { details } = this.props

    if (details.ResearchDetail) {
      //Disable
      details.ResearchDetail = null
    }
    else {
      //Enable
      details.ResearchDetail = {
        ResearchDetailId: _gf.getRndInteger(1111111, 9999999),
        Author: "",
        PaperLink: "",
        ResearchTypeId: 0,
        TargetAudienceId: 0,
        ProjectId: details.ProjectId,
        SectorId: null,
        FeasibilityId: null
      }
    }

    //Dispatch
    this.props.setAdaptationDetailsResearchDetails({
      id: details.AdaptationDetailId,
      value: details.ResearchDetail,
      state: 'modified'
    })
  }

  render() {

    let { details, researchType, targetAudience, adaptationPurpose, sector, sectorType, typology, hazards, projectStatus,
      adaptationDetails, editMode, feasibility } = this.props

    if (typeof details.ResearchDetail === 'undefined') {
      details.ResearchDetail = null
    }

    return (
      <>
        {/* <br /> */}

        <Row style={{ marginBottom: 10 }}>
          <Col md="6">
            <label style={{ fontWeight: "bold" }}>
              Research project:
            </label>
            <br />
            <label className="bs-switch">
              <input disabled={!editMode} type="checkbox" checked={details.ResearchDetail !== null} onClick={this.onResearchChange.bind(this)} />
              <span className="slider round" />
            </label>
          </Col>
        </Row>

        <div className="row">

          <TextAreaComponent
            col="col-md-12"
            label="Description:"
            id="txtAdaptationDescription"
            value={details.Description}
            setValueKey={"SET_ADAPTATION_DETAILS_DESCR"}
            parentId={details.AdaptationDetailId}
          />

        </div>

        <br />

        <div className="row">

          <SelectComponent
            id="selAdaptationPurpose"
            col="col-md-4"
            label="Purpose:"
            readOnly="true"
            selectedValue={details.AdaptationPurposeId}
            data={adaptationPurpose}
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_PURPOSE"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_ADAPTATION_PURPOSE"}
            persist="AdaptationPurpose"
            allowEdit={true}
            newItemTemplate={{
              "AdaptationPurposeId": 0,
              "Value": "",
              "Description": ""
            }}
          />

          <TreeSelectComponent
            id="selAdaptationSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_SECTOR"}
            parentId={details.AdaptationDetailId}
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

          <TreeSelectComponent
            id="selAdaptationHazard"
            col="col-md-4"
            label="Hazard:"
            selectedValue={details.HazardId}
            data={hazards}
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_HAZARD"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_HAZARDS"}
            type="tree"
            allowEdit={false}
          />
        </div>
        <br />

        <div className="row">
          <SelectComponent
            id="selProjectStatus"
            col="col-md-4"
            label="Status:"
            selectedValue={details.ProjectStatusId}
            data={this.props.projectStatus}
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_PROJECT_STATUS"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_PROJECT_STATUS"}
            persist="ProjectStatus"
            allowEdit={true}
            newItemTemplate={{
              "ProjectStatusId": 0,
              "Value": "",
              "Description": ""
            }}
          />
        </div>

        <br />

        {
          details.ResearchDetail &&
          <div>

            <Row>
              <TextComponent
                col="col-md-4"
                label="Author:"
                id="txtResearchAuthor"
                value={details.ResearchDetail.Author}
                setValueKey={"SET_ADAPTATION_RESEARCH_AUTHOR"}
                parentId={details.AdaptationDetailId}
              />
              <TextComponent
                col="col-md-4"
                label="Paper link:"
                id="txtResearchPaperLink"
                value={details.ResearchDetail.PaperLink}
                setValueKey={"SET_ADAPTATION_RESEARCH_PAPER_LINK"}
                parentId={details.AdaptationDetailId}
              />
              <SelectComponent
                id="selResearchType"
                col="col-md-4"
                label="Research type:"
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
              />
            </Row>

            <br />

            <Row>
              <SelectComponent
                id="selResearchTargetAudience"
                col="col-md-4"
                label="Target audience:"
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
              />

              <SelectComponent
                id="selResearchFeasibility"
                col="col-md-4"
                label="Feasibility:"
                selectedValue={details.ResearchDetail.FeasibilityId}
                data={feasibility}
                setSelectedValueKey={"SET_ADAPTATION_RESEARCH_FEASIBILITY"}
                parentId={details.AdaptationDetailId}
                dispatch={"LOAD_FEASIBILITY"}
                persist="Feasibility"
                allowEdit={false}
                newItemTemplate={{
                  "FeasibilityId": 0,
                  "Value": "",
                  "Description": ""
                }}
              />
            </Row>

          </div>
        }

        {
          (adaptationDetails && adaptationDetails.length > 1) &&
          <div
            style={{
              height: "5px",
              backgroundColor: "#white",
              margin: "35px -16px 30px -16px",
              borderStyle: "double none none none",
              borderColor: "#C8C8C8"
            }}
          />
        }

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsItem)