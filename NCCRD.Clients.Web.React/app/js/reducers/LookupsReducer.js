'use strict'

import * as ACTION_TYPES from "../constants/action-types"

function convertPayload(payload){
    return payload.map((x) => {
        return {
            id: x[Object.keys(x)[0]], value: x[Object.keys(x)[1]]
        }
    })
}

export default function LookupsReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.LOAD_PROJECT_STATUS: {

            const data = convertPayload(payload)
            return { ...state, projectStatus: data }
        }

        case ACTION_TYPES.LOAD_TYPOLOGY: {

            const data = convertPayload(payload)
            return { ...state, typology: data }
        }

        case ACTION_TYPES.LOAD_REGION_TREE: {

            return { ...state, regionTree: payload }
        }

        case ACTION_TYPES.LOAD_SECTOR_TREE: {

            return { ...state, sectorTree: payload }
        }

        case ACTION_TYPES.LOAD_PROJECT_TYPE: {

            const data = convertPayload(payload)
            return { ...state, projectTypes: data }
        }

        case ACTION_TYPES.LOAD_PROJECT_SUBTYPE: {

            const data = convertPayload(payload)
            return { ...state, projectSubTypes: data }
        }

        case ACTION_TYPES.LOAD_USERS: {

            const data = convertPayload(payload)
            return { ...state, users: data }
        }

        case ACTION_TYPES.LOAD_VALIDATION_STATUS: {

            const data = convertPayload(payload)
            return { ...state, validationStatus: data }
        }

        case ACTION_TYPES.LOAD_MA_OPTIONS: {

            const data = convertPayload(payload)
            return { ...state, maOptions: data }
        }

        case ACTION_TYPES.LOAD_ADAPTATION_PURPOSE: {

            const data = convertPayload(payload)
            return { ...state, adaptationPurpose: data }
        }

        case ACTION_TYPES.LOAD_SECTOR: {

            const data = convertPayload(payload)
            return { ...state, sector: data }
        }

        case ACTION_TYPES.LOAD_REGION: {

            const data = convertPayload(payload)
            return { ...state, region: data }
        }

        case ACTION_TYPES.LOAD_CARBON_CREDIT: {

            const data = convertPayload(payload)
            return { ...state, carbonCredit: data }
        }

        case ACTION_TYPES.LOAD_CARBON_CREDIT_MARKET: {

            const data = convertPayload(payload)
            return { ...state, carbonCreditMarket: data }
        }

        case ACTION_TYPES.LOAD_CDM_STATUS: {

            const data = convertPayload(payload)
            return { ...state, cdmStatus: data }
        }

        case ACTION_TYPES.LOAD_CDM_METHODOLOGY: {

            const data = convertPayload(payload)
            return { ...state, cdmMethodology: data }
        }

        case ACTION_TYPES.LOAD_VOLUNTARY_METHODOLOGY: {

            const data = convertPayload(payload)
            return { ...state, voluntaryMethodology: data }
        }

        case ACTION_TYPES.LOAD_VOLUNTARY_GOLD_STANDARD: {

            const data = convertPayload(payload)
            return { ...state, voluntaryGoldStandard: data }
        }

        case ACTION_TYPES.LOAD_RESEARCH_TYPE: {

            const data = convertPayload(payload)
            return { ...state, researchType: data }
        }

        case ACTION_TYPES.LOAD_TARGET_AUDIENCE: {

            const data = convertPayload(payload)
            return { ...state, targetAudience: data }
        }

        default: {
            return state
        }
    }
}