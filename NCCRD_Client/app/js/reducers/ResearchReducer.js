'use strict'

const _gf = require("../globalFunctions")
const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}


export default function ResearchReducer(state = {}, action) {

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

        case "LOAD_RESEARCH_DETAILS": {
            return { ...state, researchDetails: payload }
        }

        case "RESET_RESEARCH_STATE": {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", payload.ResearchDetailId)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, state: "original" }] }
        }

        case "ADD_RESEARCH_DETAILS": {

            let { researchDetails, projectDetails } = state

            let newItem = {
                "ResearchDetailId": parseInt(_gf.GetUID()),
                "Author": "",
                "PaperLink": "",
                "ResearchTypeId": 0,
                "TargetAudienceId": 0,
                "ProjectId": payload,
                "SectorId": 0,
                "state": "modified"
              }

            return { ...state, researchDetails: [...researchDetails, newItem] }
        }

        case "SET_RESEARCH_AUTHOR": {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, Author: payload, state: modState }] }
        }

        case "SET_RESEARCH_PAPER_LINK": {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, PaperLink: payload, state: modState }] }
        }

        case "SET_RESEARCH_RESEARCH_TYPE": {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, ResearchTypeId: payload, state: modState }] }
        }

        case "SET_RESEARCH_TARGET_AUDIENCE": {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, TargetAudienceId: payload, state: modState }] }
        }

        case "SET_RESEARCH_SECTOR": {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, SectorId: payload, state: modState }] }
        }

        default: {
            return state
        }

    }
}
