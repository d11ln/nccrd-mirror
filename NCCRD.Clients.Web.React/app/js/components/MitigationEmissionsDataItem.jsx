'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import TextComponent from './TextComponent.jsx'
import {
  SET_EMISSIONS_YEAR, SET_EMISSIONS_CO2, SET_EMISSIONS_CH4, SET_EMISSIONS_CH4_CO2e, SET_EMISSIONS_N2O, SET_EMISSIONS_N2O_CO2e,
  SET_EMISSIONS_HFC, SET_EMISSIONS_HFC_CO2e, SET_EMISSIONS_PFC, SET_EMISSIONS_PFC_CO2e, SET_EMISSIONS_SF6,
  SET_EMISSIONS_SF6_CO2e, SET_EMISSIONS_Hydro, SET_EMISSIONS_Hydro_CO2e, SET_EMISSIONS_Tidal, SET_EMISSIONS_Tidal_CO2e,
  SET_EMISSIONS_Wind, SET_EMISSIONS_Wind_CO2e, SET_EMISSIONS_Solar, SET_EMISSIONS_Solar_CO2e, SET_EMISSIONS_FossilFuelElecRed,
  SET_EMISSIONS_FossilFuelElecRed_CO2e, SET_EMISSIONS_BioWaste, SET_EMISSIONS_BioWaste_CO2e, SET_EMISSIONS_Geothermal,
  SET_EMISSIONS_Geothermal_CO2e
} from "../constants/action-types"

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
          <TextComponent
            col="col-md-3"
            label="Year:"
            id="txtYear"
            value={details.Year}
            setValueKey={SET_EMISSIONS_YEAR + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="CO2:"
            id="txtCO2"
            value={details.CO2}
            setValueKey={SET_EMISSIONS_CO2 + "|" + details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="CH4:"
            id="txtCH4"
            value={details.CH4}
            setValueKey={SET_EMISSIONS_CH4 + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="CH4_CO2e:"
            id="txtCH4_CO2e"
            value={details.CH4_CO2e}
            setValueKey={SET_EMISSIONS_CH4_CO2e + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="N2O:"
            id="txtN2O"
            value={details.N2O}
            setValueKey={SET_EMISSIONS_N2O + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="N2O_CO2e:"
            id="txtN2O_CO2e"
            value={details.N2O_CO2e}
            setValueKey={SET_EMISSIONS_N2O_CO2e + "|" + details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="HFC:"
            id="txtHFC"
            value={details.HFC}
            setValueKey={SET_EMISSIONS_HFC + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="HFC_CO2e:"
            id="txtHFC_CO2e"
            value={details.HFC_CO2e}
            setValueKey={SET_EMISSIONS_HFC_CO2e + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="PFC:"
            id="txtPFC"
            value={details.PFC}
            setValueKey={SET_EMISSIONS_PFC + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="PFC_CO2e:"
            id="txtPFC_CO2e"
            value={details.PFC_CO2e}
            setValueKey={SET_EMISSIONS_PFC_CO2e + "|" + details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="SF6:"
            id="txtSF6"
            value={details.SF6}
            setValueKey={SET_EMISSIONS_SF6 + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="SF6_CO2e:"
            id="txtSF6_CO2e"
            value={details.SF6_CO2e}
            setValueKey={SET_EMISSIONS_SF6_CO2e + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Hydro:"
            id="txtHydro"
            value={details.Hydro}
            setValueKey={SET_EMISSIONS_Hydro + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Hydro_CO2e:"
            id="txtHydro_CO2e"
            value={details.Hydro_CO2e}
            setValueKey={SET_EMISSIONS_Hydro_CO2e + "|" + details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="Tidal:"
            id="txtTidal"
            value={details.Tidal}
            setValueKey={SET_EMISSIONS_Tidal + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Tidal_CO2e:"
            id="txtTidal_CO2e"
            value={details.Tidal_CO2e}
            setValueKey={SET_EMISSIONS_Tidal_CO2e + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Wind:"
            id="txtWind"
            value={details.Wind}
            setValueKey={SET_EMISSIONS_Wind + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Wind_CO2e:"
            id="txtWind_CO2e"
            value={details.Wind_CO2e}
            setValueKey={SET_EMISSIONS_Wind_CO2e + "|" + details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="Solar:"
            id="txtSolar"
            value={details.Solar}
            setValueKey={SET_EMISSIONS_Solar + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Solar_CO2e:"
            id="txtSolar_CO2e"
            value={details.Solar_CO2e}
            setValueKey={SET_EMISSIONS_Solar_CO2e + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="FossilFuelElecRed:"
            id="txtFossilFuelElecRed"
            value={details.FossilFuelElecRed}
            setValueKey={SET_EMISSIONS_FossilFuelElecRed + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="FossilFuelElecRed_CO2e:"
            id="txtFossilFuelElecRed_CO2e"
            setValueKey={SET_EMISSIONS_FossilFuelElecRed_CO2e + "|" + details.MitigationEmissionsDataId}
            value={details.FossilFuelElecRed_CO2e} />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="BioWaste:"
            id="txtBioWaste"
            value={details.BioWaste}
            setValueKey={SET_EMISSIONS_BioWaste + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="BioWaste_CO2e:"
            id="txtBioWaste_CO2e"
            value={details.BioWaste_CO2e}
            setValueKey={SET_EMISSIONS_BioWaste_CO2e + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Geothermal:"
            id="txtGeothermal"
            value={details.Geothermal}
            setValueKey={SET_EMISSIONS_Geothermal + "|" + details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Geothermal_CO2e:"
            id="txtGeothermal_CO2e"
            value={details.Geothermal_CO2e}
            setValueKey={SET_EMISSIONS_Geothermal_CO2e + "|" + details.MitigationEmissionsDataId}
          />
        </div>

        <br />
        <hr />

      </div>
    )
  }
}

export default MitigationEmissionsDataItem