'use strict'

import {
    LOAD_PROJECTS, LOAD_PROJECT_DETAILS, LOAD_ADAPTATION_DETAILS, LOAD_MITIGATION_DETAILS, LOAD_MITIGATION_EMISSIONS,
    LOAD_RESEARCH_DETAILS, SET_EDIT_MODE, SET_PROJECT_DETAILS_YEAR_FROM, SET_PROJECT_DETAILS_YEAR_TO,
    SET_PROJECT_DETAILS_BUDGET_FROM, SET_PROJECT_DETAILS_BUDGET_TO, SET_PROJECT_DETAILS_DESCRIPTION,
    SET_PROJECT_DETAILS_LEAD_AGENT, SET_PROJECT_DETAILS_HOST_PARTNER, SET_PROJECT_DETAILS_HOST_ORG,
    SET_PROJECT_DETAILS_ALT_CONTACT, SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL, SET_PROJECT_DETAILS_LINK,
    SET_PROJECT_DETAILS_VALIDATION_COMMENTS, SET_PROJECT_DETAILS_PROJECT_TYPE, SET_PROJECT_DETAILS_PROJECT_SUBTYPE,
    SET_PROJECT_DETAILS_PROJECT_STATUS, SET_PROJECT_DETAILS_PROJECT_MANAGER, SET_PROJECT_DETAILS_VALIDATION_STATUS,
    SET_PROJECT_DETAILS_MAOPTION, SET_ADAPTATION_DETAILS_DESCR, SET_ADAPTATION_DETAILS_PURPOSE, SET_ADAPTATION_DETAILS_SECTOR,
    ADD_ADAPTATION_DETAILS, ADD_MITIGATION_DETAILS, SET_MITIGATION_CARBON_CREDIT, SET_MITIGATION_CARBON_CREDIT_MARKET,
    SET_MITIGATION_CDM_STATUS, SET_MITIGATION_CDM_METHODOLOGY, SET_MITIGATION_VOLUNTARY_METHODOLOGY,
    SET_MITIGATION_VOLUNTARY_GOLD_STANDARD, SET_MITIGATION_CDM_PROJECT_NUMBER, SET_MITIGATION_OTHER_DESCR,
    SET_MITIGATION_SECTOR, ADD_MITIGATION_EMISSIONS, SET_EMISSIONS_YEAR, SET_EMISSIONS_CO2, SET_EMISSIONS_CH4,
    SET_EMISSIONS_CH4_CO2e, SET_EMISSIONS_N2O, SET_EMISSIONS_N2O_CO2e, SET_EMISSIONS_HFC, SET_EMISSIONS_HFC_CO2e,
    SET_EMISSIONS_PFC, SET_EMISSIONS_PFC_CO2e, SET_EMISSIONS_SF6, SET_EMISSIONS_SF6_CO2e, SET_EMISSIONS_Hydro,
    SET_EMISSIONS_Hydro_CO2e, SET_EMISSIONS_Tidal, SET_EMISSIONS_Tidal_CO2e, SET_EMISSIONS_Wind, SET_EMISSIONS_Wind_CO2e,
    SET_EMISSIONS_Solar, SET_EMISSIONS_Solar_CO2e, SET_EMISSIONS_FossilFuelElecRed, SET_EMISSIONS_FossilFuelElecRed_CO2e,
    SET_EMISSIONS_BioWaste, SET_EMISSIONS_BioWaste_CO2e, SET_EMISSIONS_Geothermal, SET_EMISSIONS_Geothermal_CO2e,
    ADD_RESEARCH_DETAILS, SET_RESEARCH_AUTHOR, SET_RESEARCH_PAPER_LINK, SET_RESEARCH_RESEARCH_TYPE, SET_RESEARCH_TARGET_AUDIENCE,
    SET_RESEARCH_SECTOR
} from "../constants/action-types";

const _ = require('lodash')

function extractItemAndId(array, key, value) {

    //Get item and Id
    let item = array.find(x => x[key] === value)
    let id = _.findIndex(array, (x) => x[key] === value)

    return { item, id }
}

function getUID() {
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    // });

    return new Date().valueOf();
}

