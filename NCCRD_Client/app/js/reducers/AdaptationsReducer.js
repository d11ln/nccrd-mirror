'use strict'

const _gf = require("../globalFunctions")
const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}

export default function AdaptationsReducer(state = {}, action) {

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

        case "LOAD_ADAPTATION_DETAILS": {
            return { ...state, adaptationDetails: payload }
        }

        case "RESET_ADAPTATION_STATE": {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", payload.AdaptationDetailId)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, state: "original" }] }
        }

        case "ADD_ADAPTATION_DETAILS": {

            let { adaptationDetails, projectDetails } = state

            let newItem = {
                "AdaptationDetailId": parseInt(_gf.GetUID()),
                "Description": "",
                "AdaptationPurposeId": 0,
                "ProjectId": payload,
                "SectorId": 0,
                "state": "modified"
            }

            return { ...state, adaptationDetails: [...adaptationDetails, newItem] }
        }

        case "SET_ADAPTATION_DETAILS_DESCR": {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, Description: payload, state: modState }] }
        }

        case "SET_ADAPTATION_DETAILS_PURPOSE": {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, AdaptationPurposeId: payload, state: modState }] }
        }

        case "SET_ADAPTATION_DETAILS_SECTOR": {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, SectorId: payload, state: modState }] }
        }

        default: {
            return state
        }

    }
}
