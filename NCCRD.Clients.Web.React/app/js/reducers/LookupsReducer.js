'use strict'

import { LOAD_PROJECT_STATUS, LOAD_TYPOLOGY, LOAD_REGION_TREE, LOAD_SECTOR_TREE, LOAD_PROJECT_TYPE,
        LOAD_PROJECT_SUBTYPE, LOAD_USERS, LOAD_VALIDATION_STATUS, LOAD_MA_OPTIONS, LOAD_ADAPTATION_PURPOSE,
        LOAD_SECTOR } from "../constants/action-types";

export default function LookupsReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case LOAD_PROJECT_STATUS: {

            const data = payload.map((x) => {
                return {
                    id: x.ProjectStatusId, value: x.Value
                }
            })

            return { ...state, projectStatus: data }
        }

        case LOAD_TYPOLOGY: {

            const data = payload.map((x) => {
                return {
                    id: x.TypologyId, value: x.Value
                }
            })

            return { ...state, typology: data }
        }

        case LOAD_REGION_TREE: {

            return { ...state, regionTree: payload }
        }

        case LOAD_SECTOR_TREE: {

            return { ...state, sectorTree: payload }
        }

        case LOAD_PROJECT_TYPE:{

            const data = payload.map((x) => {
                return {
                    id: x.ProjectTypeId, value: x.Value
                }
            })

            return { ...state, projectTypes: data }
        }

        case LOAD_PROJECT_SUBTYPE:{

            const data = payload.map((x) => {
                return {
                    id: x.ProjectSubTypeId, value: x.Value
                }
            })

            return { ...state, projectSubTypes: data }
        }

        case LOAD_USERS:{

            const data = payload.map((x) => {
                return {
                    id: x.UserId, value: x.DisplayName
                }
            })

            return { ...state, users: data }
        }

        case LOAD_VALIDATION_STATUS:{

            const data = payload.map((x) => {
                return {
                    id: x.ValidationStatusId, value: x.Value
                }
            })

            return { ...state, validationStatus: data }
        }

        case LOAD_MA_OPTIONS:{

            const data = payload.map((x) => {
                return {
                    id: x.MAOptionID, value: x.Name
                }
            })

            return { ...state, maOptions: data }
        }

        case LOAD_ADAPTATION_PURPOSE:{

            const data = payload.map((x) => {
                return {
                    id: x.AdaptationPurposeId, value: x.Value
                }
            })

            return { ...state, adaptationPurpose: data }
        }

        case LOAD_SECTOR:{

            const data = payload.map((x) => {
                return {
                    id: x.SectorId, value: x.Value
                }
            })

            return { ...state, sector: data }
        }

        default: {
            return state
        }
    }
}