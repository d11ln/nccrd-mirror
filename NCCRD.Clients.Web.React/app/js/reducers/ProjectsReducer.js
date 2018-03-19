'use strict'

import {
    LOAD_PROJECTS, LOAD_PROJECT_DETAILS, LOAD_ADAPTATION_DETAILS, LOAD_MITIGATION_DETAILS, LOAD_MITIGATION_EMISSIONS,
    LOAD_RESEARCH_DETAILS, SET_EDIT_MODE, SET_PROJECT_DETAILS_YEAR_FROM, SET_PROJECT_DETAILS_YEAR_TO,
    SET_PROJECT_DETAILS_BUDGET_FROM, SET_PROJECT_DETAILS_BUDGET_TO, SET_PROJECT_DETAILS_DESCRIPTION,
    SET_PROJECT_DETAILS_LEAD_AGENT, SET_PROJECT_DETAILS_HOST_PARTNER, SET_PROJECT_DETAILS_HOST_ORG,
    SET_PROJECT_DETAILS_ALT_CONTACT, SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL, SET_PROJECT_DETAILS_LINK,
    SET_PROJECT_DETAILS_VALIDATION_COMMENTS, SET_PROJECT_DETAILS_PROJECT_TYPE
} from "../constants/action-types";

export default function ProjectsReducer(state = {}, action) {

    const { type, payload } = action

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

        default: {
            return state
        }

    }
}