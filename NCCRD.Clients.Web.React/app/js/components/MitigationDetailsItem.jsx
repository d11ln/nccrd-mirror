'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import * as ACTION_TYPES from "../constants/action-types"

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
            options={carbonCredit}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CARBON_CREDIT}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Carbon credit market:"
            selectedValue={details.CarbonCreditMarketId}
            options={carbonCreditMarket}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CARBON_CREDIT_MARKET}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="CDM status:"
            selectedValue={details.CDMStatusId}
            options={cdmStatus}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CDM_STATUS}
            parentId={details.MitigationDetailId}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            col="col-md-4"
            label="CDM methodology:"
            selectedValue={details.CDMMethodologyId}
            options={cdmMethodology}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_CDM_METHODOLOGY}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Voluntary methodology:"
            selectedValue={details.VoluntaryMethodologyId}
            options={voluntaryMethodology}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_VOLUNTARY_METHODOLOGY}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Voluntary gold standard:"
            selectedValue={details.VoluntaryGoldStandardId}
            options={voluntaryGoldStandard}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_VOLUNTARY_GOLD_STANDARD}
            parentId={details.MitigationDetailId}
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
            options={sector}
            setSelectedValueKey={ACTION_TYPES.SET_MITIGATION_SECTOR}
            parentId={details.MitigationDetailId}
          />
        </div>

        <br />
        <hr />

      </div>
    )
  }
}

export default connect(mapStateToProps)(MitigationDetailsItem)