export default function ProjectsReducer(state = {}, action) {

    let { type, payload } = action
    let id = 0

    //Check id ID embedded in type
    if (type.includes("|")) {
        let res = type.split("|")
        type = res[0]
        id = parseInt(res[1])
    }

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

        case ADD_ADAPTATION_DETAILS: {

            let { adaptationDetails, projectDetails } = state

            let newItem = {
                "AdaptationDetailId": getUID(),
                "Description": "",
                "AdaptationPurposeId": 0,
                "ProjectId": projectDetails.ProjectId,
                "SectorId": 0
            }

            return { ...state, adaptationDetails: [...adaptationDetails, newItem] }
        }

        case LOAD_MITIGATION_DETAILS: {
            return { ...state, mitigationDetails: payload }
        }

        case ADD_MITIGATION_DETAILS: {

            let { mitigationDetails, projectDetails } = state

            let newItem = {
                "MitigationDetailId": getUID(),
                "VCS": 0,
                "Other": 0,
                "OtherDescription": "",
                "CDMProjectNumber": "",
                "CarbonCreditId": 0,
                "CarbonCreditMarketId": 0,
                "CDMStatusId": 0,
                "CDMMethodologyId": 0,
                "VoluntaryMethodologyId": 0,
                "VoluntaryGoldStandardId": 0,
                "ProjectId": projectDetails.ProjectId,
                "SectorId": 0
            }

            return { ...state, mitigationDetails: [...mitigationDetails, newItem] }
        }

        case LOAD_MITIGATION_EMISSIONS: {
            return { ...state, emissionsData: payload }
        }

        case ADD_MITIGATION_EMISSIONS: {

            let { emissionsData, projectDetails } = state

            let newItem = {
                "MitigationEmissionsDataId": getUID(),
                "Year": 0,
                "CO2": 0,
                "CH4": 0,
                "CH4_CO2e": 0,
                "N2O": 0,
                "N2O_CO2e": 0,
                "HFC": 0,
                "HFC_CO2e": 0,
                "PFC": 0,
                "PFC_CO2e": 0,
                "SF6": 0,
                "SF6_CO2e": 0,
                "Hydro": 0,
                "Hydro_CO2e": 0,
                "Tidal": 0,
                "Tidal_CO2e": 0,
                "Wind": 0,
                "Wind_CO2e": 0,
                "Solar": 0,
                "Solar_CO2e": 0,
                "FossilFuelElecRed": 0,
                "FossilFuelElecRed_CO2e": 0,
                "BioWaste": 0,
                "BioWaste_CO2e": 0,
                "Geothermal": 0,
                "Geothermal_CO2e": 0,
                "ProjectId": projectDetails.ProjectId
            }

            return { ...state, emissionsData: [...emissionsData, newItem] }
        }

        case LOAD_RESEARCH_DETAILS: {
            return { ...state, researchDetails: payload }
        }

        case ADD_RESEARCH_DETAILS: {

            let { researchDetails, projectDetails } = state

            let newItem = {
                "ResearchDetailId": getUID(),
                "Author": "",
                "PaperLink": "",
                "ResearchTypeId": 0,
                "TargetAudienceId": 0,
                "ProjectId": projectDetails.ProjectId,
                "SectorId": 0
              }

            return { ...state, researchDetails: [...researchDetails, newItem] }
        }

        case SET_EDIT_MODE: {
            return { ...state, editMode: payload }
        }

        case SET_PROJECT_DETAILS_YEAR_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, StartYear: payload } }
        }

        case SET_PROJECT_DETAILS_YEAR_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, EndYear: payload } }
        }

        case SET_PROJECT_DETAILS_BUDGET_FROM: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetLower: payload } }
        }

        case SET_PROJECT_DETAILS_BUDGET_TO: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, BudgetUpper: payload } }
        }

        case SET_PROJECT_DETAILS_DESCRIPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectDescription: payload } }
        }

        case SET_PROJECT_DETAILS_LEAD_AGENT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, LeadAgent: payload } }
        }

        case SET_PROJECT_DETAILS_HOST_PARTNER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostPartner: payload } }
        }

        case SET_PROJECT_DETAILS_HOST_ORG: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, HostOrganisation: payload } }
        }

        case SET_PROJECT_DETAILS_ALT_CONTACT: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContact: payload } }
        }

        case SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, AlternativeContactEmail: payload } }
        }

        case SET_PROJECT_DETAILS_LINK: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, Link: payload } }
        }

        case SET_PROJECT_DETAILS_VALIDATION_COMMENTS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationComments: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_TYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectTypeId: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_SUBTYPE: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectSubTypeId: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectStatusId: payload } }
        }

        case SET_PROJECT_DETAILS_PROJECT_MANAGER: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ProjectManagerId: payload } }
        }

        case SET_PROJECT_DETAILS_VALIDATION_STATUS: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, ValidationStatusId: payload } }
        }

        case SET_PROJECT_DETAILS_MAOPTION: {
            let { projectDetails } = state
            return { ...state, projectDetails: { ...projectDetails, MAOptionId: payload } }
        }

        case SET_ADAPTATION_DETAILS_DESCR: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, Description: payload }] }
        }

        case SET_ADAPTATION_DETAILS_PURPOSE: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, AdaptationPurposeId: payload }] }
        }

        case SET_ADAPTATION_DETAILS_SECTOR: {
            let { adaptationDetails } = state

            //Get item and Id
            let details = extractItemAndId(adaptationDetails, "AdaptationDetailId", id)
            //Remove item from array
            adaptationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, adaptationDetails: [...adaptationDetails, { ...details.item, SectorId: payload }] }
        }

        case SET_MITIGATION_CARBON_CREDIT: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CarbonCreditId: payload }] }
        }

        case SET_MITIGATION_CARBON_CREDIT_MARKET: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CarbonCreditMarketId: payload }] }
        }

        case SET_MITIGATION_CDM_STATUS: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMStatusId: payload }] }
        }

        case SET_MITIGATION_CDM_METHODOLOGY: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMMethodologyId: payload }] }
        }

        case SET_MITIGATION_VOLUNTARY_METHODOLOGY: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, VoluntaryMethodologyId: payload }] }
        }

        case SET_MITIGATION_VOLUNTARY_GOLD_STANDARD: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, VoluntaryGoldStandardId: payload }] }
        }

        case SET_MITIGATION_CDM_PROJECT_NUMBER: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, CDMProjectNumber: payload }] }
        }

        case SET_MITIGATION_OTHER_DESCR: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, OtherDescription: payload }] }
        }

        case SET_MITIGATION_SECTOR: {
            let { mitigationDetails } = state

            //Get item and Id
            let details = extractItemAndId(mitigationDetails, "MitigationDetailId", id)
            //Remove item from array
            mitigationDetails.splice(details.id, 1);

            //return updated state
            return { ...state, mitigationDetails: [...mitigationDetails, { ...details.item, SectorId: payload }] }
        }

        case SET_EMISSIONS_YEAR: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Year: payload }] }
        }

        case SET_EMISSIONS_CO2: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CO2: payload }] }
        }

        case SET_EMISSIONS_CH4: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CH4: payload }] }
        }

        case SET_EMISSIONS_CH4_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, CH4_CO2e: payload }] }
        }

        case SET_EMISSIONS_N2O: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, N2O: payload }] }
        }

        case SET_EMISSIONS_N2O_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, N2O_CO2e: payload }] }
        }

        case SET_EMISSIONS_HFC: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, HFC: payload }] }
        }

        case SET_EMISSIONS_HFC_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, HFC_CO2e: payload }] }
        }

        case SET_EMISSIONS_PFC: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, PFC: payload }] }
        }

        case SET_EMISSIONS_PFC_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, PFC_CO2e: payload }] }
        }

        case SET_EMISSIONS_SF6: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, SF6: payload }] }
        }

        case SET_EMISSIONS_SF6_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, SF6_CO2e: payload }] }
        }

        case SET_EMISSIONS_Hydro: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Hydro: payload }] }
        }

        case SET_EMISSIONS_Hydro_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Hydro_CO2e: payload }] }
        }   
        
        case SET_EMISSIONS_Tidal: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Tidal: payload }] }
        } 

        case SET_EMISSIONS_Tidal_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Tidal_CO2e: payload }] }
        }

        case SET_EMISSIONS_Wind: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Wind: payload }] }
        }

        case SET_EMISSIONS_Wind_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Wind_CO2e: payload }] }
        }

        case SET_EMISSIONS_Solar: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Solar: payload }] }
        }

        case SET_EMISSIONS_Solar_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Solar_CO2e: payload }] }
        }

        case SET_EMISSIONS_FossilFuelElecRed: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, FossilFuelElecRed: payload }] }
        }

        case SET_EMISSIONS_FossilFuelElecRed_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, FossilFuelElecRed_CO2e: payload }] }
        }

        case SET_EMISSIONS_BioWaste: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, BioWaste: payload }] }
        }

        case SET_EMISSIONS_BioWaste_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, BioWaste_CO2e: payload }] }
        }

        case SET_EMISSIONS_Geothermal: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Geothermal: payload }] }
        }

        case SET_EMISSIONS_Geothermal_CO2e: {
            let { emissionsData } = state

            //Get item and Id
            let details = extractItemAndId(emissionsData, "MitigationEmissionsDataId", id)
            //Remove item from array
            emissionsData.splice(details.id, 1);

            //return updated state
            return { ...state, emissionsData: [...emissionsData, { ...details.item, Geothermal_CO2e: payload }] }
        }

        case SET_RESEARCH_AUTHOR: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, Author: payload }] }
        }

        case SET_RESEARCH_PAPER_LINK: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, PaperLink: payload }] }
        }

        case SET_RESEARCH_RESEARCH_TYPE: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, ResearchTypeId: payload }] }
        }

        case SET_RESEARCH_TARGET_AUDIENCE: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, TargetAudienceId: payload }] }
        }

        case SET_RESEARCH_SECTOR: {
            let { researchDetails } = state

            //Get item and Id
            let details = extractItemAndId(researchDetails, "ResearchDetailId", id)
            //Remove item from array
            researchDetails.splice(details.id, 1);

            //return updated state
            return { ...state, researchDetails: [...researchDetails, { ...details.item, SectorId: payload }] }
        }

        default: {
            return state
        }

    }
}
