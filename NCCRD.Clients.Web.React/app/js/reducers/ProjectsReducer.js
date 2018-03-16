'use strict'

import {
    LOAD_PROJECTS,
    LOAD_PROJECT_DETAILS,
    LOAD_ADAPTATION_DETAILS,
    LOAD_MITIGATION_DETAILS,
    LOAD_MITIGATION_EMISSIONS,
    LOAD_RESEARCH_DETAILS
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

        default: {
            return state
        }

    }
}