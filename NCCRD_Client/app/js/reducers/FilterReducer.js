'use strict'

import * as ACTION_TYPES from "../constants/action-types"

export default function FilterReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.LOAD_TITLE_FILTER: {
            return { ...state, titleFilterInternal: payload, titleFilter: payload }
        }

        case ACTION_TYPES.LOAD_TITLE_FILTER_INTERNAL: {
            return { ...state, titleFilterInternal: payload }
        }

        case ACTION_TYPES.LOAD_STATUS_FILTER: {
            return { ...state, statusFilter: payload.value }
        }

        case ACTION_TYPES.LOAD_TYPOLOGY_FILTER: {
            return { ...state, typologyFilter: payload.value }
        }

        case ACTION_TYPES.LOAD_REGION_FILTER: {
            return { ...state, regionFilter: payload}
        }

        case ACTION_TYPES.LOAD_SECTOR_FILTER: {
            return { ...state, sectorFilter: payload }
        }

        case ACTION_TYPES.LOAD_POLYGON_FILTER: {
            return { ...state, polygonFilter: payload }
        }

        case ACTION_TYPES.CLEAR_FILTERS: {
            return {
                ...state,
                titleFilter: "",
                statusFilter: 0,
                typologyFilter: 0,
                regionFilter: 0,
                sectorFilter: 0,
                polygonFilter: ""
            }
        }

        default: {
            return state
        }

    }
}