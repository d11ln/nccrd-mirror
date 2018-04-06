'use strict'

import React from 'react'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
    voluntaryMethodology, voluntaryGoldStandard, sector } } = state
  return {
    carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
    voluntaryMethodology, voluntaryGoldStandard, sector
  }
}

class MitigationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
      voluntaryMethodology, voluntaryGoldStandard, sector } = this.props

    return (
      <div>
        <br />

        <div className="row">
          <SelectComponent
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
            id="txtCDMProjectNumber"
            value={details.CDMProjectNumber}
            setValueKey={ACTION_TYPES.SET_MITIGATION_CDM_PROJECT_NUMBER}
            parentId={details.MitigationDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Other description:"
            id="txtOtherDescription"
            value={details.OtherDescription}
            setValueKey={ACTION_TYPES.SET_MITIGATION_OTHER_DESCR}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_SECTOR}
            parentId={details.MitigationDetailId}
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

      </div>
    )
  }
}

export default connect(mapStateToProps)(MitigationDetailsItem)