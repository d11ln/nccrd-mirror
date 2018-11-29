import React from 'react'
import { apiBaseURL } from "../../../config/serviceURLs.cfg"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import ReactTooltip from 'react-tooltip'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import { DEAGreenDark } from '../../../config/colours.cfg'

const mapStateToProps = (state, props) => {
  let { mitigationData: { mitigationDetails } } = state
  let { lookupData: { carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology, projectStatus,
    voluntaryMethodology, voluntaryGoldStandard, sector, sectorType, typology } } = state
  return {
    carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology, projectStatus,
    voluntaryMethodology, voluntaryGoldStandard, sector, sectorType, typology,
    mitigationDetails
  }
}

class MitigationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology, projectStatus,
      voluntaryMethodology, voluntaryGoldStandard, sector, sectorType, typology, mitigationDetails } = this.props

    return (
      <>
        <div className="row">
          <SelectComponent
            id="selMitigationCarbonCredit"
            col="col-md-4"
            label="Carbon credit:"
            selectedValue={details.CarbonCreditId}
            data={carbonCredit}
            setSelectedValueKey={"SET_MITIGATION_CARBON_CREDIT"}
            parentId={details.MitigationDetailId}
            dispatch={"LOAD_CARBON_CREDIT"}
            persist="CarbonCredit"
            allowEdit={true}
            newItemTemplate={{
              "CarbonCreditId": 0,
              "Value": "",
              "Description": ""
            }}
          />
          <SelectComponent
            id="selMitigationCarbonCreditMarket"
            col="col-md-4"
            label="Carbon credit market:"
            selectedValue={details.CarbonCreditMarketId}
            data={carbonCreditMarket}
            setSelectedValueKey={"SET_MITIGATION_CARBON_CREDIT_MARKET"}
            parentId={details.MitigationDetailId}
            dispatch={"LOAD_CARBON_CREDIT_MARKET"}
            persist="CarbonCreditMarket"
            allowEdit={true}
            newItemTemplate={{
              "CarbonCreditMarketId": 0,
              "Value": "",
              "Description": ""
            }}
          />
          <SelectComponent
            id="selMitigationCDMStatus"
            col="col-md-4"
            label="CDM status:"
            selectedValue={details.CDMStatusId}
            data={cdmStatus}
            setSelectedValueKey={"SET_MITIGATION_CDM_STATUS"}
            parentId={details.MitigationDetailId}
            dispatch={"LOAD_CDM_STATUS"}
            persist="CDMStatus"
            allowEdit={true}
            newItemTemplate={{
              "CDMStatusId": 0,
              "Value": "",
              "Description": ""
            }}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            id="selMitigationCDMMethodology"
            col="col-md-4"
            label="CDM methodology:"
            selectedValue={details.CDMMethodologyId}
            data={cdmMethodology}
            setSelectedValueKey={"SET_MITIGATION_CDM_METHODOLOGY"}
            parentId={details.MitigationDetailId}
            dispatch={"LOAD_CDM_METHODOLOGY"}
            persist="CDMMethodology"
            allowEdit={true}
            newItemTemplate={{
              "CDMMethodologyId": 0,
              "Value": "",
              "Description": ""
            }}
          />
          <SelectComponent
            id="selMitigationVoluntaryMethodology"
            col="col-md-4"
            label="Voluntary methodology:"
            selectedValue={details.VoluntaryMethodologyId}
            data={voluntaryMethodology}
            setSelectedValueKey={"SET_MITIGATION_VOLUNTARY_METHODOLOGY"}
            parentId={details.MitigationDetailId}
            dispatch={"LOAD_VOLUNTARY_METHODOLOGY"}
            persist="VoluntaryMethodology"
            allowEdit={true}
            newItemTemplate={{
              "VoluntaryMethodologyId": 0,
              "Value": "",
              "Description": ""
            }}
          />
          <SelectComponent
            id="selMitigationVoluntaryGoldStandard"
            col="col-md-4"
            label="Voluntary gold standard:"
            selectedValue={details.VoluntaryGoldStandardId}
            data={voluntaryGoldStandard}
            setSelectedValueKey={"SET_MITIGATION_VOLUNTARY_GOLD_STANDARD"}
            parentId={details.MitigationDetailId}
            dispatch={"LOAD_VOLUNTARY_GOLD_STANDARD"}
            persist="VoluntaryGoldStandard"
            allowEdit={true}
            newItemTemplate={{
              "VoluntaryGoldStandardId": 0,
              "Value": "",
              "Description": ""
            }}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-4"
            label="CDM project number:"
            id="txtMitigationCDMProjectNumber"
            value={details.CDMProjectNumber}
            setValueKey={"SET_MITIGATION_CDM_PROJECT_NUMBER"}
            parentId={details.MitigationDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Other description:"
            id="txtMitigationOtherDescription"
            value={details.OtherDescription}
            setValueKey={"SET_MITIGATION_OTHER_DESCR"}
            parentId={details.MitigationDetailId}
          />
          <TreeSelectComponent
            id="selMitigationSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={"SET_MITIGATION_SECTOR"}
            parentId={details.MitigationDetailId}
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

        <div className="row">
          <SelectComponent
            id="selProjectStatus"
            col="col-md-4"
            label="Status:"
            selectedValue={details.ProjectStatusId}
            data={this.props.projectStatus}
            setSelectedValueKey={"SET_MITIGATION_DETAILS_PROJECT_STATUS"}
            parentId={details.MitigationDetailId}
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

        {
          (mitigationDetails && mitigationDetails.length > 1) &&
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

export default connect(mapStateToProps)(MitigationDetailsItem)