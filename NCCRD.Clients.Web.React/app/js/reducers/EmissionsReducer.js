'use strict'

import * as ACTION_TYPES from "../constants/action-types"
import { GetUID } from "../globalFunctions"

const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}

export default function EmissionsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0
    let modState = "original"

    //Check if additional data embedded in payload
    if (typeof payload !== 'undefined') {
        if (typeof payload.id !== 'undefined') {
            id = parseInt(payload.id)
        }
        if (typeof payload.state !== 'undefined') {
            modState = payload.state
        }
        if (typeof payload.value !== 'undefined') {
            payload = payload.value
        }
    }

    switch (type) {

        case ACTION_TYPES.LOAD_MITIGATION_EMISSIONS: {
            return { ...state, emissionsData: payload }
        }

        case ACTION_TYPES.RESET_EMISSION_STATE: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", payload.MitigationEmissionsDataId)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, state: "original" }] }
        }

        case ACTION_TYPES.ADD_MITIGATION_EMISSIONS: {

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
                "ProjectId": payload,
                "state": "modified"
            }

            return { ...state, emissionsData: [...emissionsData, newItem] }
        }

        case ACTION_TYPES.SET_EMISSIONS_YEAR: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Year: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_CO2: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CO2: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_CH4: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CH4: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_CH4_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CH4_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_N2O: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, N2O: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_N2O_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, N2O_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_HFC: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, HFC: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_HFC_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, HFC_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_PFC: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, PFC: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_PFC_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, PFC_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_SF6: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, SF6: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_SF6_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, SF6_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Hydro: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Hydro: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Hydro_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Hydro_CO2e: payload, state: modState }] }
        }   
        
        case ACTION_TYPES.SET_EMISSIONS_Tidal: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Tidal: payload, state: modState }] }
        } 

        case ACTION_TYPES.SET_EMISSIONS_Tidal_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Tidal_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Wind: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Wind: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Wind_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Wind_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Solar: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Solar: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Solar_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Solar_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_FossilFuelElecRed: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, FossilFuelElecRed: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_FossilFuelElecRed_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, FossilFuelElecRed_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_BioWaste: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, BioWaste: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_BioWaste_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, BioWaste_CO2e: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Geothermal: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Geothermal: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_EMISSIONS_Geothermal_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Geothermal_CO2e: payload, state: modState }] }
        }

        default: {
            return state
        }

    }
}
