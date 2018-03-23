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

export default function AdaptationsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check if ID embedded in payload
    if (typeof payload !== 'undefined' && typeof payload.value !== 'undefined') {
        id = parseInt(payload.id)
        payload = payload.value
    }

    switch (type) {

        case ACTION_TYPES.LOAD_ADAPTATION_DETAILS: {
            return { ...state, adaptationDetails: payload }
        }

        case ACTION_TYPES.RESET_ADAPTATION_STATE: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", payload.AdaptationDetailId)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, state: "original" }] }
        }

        case ACTION_TYPES.ADD_ADAPTATION_DETAILS: {

            let { adaptationDetails, projectDetails } = state

            let newItem = {
                "AdaptationDetailId": getUID(),
                "Description": "",
                "AdaptationPurposeId": 0,
                "ProjectId": payload,
                "SectorId": 0,
                "state": "modified"
            }

            return { ...state, adaptationDetails: [...adaptationDetails, newItem] }
        }

        case ACTION_TYPES.SET_ADAPTATION_DETAILS_DESCR: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, Description: payload, state: "modified" }] }
        }

        case ACTION_TYPES.SET_ADAPTATION_DETAILS_PURPOSE: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, AdaptationPurposeId: payload, state: "modified" }] }
        }

        case ACTION_TYPES.SET_ADAPTATION_DETAILS_SECTOR: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, SectorId: payload, state: "modified" }] }
        }

        default: {
            return state
        }

    }
}
