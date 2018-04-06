'use strict'

import * as ACTION_TYPES from "../constants/action-types"

export default function LookupsReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.LOAD_PROJECT_STATUS: {
            return { ...state, projectStatus: payload }
        }

        case ACTION_TYPES.LOAD_TYPOLOGY: {
            return { ...state, typology: payload }
        }

        case ACTION_TYPES.LOAD_REGION_TREE: {
            return { ...state, regionTree: payload }
        }

        case ACTION_TYPES.LOAD_SECTOR_TREE: {
            return { ...state, sectorTree: payload }
        }

        case ACTION_TYPES.LOAD_PROJECT_TYPE: {
            return { ...state, projectTypes: payload }
        }

        case ACTION_TYPES.LOAD_PROJECT_SUBTYPE: {
            return { ...state, projectSubTypes: payload }
        }

        case ACTION_TYPES.LOAD_USERS: {
            return { ...state, users: payload }
        }

        case ACTION_TYPES.LOAD_VALIDATION_STATUS: {
            return { ...state, validationStatus: payload }
        }

        case ACTION_TYPES.LOAD_MA_OPTIONS: {
            return { ...state, maOptions: payload }
        }

        case ACTION_TYPES.LOAD_ADAPTATION_PURPOSE: {
            return { ...state, adaptationPurpose: payload }
        }

        case ACTION_TYPES.LOAD_SECTOR: {
            return { ...state, sector: payload }
        }

        case ACTION_TYPES.LOAD_REGION: {
            return { ...state, region: payload }
        }

        case ACTION_TYPES.LOAD_CARBON_CREDIT: {
            return { ...state, carbonCredit: payload }
        }

        case ACTION_TYPES.LOAD_CARBON_CREDIT_MARKET: {

            return { ...state, carbonCreditMarket: payload }
        }

        case ACTION_TYPES.LOAD_CDM_STATUS: {
            return { ...state, cdmStatus: payload }
        }

        case ACTION_TYPES.LOAD_CDM_METHODOLOGY: {
            return { ...state, cdmMethodology: payload }
        }

        case ACTION_TYPES.LOAD_VOLUNTARY_METHODOLOGY: {
            return { ...state, voluntaryMethodology: payload }
        }

        case ACTION_TYPES.LOAD_VOLUNTARY_GOLD_STANDARD: {
            return { ...state, voluntaryGoldStandard: payload }
        }

        case ACTION_TYPES.LOAD_RESEARCH_TYPE: {
            return { ...state, researchType: payload }
        }

        case ACTION_TYPES.LOAD_TARGET_AUDIENCE: {
            return { ...state, targetAudience: payload }
        }

        default: {
            return state
        }
    }
}