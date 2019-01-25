import React from 'react'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import TextComponent from '../../Shared/TextComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { DEAGreenDark } from '../../../config/colours.js'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { emissionsData: { emissionsData } } = state
  return { emissionsData }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MitigationEmissionsDataItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, emissionsData } = this.props

    return (
      <>
        <div className="row">
          <TextComponent
            col="col-md-3"
            label="Year:"
            id="txtEmissionsYear"
            value={details.Year}
            setValueKey={"SET_EMISSIONS_YEAR"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="CO2:"
            id="txtEmissionsCO2"
            value={details.CO2}
            setValueKey={"SET_EMISSIONS_CO2"}
            parentId={details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="CH4:"
            id="txtEmissionsCH4"
            value={details.CH4}
            setValueKey={"SET_EMISSIONS_CH4"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="CH4_CO2e:"
            id="txtEmissionsCH4_CO2e"
            value={details.CH4_CO2e}
            setValueKey={"SET_EMISSIONS_CH4_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="N2O:"
            id="txtEmissionsN2O"
            value={details.N2O}
            setValueKey={"SET_EMISSIONS_N2O"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="N2O_CO2e:"
            id="txtEmissionsN2O_CO2e"
            value={details.N2O_CO2e}
            setValueKey={"SET_EMISSIONS_N2O_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="HFC:"
            id="txtEmissionsHFC"
            value={details.HFC}
            setValueKey={"SET_EMISSIONS_HFC"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="HFC_CO2e:"
            id="txtEmissionsHFC_CO2e"
            value={details.HFC_CO2e}
            setValueKey={"SET_EMISSIONS_HFC_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="PFC:"
            id="txtEmissionsPFC"
            value={details.PFC}
            setValueKey={"SET_EMISSIONS_PFC"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="PFC_CO2e:"
            id="txtEmissionsPFC_CO2e"
            value={details.PFC_CO2e}
            setValueKey={"SET_EMISSIONS_PFC_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="SF6:"
            id="txtEmissionsSF6"
            value={details.SF6}
            setValueKey={"SET_EMISSIONS_SF6"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="SF6_CO2e:"
            id="txtEmissionsSF6_CO2e"
            value={details.SF6_CO2e}
            setValueKey={"SET_EMISSIONS_SF6_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Hydro:"
            id="txtEmissionsHydro"
            value={details.Hydro}
            setValueKey={"SET_EMISSIONS_Hydro"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Hydro_CO2e:"
            id="txtEmissionsHydro_CO2e"
            value={details.Hydro_CO2e}
            setValueKey={"SET_EMISSIONS_Hydro_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="Tidal:"
            id="txtEmissionsTidal"
            value={details.Tidal}
            setValueKey={"SET_EMISSIONS_Tidal"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Tidal_CO2e:"
            id="txtEmissionsTidal_CO2e"
            value={details.Tidal_CO2e}
            setValueKey={"SET_EMISSIONS_Tidal_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Wind:"
            id="txtEmissionsWind"
            value={details.Wind}
            setValueKey={"SET_EMISSIONS_Wind"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Wind_CO2e:"
            id="txtEmissionsWind_CO2e"
            value={details.Wind_CO2e}
            setValueKey={"SET_EMISSIONS_Wind_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="Solar:"
            id="txtEmissionsSolar"
            value={details.Solar}
            setValueKey={"SET_EMISSIONS_Solar"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Solar_CO2e:"
            id="txtEmissionsSolar_CO2e"
            value={details.Solar_CO2e}
            setValueKey={"SET_EMISSIONS_Solar_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="FossilFuelElecRed:"
            id="txtEmissionsFossilFuelElecRed"
            value={details.FossilFuelElecRed}
            setValueKey={"SET_EMISSIONS_FossilFuelElecRed"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="FossilFuelElecRed_CO2e:"
            id="txtEmissionsFossilFuelElecRed_CO2e"
            setValueKey={"SET_EMISSIONS_FossilFuelElecRed_CO2e"}
            parentId={details.MitigationEmissionsDataId}
            value={details.FossilFuelElecRed_CO2e} />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-3"
            label="BioWaste:"
            id="txtEmissionsBioWaste"
            value={details.BioWaste}
            setValueKey={"SET_EMISSIONS_BioWaste"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="BioWaste_CO2e:"
            id="txtEmissionsBioWaste_CO2e"
            value={details.BioWaste_CO2e}
            setValueKey={"SET_EMISSIONS_BioWaste_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Geothermal:"
            id="txtEmissionsGeothermal"
            value={details.Geothermal}
            setValueKey={"SET_EMISSIONS_Geothermal"}
            parentId={details.MitigationEmissionsDataId}
          />
          <TextComponent
            col="col-md-3"
            label="Geothermal_CO2e:"
            id="txtEmissionsGeothermal_CO2e"
            value={details.Geothermal_CO2e}
            setValueKey={"SET_EMISSIONS_Geothermal_CO2e"}
            parentId={details.MitigationEmissionsDataId}
          />
        </div>

        {
          (emissionsData && emissionsData.length > 1) &&
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

export default connect(mapStateToProps, mapDispatchToProps)(MitigationEmissionsDataItem)