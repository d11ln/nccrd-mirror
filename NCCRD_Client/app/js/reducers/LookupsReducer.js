'use strict'

export default function LookupsReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case "LOAD_PROJECT_STATUS": {
            return { ...state, projectStatus: payload }
        }

        case "LOAD_FUNDERS": {
            return { ...state, funders: payload }
        }

        case "LOAD_FUNDINGSTATUS": {
            return { ...state, fundingStatus: payload }
        }

        case "LOAD_TYPOLOGY": {
            return { ...state, typology: payload }
        }

        case "LOAD_REGION_TREE": {
            return { ...state, regionTree: payload }
        }

        case "LOAD_SECTOR_TREE": {
            return { ...state, sectorTree: payload }
        }

        case "LOAD_PROJECT_TYPE": {
            return { ...state, projectTypes: payload }
        }

        case "LOAD_PROJECT_SUBTYPE": {
            return { ...state, projectSubTypes: payload }
        }

        case "LOAD_USERS": {
            return { ...state, users: payload }
        }

        case "LOAD_VALIDATION_STATUS": {
            return { ...state, validationStatus: payload }
        }

        case "LOAD_MA_OPTIONS": {
            return { ...state, maOptions: payload }
        }

        case "LOAD_ADAPTATION_PURPOSE": {
            return { ...state, adaptationPurpose: payload }
        }

        case "LOAD_SECTOR": {
            return { ...state, sector: payload }
        }

        case "LOAD_SECTOR_TYPE": {
            return { ...state, sectorType: payload }
        }

        case "LOAD_REGION": {
            return { ...state, region: payload }
        }

        case "LOAD_CARBON_CREDIT": {
            return { ...state, carbonCredit: payload }
        }

        case "LOAD_CARBON_CREDIT_MARKET": {

            return { ...state, carbonCreditMarket: payload }
        }

        case "LOAD_CDM_STATUS": {
            return { ...state, cdmStatus: payload }
        }

        case "LOAD_CDM_METHODOLOGY": {
            return { ...state, cdmMethodology: payload }
        }

        case "LOAD_VOLUNTARY_METHODOLOGY": {
            return { ...state, voluntaryMethodology: payload }
        }

        case "LOAD_VOLUNTARY_GOLD_STANDARD": {
            return { ...state, voluntaryGoldStandard: payload }
        }

        case "LOAD_RESEARCH_TYPE": {
            return { ...state, researchType: payload }
        }

        case "LOAD_TARGET_AUDIENCE": {
            return { ...state, targetAudience: payload }
        }

        default: {
            return state
        }
    }
}