'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import {
  LOAD_CARBON_CREDIT, LOAD_CARBON_CREDIT_MARKET, LOAD_CDM_STATUS, LOAD_CDM_METHODOLOGY, LOAD_VOLUNTARY_METHODOLOGY,
  LOAD_VOLUNTARY_GOLD_STANDARD, LOAD_SECTOR, SET_LOADING
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

  loadCarbonCredit(){

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

  loadCarbonCreditMarket(){

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

  loadCDMStatus(){

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

  loadCDMMethodology(){

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

  loadVoluntaryMethodology(){

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

  loadVoluntaryGoldStandard(){

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

  loadSectors(){

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
          <SelectComponent col="col-md-4" label="Carbon credit:" readOnly="true"
            value={details.CarbonCreditId} options={carbonCredit} />
          <SelectComponent col="col-md-4" label="Carbon credit market:" readOnly="true"
            value={details.CarbonCreditMarketId} options={carbonCreditMarket} />
          <SelectComponent col="col-md-4" label="CDM status:" readOnly="true"
            value={details.CDMStatusId} options={cdmStatus} />
        </div>

        <br />

        <div className="row">
          <SelectComponent col="col-md-4" label="CDM methodology:" readOnly="true"
            value={details.CDMMethodologyId} options={cdmMethodology} />
          <SelectComponent col="col-md-4" label="Voluntary methodology:" readOnly="true"
            value={details.VoluntaryMethodologyId} options={voluntaryMethodology} />
          <SelectComponent col="col-md-4" label="Voluntary gold standard:" readOnly="true"
            value={details.VoluntaryGoldStandardId} options={voluntaryGoldStandard} />
        </div>

        <br />

        <div className="row">
          <TextComponent col="col-md-4" readOnly="true" label="CDM project number:" id="txtCDMProjectNumber" value={details.CDMProjectNumber} />
          <TextComponent col="col-md-4" readOnly="true" label="Other description:" id="txtOtherDescription" value={details.OtherDescription} />
          <SelectComponent col="col-md-4" label="Sector:" readOnly="true"
            value={details.SectorId} options={sector} />
        </div>


        <br />
        <hr />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationDetailsItem)