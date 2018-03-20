'use strict'

import {
    LOAD_RESEARCH_DETAILS, ADD_RESEARCH_DETAILS, SET_RESEARCH_AUTHOR, SET_RESEARCH_PAPER_LINK, 
    SET_RESEARCH_RESEARCH_TYPE, SET_RESEARCH_TARGET_AUDIENCE, SET_RESEARCH_SECTOR
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

export default function ResearchReducerr(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check id ID embedded in type
    if (type.includes("|")) {
        let res = type.split("|")
        type = res[0]
        id = parseInt(res[1])
    }

    switch (type) {

        case LOAD_RESEARCH_DETAILS: {
            return { ...state, researchDetails: payload }
        }

        case ADD_RESEARCH_DETAILS: {

            let { researchDetails, projectDetails } = state

            let newItem = {
                "ResearchDetailId": getUID(),
                "Author": "",
                "PaperLink": "",
                "ResearchTypeId": 0,
                "TargetAudienceId": 0,
                "ProjectId": payload,
                "SectorId": 0
              }

            return { ...state, researchDetails: [...researchDetails, newItem] }
        }

        case SET_RESEARCH_AUTHOR: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, Author: payload }] }
        }

        case SET_RESEARCH_PAPER_LINK: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, PaperLink: payload }] }
        }

        case SET_RESEARCH_RESEARCH_TYPE: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, ResearchTypeId: payload }] }
        }

        case SET_RESEARCH_TARGET_AUDIENCE: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, TargetAudienceId: payload }] }
        }

        case SET_RESEARCH_SECTOR: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, SectorId: payload }] }
        }

        default: {
            return state
        }

    }
}
