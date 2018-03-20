'use strict'

import {
    LOAD_MITIGATION_EMISSIONS, ADD_MITIGATION_EMISSIONS, SET_EMISSIONS_YEAR, SET_EMISSIONS_CO2, SET_EMISSIONS_CH4,
    SET_EMISSIONS_CH4_CO2e, SET_EMISSIONS_N2O, SET_EMISSIONS_N2O_CO2e, SET_EMISSIONS_HFC, SET_EMISSIONS_HFC_CO2e,
    SET_EMISSIONS_PFC, SET_EMISSIONS_PFC_CO2e, SET_EMISSIONS_SF6, SET_EMISSIONS_SF6_CO2e, SET_EMISSIONS_Hydro,
    SET_EMISSIONS_Hydro_CO2e, SET_EMISSIONS_Tidal, SET_EMISSIONS_Tidal_CO2e, SET_EMISSIONS_Wind, SET_EMISSIONS_Wind_CO2e,
    SET_EMISSIONS_Solar, SET_EMISSIONS_Solar_CO2e, SET_EMISSIONS_FossilFuelElecRed, SET_EMISSIONS_FossilFuelElecRed_CO2e,
    SET_EMISSIONS_BioWaste, SET_EMISSIONS_BioWaste_CO2e, SET_EMISSIONS_Geothermal, SET_EMISSIONS_Geothermal_CO2e
} from "../constants/action-types";

const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}

function getUID() {
    return new Date().valueOf();
}

export default function EmissionsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check id ID embedded in type
    if (type.includes("|")) {
        let res = type.split("|")
        type = res[0]
        id = parseInt(res[1])
    }

    switch (type) {

        case LOAD_MITIGATION_EMISSIONS: {
            return { ...state, emissionsData: payload }
        }

        case ADD_MITIGATION_EMISSIONS: {

            let { emissionsData, projectDetails } = state

            let newItem = {
                "MitigationEmissionsDataId": getUID(),
                "Year": 0,
                "CO2": 0,
                "CH4": 0,
                "CH4_CO2e": 0,
                "N2O": 0,
                "N2O_CO2e": 0,
                "HFC": 0,
                "HFC_CO2e": 0,
                "PFC": 0,
                "PFC_CO2e": 0,
                "SF6": 0,
                "SF6_CO2e": 0,
                "Hydro": 0,
                "Hydro_CO2e": 0,
                "Tidal": 0,
                "Tidal_CO2e": 0,
                "Wind": 0,
                "Wind_CO2e": 0,
                "Solar": 0,
                "Solar_CO2e": 0,
                "FossilFuelElecRed": 0,
                "FossilFuelElecRed_CO2e": 0,
                "BioWaste": 0,
                "BioWaste_CO2e": 0,
                "Geothermal": 0,
                "Geothermal_CO2e": 0,
                "ProjectId": projectDetails.ProjectId
            }

            return { ...state, emissionsData: [...emissionsData, newItem] }
        }

        case SET_EMISSIONS_YEAR: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Year: payload }] }
        }

        case SET_EMISSIONS_CO2: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CO2: payload }] }
        }

        case SET_EMISSIONS_CH4: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CH4: payload }] }
        }

        case SET_EMISSIONS_CH4_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CH4_CO2e: payload }] }
        }

        case SET_EMISSIONS_N2O: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, N2O: payload }] }
        }

        case SET_EMISSIONS_N2O_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, N2O_CO2e: payload }] }
        }

        case SET_EMISSIONS_HFC: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, HFC: payload }] }
        }

        case SET_EMISSIONS_HFC_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, HFC_CO2e: payload }] }
        }

        case SET_EMISSIONS_PFC: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, PFC: payload }] }
        }

        case SET_EMISSIONS_PFC_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, PFC_CO2e: payload }] }
        }

        case SET_EMISSIONS_SF6: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, SF6: payload }] }
        }

        case SET_EMISSIONS_SF6_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, SF6_CO2e: payload }] }
        }

        case SET_EMISSIONS_Hydro: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Hydro: payload }] }
        }

        case SET_EMISSIONS_Hydro_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Hydro_CO2e: payload }] }
        }   
        
        case SET_EMISSIONS_Tidal: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Tidal: payload }] }
        } 

        case SET_EMISSIONS_Tidal_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Tidal_CO2e: payload }] }
        }

        case SET_EMISSIONS_Wind: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Wind: payload }] }
        }

        case SET_EMISSIONS_Wind_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Wind_CO2e: payload }] }
        }

        case SET_EMISSIONS_Solar: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Solar: payload }] }
        }

        case SET_EMISSIONS_Solar_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Solar_CO2e: payload }] }
        }

        case SET_EMISSIONS_FossilFuelElecRed: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, FossilFuelElecRed: payload }] }
        }

        case SET_EMISSIONS_FossilFuelElecRed_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, FossilFuelElecRed_CO2e: payload }] }
        }

        case SET_EMISSIONS_BioWaste: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, BioWaste: payload }] }
        }

        case SET_EMISSIONS_BioWaste_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, BioWaste_CO2e: payload }] }
        }

        case SET_EMISSIONS_Geothermal: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Geothermal: payload }] }
        }

        case SET_EMISSIONS_Geothermal_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Geothermal_CO2e: payload }] }
        }

        default: {
            return state
        }

    }
}
