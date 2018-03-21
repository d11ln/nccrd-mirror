'use strict'

import {
    LOAD_MITIGATION_DETAILS, ADD_MITIGATION_DETAILS, SET_MITIGATION_CARBON_CREDIT, SET_MITIGATION_CARBON_CREDIT_MARKET,
    SET_MITIGATION_CDM_STATUS, SET_MITIGATION_CDM_METHODOLOGY, SET_MITIGATION_VOLUNTARY_METHODOLOGY,
    SET_MITIGATION_VOLUNTARY_GOLD_STANDARD, SET_MITIGATION_CDM_PROJECT_NUMBER, SET_MITIGATION_OTHER_DESCR,
    SET_MITIGATION_SECTOR, RESET_MITIGATION_STATE
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

export default function MitigationsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check if ID embedded in payload
    if (typeof payload !== 'undefined' && typeof payload.value !== 'undefined') {
        id = parseInt(payload.id)
        payload = payload.value
    }

    switch (type) {

        case LOAD_MITIGATION_DETAILS: {
            return { ...state, mitigationDetails: payload }
        }

        case RESET_MITIGATION_STATE: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", payload.MitigationDetailId)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, state: "original" }] }
        }

        case ADD_MITIGATION_DETAILS: {

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

        case SET_MITIGATION_CARBON_CREDIT: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CarbonCreditId: payload, state: "modified" }] }
        }

        case SET_MITIGATION_CARBON_CREDIT_MARKET: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CarbonCreditMarketId: payload, state: "modified" }] }
        }

        case SET_MITIGATION_CDM_STATUS: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMStatusId: payload, state: "modified" }] }
        }

        case SET_MITIGATION_CDM_METHODOLOGY: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMMethodologyId: payload, state: "modified" }] }
        }

        case SET_MITIGATION_VOLUNTARY_METHODOLOGY: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, VoluntaryMethodologyId: payload, state: "modified" }] }
        }

        case SET_MITIGATION_VOLUNTARY_GOLD_STANDARD: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, VoluntaryGoldStandardId: payload, state: "modified" }] }
        }

        case SET_MITIGATION_CDM_PROJECT_NUMBER: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMProjectNumber: payload, state: "modified" }] }
        }

        case SET_MITIGATION_OTHER_DESCR: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, OtherDescription: payload, state: "modified" }] }
        }

        case SET_MITIGATION_SECTOR: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, SectorId: payload, state: "modified" }] }
        }

        default: {
            return state
        }

    }
}
