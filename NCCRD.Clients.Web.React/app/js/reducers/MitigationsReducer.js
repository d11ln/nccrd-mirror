'use strict'

import * as ACTION_TYPES from "../constants/action-types"

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

export default function MitigationsReducer(state = {}, action) {

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

        case ACTION_TYPES.LOAD_MITIGATION_DETAILS: {
            return { ...state, mitigationDetails: payload }
        }

        case ACTION_TYPES.RESET_MITIGATION_STATE: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", payload.MitigationDetailId)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, state: "original" }] }
        }

        case ACTION_TYPES.ADD_MITIGATION_DETAILS: {

            let { mitigationDetails, projectDetails } = state

            let newItem = {
                "MitigationDetailId": getUID(),
                "VCS": 0,
                "Other": 0,
                "OtherDescription": "",
                "CDMProjectNumber": "",
                "CarbonCreditId": 0,
                "CarbonCreditMarketId": 0,
                "CDMStatusId": 0,
                "CDMMethodologyId": 0,
                "VoluntaryMethodologyId": 0,
                "VoluntaryGoldStandardId": 0,
                "ProjectId": payload,
                "SectorId": 0,
                "state": "modified"
            }

            return { ...state, mitigationDetails: [...mitigationDetails, newItem] }
        }

        case ACTION_TYPES.SET_MITIGATION_CARBON_CREDIT: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CarbonCreditId: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_CARBON_CREDIT_MARKET: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CarbonCreditMarketId: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_CDM_STATUS: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMStatusId: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_CDM_METHODOLOGY: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMMethodologyId: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_VOLUNTARY_METHODOLOGY: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, VoluntaryMethodologyId: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_VOLUNTARY_GOLD_STANDARD: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, VoluntaryGoldStandardId: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_CDM_PROJECT_NUMBER: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMProjectNumber: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_OTHER_DESCR: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, OtherDescription: payload, state: modState }] }
        }

        case ACTION_TYPES.SET_MITIGATION_SECTOR: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, SectorId: payload, state: modState }] }
        }

        default: {
            return state
        }

    }
}
