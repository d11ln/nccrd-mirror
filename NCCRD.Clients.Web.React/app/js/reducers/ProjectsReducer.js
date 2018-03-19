'use strict'

import {
    LOAD_PROJECTS, LOAD_PROJECT_DETAILS, LOAD_ADAPTATION_DETAILS, LOAD_MITIGATION_DETAILS, LOAD_MITIGATION_EMISSIONS,
    LOAD_RESEARCH_DETAILS, SET_EDIT_MODE, SET_PROJECT_DETAILS_YEAR_FROM, SET_PROJECT_DETAILS_YEAR_TO,
    SET_PROJECT_DETAILS_BUDGET_FROM, SET_PROJECT_DETAILS_BUDGET_TO, SET_PROJECT_DETAILS_DESCRIPTION,
    SET_PROJECT_DETAILS_LEAD_AGENT, SET_PROJECT_DETAILS_HOST_PARTNER, SET_PROJECT_DETAILS_HOST_ORG,
    SET_PROJECT_DETAILS_ALT_CONTACT, SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL, SET_PROJECT_DETAILS_LINK,
    SET_PROJECT_DETAILS_VALIDATION_COMMENTS, SET_PROJECT_DETAILS_PROJECT_TYPE, SET_PROJECT_DETAILS_PROJECT_SUBTYPE,
    SET_PROJECT_DETAILS_PROJECT_STATUS, SET_PROJECT_DETAILS_PROJECT_MANAGER, SET_PROJECT_DETAILS_VALIDATION_STATUS,
    SET_PROJECT_DETAILS_MAOPTION, SET_ADAPTATION_DETAILS_DESCR, SET_ADAPTATION_DETAILS_PURPOSE, SET_ADAPTATION_DETAILS_SECTOR,
    ADD_ADAPTATION_DETAILS
} from "../constants/action-types";

const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}

function getUID() {
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    // });

    return new Date().valueOf();
}

export default function ProjectsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check id ID embedded in type
    if (type.includes("|")) {
        let res = type.split("|")
        type = res[0]
        id = parseInt(res[1])
    }

    switch (type) {

        case LOAD_PROJECTS: {
            return { ...state, projects: payload }
        }

        case LOAD_PROJECT_DETAILS: {
            return { ...state, projectDetails: payload }
        }

        case LOAD_ADAPTATION_DETAILS: {
            return { ...state, adaptationDetails: payload }
        }

        case ADD_ADAPTATION_DETAILS: {

            let { adaptationDetails, projectDetails } = state


            let newItem = {
                "AdaptationDetailId": getUID(),
                "Description": "",
                "AdaptationPurposeId": 0,
                "ProjectId": projectDetails.ProjectId,
                "SectorId": 0
            }

            return { ...state, adaptationDetails: [...adaptationDetails, newItem] }
        }

        case LOAD_MITIGATION_DETAILS: {
            return { ...state, mitigationDetails: payload }
        }

        case LOAD_MITIGATION_EMISSIONS: {
            return { ...state, emissionsData: payload }
        }

        case LOAD_RESEARCH_DETAILS: {
            return { ...state, researchDetails: payload }
        }

        case SET_EDIT_MODE: {
            return { ...state, editMode: payload }
        }

        case SET_PROJECT_DETAILS_YEAR_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, StartYear: payload } }
        }

        case SET_PROJECT_DETAILS_YEAR_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, EndYear: payload } }
        }

        case SET_PROJECT_DETAILS_BUDGET_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetLower: payload } }
        }

        case SET_PROJECT_DETAILS_BUDGET_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetUpper: payload } }
        }

        case SET_PROJECT_DETAILS_DESCRIPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectDescription: payload } }
        }

        case SET_PROJECT_DETAILS_LEAD_AGENT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, LeadAgent: payload } }
        }

        case SET_PROJECT_DETAILS_HOST_PARTNER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostPartner: payload } }
        }

        case SET_PROJECT_DETAILS_HOST_ORG: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostOrganisation: payload } }
        }

        case SET_PROJECT_DETAILS_ALT_CONTACT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContact: payload } }
        }

        case SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContactEmail: payload } }
        }

        case SET_PROJECT_DETAILS_LINK: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, Link: payload } }
        }

        case SET_PROJECT_DETAILS_VALIDATION_COMMENTS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationComments: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_TYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectTypeId: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_SUBTYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectSubTypeId: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectStatusId: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_MANAGER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectManagerId: payload } }
        }

        case SET_PROJECT_DETAILS_VALIDATION_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationStatusId: payload } }
        }

        case SET_PROJECT_DETAILS_MAOPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, MAOptionId: payload } }
        }

        case SET_ADAPTATION_DETAILS_DESCR: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, Description: payload }] }
        }

        case SET_ADAPTATION_DETAILS_PURPOSE: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, AdaptationPurposeId: payload }] }
        }

        case SET_ADAPTATION_DETAILS_SECTOR: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, SectorId: payload }] }
        }

        default: {
            return state
        }

    }
}