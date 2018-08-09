'use strict'

import React from 'react'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import ReactTooltip from 'react-tooltip'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'

const mapStateToProps = (state, props) => {
  let { lookupData: { carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
    voluntaryMethodology, voluntaryGoldStandard, sector, sectorType, typology } } = state
  return {
    carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
    voluntaryMethodology, voluntaryGoldStandard, sector, sectorType, typology
  }
}

class MitigationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
      voluntaryMethodology, voluntaryGoldStandard, sector, sectorType, typology } = this.props

    return (
      <>
        <div className="row">
          <SelectComponent
            id="selMitigationCarbonCredit"
            col="col-md-4"
            label="Carbon credit:"
            selectedValue={details.CarbonCreditId}
            data={carbonCredit}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CARBON_CREDIT}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_CARBON_CREDIT}
            persist={"api/CarbonCredit/AddOrUpdate"}
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
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CARBON_CREDIT_MARKET}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_CARBON_CREDIT_MARKET}
            persist={"api/CarbonCreditMarket/AddOrUpdate"}
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
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CDM_STATUS}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_CDM_STATUS}
            persist={"api/CDMStatus/AddOrUpdate"}
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
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CDM_METHODOLOGY}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_CDM_METHODOLOGY}
            persist={"api/CDMMethodology/AddOrUpdate"}
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
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_VOLUNTARY_METHODOLOGY}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_VOLUNTARY_METHODOLOGY}
            persist={"api/VoluntaryMethodology/AddOrUpdate"}
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
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_VOLUNTARY_GOLD_STANDARD}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_VOLUNTARY_GOLD_STANDARD}
            persist={"api/VoluntaryGoldStandard/AddOrUpdate"}
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
            setValueKey={ACTION_TYPES.SET_MITIGATION_CDM_PROJECT_NUMBER}
            parentId={details.MitigationDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Other description:"
            id="txtMitigationOtherDescription"
            value={details.OtherDescription}
            setValueKey={ACTION_TYPES.SET_MITIGATION_OTHER_DESCR}
            parentId={details.MitigationDetailId}
          />
          <TreeSelectComponent
            id="selMitigationSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_SECTOR}
            parentId={details.MitigationDetailId}
            dispatch={ACTION_TYPES.LOAD_SECTOR}
            persist="api/Sector/AddOrUpdate"
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
        <hr />
        <br />

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps)(MitigationDetailsItem)