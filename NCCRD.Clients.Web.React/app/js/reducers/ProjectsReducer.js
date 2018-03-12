'use strict'

import { LOAD_PROJECTS } from "../constants/action-types";

export default function ProjectsReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case LOAD_PROJECTS: {

            const data = payload.map((x) => {
                const { ProjectId, ProjectTitle, ProjectDescription } = x
                return {
                    ProjectId, ProjectTitle, ProjectDescription
                }
            })

            return { ...state, projects: data }
        }

        default: {
            return state
        }

    }
}