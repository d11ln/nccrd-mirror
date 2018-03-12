'use strict'

import { LOAD_REGIONS, LOAD_TYPOLOGY, LOAD_REGION_TREE, LOAD_SECTOR_TREE } from "../constants/action-types";

export default function LookupsReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case LOAD_REGIONS: {

            const data = payload.map((x) => {
                const { ProjectStatusId, Value, Description } = x
                return {
                    ProjectStatusId, Value, Description
                }
            })

            return { ...state, projectStatus: data }
        }

        case LOAD_TYPOLOGY: {

            const data = payload.map((x) => {
                const { TypologyId, Value } = x
                return {
                    TypologyId, Value,
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


        default: {
            return state
        }
    }
}