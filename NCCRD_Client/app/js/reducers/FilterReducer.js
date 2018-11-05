'use strict'

export default function FilterReducer(state = {}, action) {

    let { type, payload } = action

    let id = 0
    let modState = "original"

    //Check if additional data embedded in payload
    if (typeof payload !== 'undefined') {
        if (typeof payload.id !== 'undefined') {
            id = parseInt(payload.id)
        }
        if (typeof payload.action !== 'undefined') {
            action = payload.action
        }
        if (typeof payload.state !== 'undefined') {
            modState = payload.state
        }
        if (typeof payload.value !== 'undefined') {
            payload = payload.value
        }
    }

    switch (type) {

        case "LOAD_TITLE_FILTER": {
            return { ...state, titleFilterInternal: payload, titleFilter: payload }
        }

        case "LOAD_TITLE_FILTER_INTERNAL": {
            return { ...state, titleFilterInternal: payload }
        }

        case "LOAD_STATUS_FILTER": {
            return { ...state, statusFilter: payload }
        }

        case "LOAD_TYPOLOGY_FILTER": {
            return { ...state, typologyFilter: payload }
        }

        case "LOAD_REGION_FILTER": {
            return { ...state, regionFilter: payload }
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