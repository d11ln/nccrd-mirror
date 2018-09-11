'use strict'

export default function FilterReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case "LOAD_TITLE_FILTER": {
            return { ...state, titleFilterInternal: payload, titleFilter: payload }
        }

        case "LOAD_TITLE_FILTER_INTERNAL": {
            return { ...state, titleFilterInternal: payload }
        }

        case "LOAD_STATUS_FILTER": {
            return { ...state, statusFilter: payload.value }
        }

        case "LOAD_TYPOLOGY_FILTER": {
            return { ...state, typologyFilter: payload.value }
        }

        case "LOAD_REGION_FILTER": {
            return { ...state, regionFilter: payload}
        }

        case "LOAD_SECTOR_FILTER": {
            return { ...state, sectorFilter: payload }
        }

        case "LOAD_POLYGON_FILTER": {
            return { ...state, polygonFilter: payload }
        }

        case "CLEAR_FILTERS": {
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