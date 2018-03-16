'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import TextComponent from './TextComponent.jsx'

class MitigationEmissionsDataItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details } = this.props

    return (
      <div>
        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="Year:" id="txtYear" value={details.Year} />
          <TextComponent col="col-md-3" readOnly="true" label="CO2:" id="txtCO2" value={details.CO2} />
        </div>

        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="CH4:" id="txtCH4" value={details.CH4} />
          <TextComponent col="col-md-3" readOnly="true" label="CH4_CO2e:" id="txtCH4_CO2e" value={details.CH4_CO2e} />
          <TextComponent col="col-md-3" readOnly="true" label="N2O:" id="txtN2O" value={details.N2O} />
          <TextComponent col="col-md-3" readOnly="true" label="N2O_CO2e:" id="txtN2O_CO2e" value={details.N2O_CO2e} />
        </div>

        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="HFC:" id="txtHFC" value={details.HFC} />
          <TextComponent col="col-md-3" readOnly="true" label="HFC_CO2e:" id="txtHFC_CO2e" value={details.HFC_CO2e} />
          <TextComponent col="col-md-3" readOnly="true" label="PFC:" id="txtPFC" value={details.PFC} />
          <TextComponent col="col-md-3" readOnly="true" label="PFC_CO2e:" id="txtPFC_CO2e" value={details.PFC_CO2e} />
        </div>
        
        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="SF6:" id="txtSF6" value={details.SF6} />
          <TextComponent col="col-md-3" readOnly="true" label="SF6_CO2e:" id="txtSF6_CO2e" value={details.SF6_CO2e} />
          <TextComponent col="col-md-3" readOnly="true" label="Hydro:" id="txtHydro" value={details.Hydro} />
          <TextComponent col="col-md-3" readOnly="true" label="Hydro_CO2e:" id="txtHydro_CO2e" value={details.Hydro_CO2e} />
        </div>
                
        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="Tidal:" id="txtTidal" value={details.Tidal} />
          <TextComponent col="col-md-3" readOnly="true" label="Tidal_CO2e:" id="txtTidal_CO2e" value={details.Tidal_CO2e} />
          <TextComponent col="col-md-3" readOnly="true" label="Wind:" id="txtWind" value={details.Wind} />
          <TextComponent col="col-md-3" readOnly="true" label="Wind_CO2e:" id="txtWind_CO2e" value={details.Wind_CO2e} />
        </div>
                        
        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="Solar:" id="txtSolar" value={details.Solar} />
          <TextComponent col="col-md-3" readOnly="true" label="Solar_CO2e:" id="txtSolar_CO2e" value={details.Solar_CO2e} />
          <TextComponent col="col-md-3" readOnly="true" label="FossilFuelElecRed:" id="txtFossilFuelElecRed" value={details.FossilFuelElecRed} />
          <TextComponent col="col-md-3" readOnly="true" label="FossilFuelElecRed_CO2e:" id="txtFossilFuelElecRed_CO2e" value={details.FossilFuelElecRed_CO2e} />
        </div>
                                
        <br />

        <div className="row">
          <TextComponent col="col-md-3" readOnly="true" label="BioWaste:" id="txtBioWaste" value={details.BioWaste} />
          <TextComponent col="col-md-3" readOnly="true" label="BioWaste_CO2e:" id="txtBioWaste_CO2e" value={details.BioWaste_CO2e} />
          <TextComponent col="col-md-3" readOnly="true" label="Geothermal:" id="txtGeothermal" value={details.Geothermal} />
          <TextComponent col="col-md-3" readOnly="true" label="Geothermal_CO2e:" id="txtGeothermal_CO2e" value={details.Geothermal_CO2e} />
        </div>

        <br />
        <hr />

      </div>
    )
  }
}

export default MitigationEmissionsDataItem