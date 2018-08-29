'use strict'

import * as ACTION_TYPES from "../constants/action-types"

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

        case ACTION_TYPES.RESET_PROJECT_STATE: {
            return {
                ...state, projectDetails: { ...state.projectDetails, state: "original" }
            }
        }

        case ACTION_TYPES.LOAD_PROJECTS: {
            let { projects, end } = state

            if(end === 25){
                return { ...state, projects: payload }
            }
            else{
                return { ...state, projects: [...projects, ...payload] }
            }
        }

        case ACTION_TYPES.LOAD_PROJECT_DETAILS: {
            return { ...state, projectDetails: { ...payload } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_TITLE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectTitle: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_YEAR_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, StartYear: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_YEAR_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, EndYear: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_BUDGET_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetLower: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_BUDGET_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetUpper: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_DESCRIPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectDescription: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_LEAD_AGENT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, LeadAgent: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_HOST_PARTNER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostPartner: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_HOST_ORG: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostOrganisation: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_ALT_CONTACT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContact: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContactEmail: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_LINK: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, Link: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_VALIDATION_COMMENTS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationComments: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_TYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectTypeId: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_SUBTYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectSubTypeId: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectStatusId: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_MANAGER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectManagerId: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_VALIDATION_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationStatusId: payload, state: modState } }
        }

        case ACTION_TYPES.SET_PROJECT_DETAILS_MAOPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, MAOptionId: payload, state: modState } }
        }

        case ACTION_TYPES.LOAD_MORE_PROJECTS: {
            const { start, end  } = state
            let newend = end + 25
            let newstart = start

            return { ...state, start: newstart, end: newend }
        }

        case ACTION_TYPES.RESET_PROJECT_COUNTS:{
            return { ...state, start: 0, end: 25 }
        }

        case ACTION_TYPES.SET_PROJECT_SCROLL:{
            return { ...state, listScrollPos: payload }
        }

        default: {
            return state
        }

    }
}
