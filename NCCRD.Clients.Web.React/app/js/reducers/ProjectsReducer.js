'use strict'

import {
    LOAD_PROJECTS, LOAD_PROJECT_DETAILS, SET_PROJECT_DETAILS_YEAR_FROM, SET_PROJECT_DETAILS_YEAR_TO,
    SET_PROJECT_DETAILS_BUDGET_FROM, SET_PROJECT_DETAILS_BUDGET_TO, SET_PROJECT_DETAILS_DESCRIPTION,
    SET_PROJECT_DETAILS_LEAD_AGENT, SET_PROJECT_DETAILS_HOST_PARTNER, SET_PROJECT_DETAILS_HOST_ORG,
    SET_PROJECT_DETAILS_ALT_CONTACT, SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL, SET_PROJECT_DETAILS_LINK,
    SET_PROJECT_DETAILS_VALIDATION_COMMENTS, SET_PROJECT_DETAILS_PROJECT_TYPE, SET_PROJECT_DETAILS_PROJECT_SUBTYPE,
    SET_PROJECT_DETAILS_PROJECT_STATUS, SET_PROJECT_DETAILS_PROJECT_MANAGER, SET_PROJECT_DETAILS_VALIDATION_STATUS,
    SET_PROJECT_DETAILS_MAOPTION, RESET_PROJECT_STATE
} from "../constants/action-types";

const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}

export default function ProjectsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check if ID embedded in payload
    if (typeof payload !== 'undefined' && typeof payload.value !== 'undefined') {
        id = parseInt(payload.id)
        payload = payload.value
    }

    switch (type) {

        case RESET_PROJECT_STATE: {
            return {
                ...state, projectDetails: { ...payload, state: "original" }}
        }

        case LOAD_PROJECTS: {
            return { ...state, projects: payload }
        }

        case LOAD_PROJECT_DETAILS: {
            return { ...state, projectDetails: { ...payload, state: "original" } }
        }

        case SET_PROJECT_DETAILS_YEAR_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, StartYear: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_YEAR_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, EndYear: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_BUDGET_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetLower: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_BUDGET_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetUpper: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_DESCRIPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectDescription: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_LEAD_AGENT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, LeadAgent: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_HOST_PARTNER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostPartner: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_HOST_ORG: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostOrganisation: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_ALT_CONTACT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContact: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContactEmail: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_LINK: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, Link: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_VALIDATION_COMMENTS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationComments: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_PROJECT_TYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectTypeId: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_PROJECT_SUBTYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectSubTypeId: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_PROJECT_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectStatusId: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_PROJECT_MANAGER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectManagerId: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_VALIDATION_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationStatusId: payload, state: "modified" } }
        }

        case SET_PROJECT_DETAILS_MAOPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, MAOptionId: payload, state: "modified" } }
        }

        default: {
            return state
        }

    }
}
