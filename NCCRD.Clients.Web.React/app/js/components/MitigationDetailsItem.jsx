'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import {
  LOAD_CARBON_CREDIT, LOAD_CARBON_CREDIT_MARKET, LOAD_CDM_STATUS, LOAD_CDM_METHODOLOGY, LOAD_VOLUNTARY_METHODOLOGY,
  LOAD_VOLUNTARY_GOLD_STANDARD, LOAD_SECTOR, SET_LOADING, SET_MITIGATION_CARBON_CREDIT, SET_MITIGATION_CARBON_CREDIT_MARKET,
  SET_MITIGATION_CDM_STATUS, SET_MITIGATION_CDM_METHODOLOGY, SET_MITIGATION_VOLUNTARY_METHODOLOGY,
  SET_MITIGATION_VOLUNTARY_GOLD_STANDARD, SET_MITIGATION_CDM_PROJECT_NUMBER, SET_MITIGATION_OTHER_DESCR,
  SET_MITIGATION_SECTOR
} from "../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
    voluntaryMethodology, voluntaryGoldStandard, sector } } = state
  return {
    carbonCredit, carbonCreditMarket, cdmStatus, cdmMethodology,
    voluntaryMethodology, voluntaryGoldStandard, sector
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCarbonCredit: payload => {
      dispatch({ type: LOAD_CARBON_CREDIT, payload })
    },
    loadCarbonCreditMarket: payload => {
      dispatch({ type: LOAD_CARBON_CREDIT_MARKET, payload })
    },
    loadCDMStatus: payload => {
      dispatch({ type: LOAD_CDM_STATUS, payload })
    },
    loadCDMMethodology: payload => {
      dispatch({ type: LOAD_CDM_METHODOLOGY, payload })
    },
    loadVoluntaryMethodology: payload => {
      dispatch({ type: LOAD_VOLUNTARY_METHODOLOGY, payload })
    },
    loadVoluntaryGoldStandard: payload => {
      dispatch({ type: LOAD_VOLUNTARY_GOLD_STANDARD, payload })
    },
    loadSectors: payload => {
      dispatch({ type: LOAD_SECTOR, payload })
    },
    setLoading: payload => {
      dispatch({ type: SET_LOADING, payload })
    }
  }
}

class MitigationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  loadCarbonCredit() {

    //LOAD_CARBON_CREDIT
    let { loadCarbonCredit } = this.props

    fetch(apiBaseURL + 'api/CarbonCredit/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadCarbonCredit(res)
    })
  }

  loadCarbonCreditMarket() {

    //LOAD_CARBON_CREDIT_MARKET
    let { loadCarbonCreditMarket } = this.props

    fetch(apiBaseURL + 'api/CarbonCreditMarket/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadCarbonCreditMarket(res)
    })
  }

  loadCDMStatus() {

    //LOAD_CDM_STATUS
    let { loadCDMStatus } = this.props

    fetch(apiBaseURL + 'api/CDMStatus/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadCDMStatus(res)
    })
  }

  loadCDMMethodology() {

    //LOAD_CDM_METHODOLOG
    let { loadCDMMethodology } = this.props

    fetch(apiBaseURL + 'api/CDMMethodology/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadCDMMethodology(res)
    })
  }

  loadVoluntaryMethodology() {

    //LOAD_VOLUNTARY_METHODOLOGY
    let { loadVoluntaryMethodology } = this.props

    fetch(apiBaseURL + 'api/VoluntaryMethodology/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadVoluntaryMethodology(res)
    })
  }

  loadVoluntaryGoldStandard() {

    //LOAD_VOLUNTARY_GOLD_STANDARD
    let { loadVoluntaryGoldStandard } = this.props

    fetch(apiBaseURL + 'api/VoluntaryGoldStandard/GetAll/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadVoluntaryGoldStandard(res)
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
      this.loadCarbonCredit(),
      this.loadCarbonCreditMarket(),
      this.loadCDMStatus(),
      this.loadCDMMethodology(),
      this.loadVoluntaryMethodology(),
      this.loadVoluntaryGoldStandard(),
      this.loadSectors()
    ).done(() => { setLoading(false) })
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
            setSelectedValueKey={SET_MITIGATION_CARBON_CREDIT}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Carbon credit market:"
            selectedValue={details.CarbonCreditMarketId}
            options={carbonCreditMarket}
            setSelectedValueKey={SET_MITIGATION_CARBON_CREDIT_MARKET}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="CDM status:"
            selectedValue={details.CDMStatusId}
            options={cdmStatus}
            setSelectedValueKey={SET_MITIGATION_CDM_STATUS}
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
            setSelectedValueKey={SET_MITIGATION_CDM_METHODOLOGY}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Voluntary methodology:"
            selectedValue={details.VoluntaryMethodologyId}
            options={voluntaryMethodology}
            setSelectedValueKey={SET_MITIGATION_VOLUNTARY_METHODOLOGY}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Voluntary gold standard:"
            selectedValue={details.VoluntaryGoldStandardId}
            options={voluntaryGoldStandard}
            setSelectedValueKey={SET_MITIGATION_VOLUNTARY_GOLD_STANDARD}
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
            setValueKey={SET_MITIGATION_CDM_PROJECT_NUMBER}
            parentId={details.MitigationDetailId}
          />
          <TextComponent
            col="col-md-4"
            label="Other description:"
            id="txtOtherDescription"
            value={details.OtherDescription}
            setValueKey={SET_MITIGATION_OTHER_DESCR}
            parentId={details.MitigationDetailId}
          />
          <SelectComponent
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            options={sector}
            setSelectedValueKey={SET_MITIGATION_SECTOR}
            parentId={details.MitigationDetailId}
          />
        </div>

        <br />
        <hr />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationDetailsItem)