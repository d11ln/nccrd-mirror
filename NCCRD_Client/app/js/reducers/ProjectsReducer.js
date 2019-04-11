'use strict'

const _gf = require("../globalFunctions")
const _ = require('lodash')

function extractItemAndId(array, key, value) {

  //Get item and Id
  let item = array.find(x => x[key] === value)
  let id = _.findIndex(array, (x) => x[key] === value)

  return { item, id }
}

export default function ProjectsReducer(state = {}, action) {

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

    case "RESET_PROJECT_STATE": {
      return {
        ...state, projectDetails: { ...state.projectDetails, state: "original" }
      }
    }

    case "LOAD_PROJECTS": {
      let { projects, end } = state

      if (end === 25) {
        return { ...state, projects: payload }
      }
      else {
        return { ...state, projects: [...projects, ...payload] }
      }
    }

    case "LOAD_PROJECT_ID_LIST": {
      return { ...state, filteredProjectIDs: payload }
    }

    case "LOAD_PROJECT_DETAILS": {
      return { ...state, projectDetails: { ...payload } }
    }

    case "SET_PROJECT_DETAILS_TITLE": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectTitle: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_YEAR_FROM": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, StartYear: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_YEAR_TO": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, EndYear: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_BUDGET_FROM": {
      let { projectDetails } = state
      if(payload) payload = parseInt(payload)
      return { ...state, projectDetails: { ...projectDetails, BudgetLower: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_BUDGET_TO": {
      let { projectDetails } = state
      if(payload) payload = parseInt(payload)
      return { ...state, projectDetails: { ...projectDetails, BudgetUpper: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_DESCRIPTION": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectDescription: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_LEAD_AGENT": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, LeadAgent: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_HOST_PARTNER": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, HostPartner: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_HOST_ORG": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, HostOrganisation: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_ALT_CONTACT": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, AlternativeContact: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, AlternativeContactEmail: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_LINK": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, Link: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_VALIDATION_COMMENTS": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ValidationComments: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_PROJECT_TYPE": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectTypeId: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_PROJECT_SUBTYPE": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectSubTypeId: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_PROJECT_STATUS": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectStatusId: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_PROJECT_MANAGER": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectManagerId: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_VALIDATION_STATUS": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ValidationStatusId: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_MAOPTION": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, MAOptionId: payload, state: modState } }
    }

    case "SET_PROJECT_DETAILS_REGIONS": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, ProjectRegions: payload, state: modState } }
    }

    case "SET_PROJECT_LINKED_DAO_GOAL_ID": {
      let { projectDetails } = state

      //Get existing values
      let linkedDAOs = []
      if (projectDetails.ProjectDAOs) {
        linkedDAOs = projectDetails.ProjectDAOs
      }

      if (action === "add") {
        //Add new value
        if (linkedDAOs.filter(x => x.DAOId == payload).length === 0) {
          linkedDAOs.push({
            ProjectDAOId: 0,
            ProjectId: projectDetails.ProjectId,
            DAOId: payload
          })
        }
      }
      else if (action === "remove") {
        //Remove existing value
        let filtered = linkedDAOs.filter(x => x.DAOId == payload).length
        if (filtered > 0) {
          let index = linkedDAOs.indexOf(filtered[0])
          linkedDAOs.splice(index, 1)
        }
      }

      return { ...state, projectDetails: { ...projectDetails, ProjectDAOs: linkedDAOs, state: modState } }
    }

    case "SET_PROJECT_LOCATION": {

      let { projectDetails } = state
      let plFiltered = []

      if (id === 0) {

        if(!projectDetails.ProjectLocations) projectDetails.ProjectLocations = []

        //Get next id
        let nextId = 1000
        if(projectDetails.ProjectLocations.length > 0){
          nextId = Math.max(...projectDetails.ProjectLocations.map(x => x.ProjectLocationId)) + 1
          if(nextId < 1000) nextId += 1000
        }

        //ADD
        plFiltered = [{
          ProjectLocationId: nextId,
          ProjectId: projectDetails.ProjectId,
          Location: {
            LatCalculated: 0,
            LonCalculated: 0
          }
        }]
      }
      else{
        //EDIT
        plFiltered = projectDetails.ProjectLocations.filter(x => x.ProjectLocationId == id)
      }

      if (plFiltered.length > 0) {

        //Remove from ProjectLocations
        let index = (projectDetails.ProjectLocations.indexOf(plFiltered[0]))
        if (index > -1) {
          projectDetails.ProjectLocations.splice(index, 1);
        }

        if (payload === null) {
          return { ...state, projectDetails: { ...projectDetails, ProjectLocations: [...projectDetails.ProjectLocations], state: modState } }
        }
        else {

          let values = payload.split(",")
          if (values.length === 2) {

            //Update values
            plFiltered[0].Location.LatCalculated = values[0].trim()
            plFiltered[0].Location.LonCalculated = values[1].trim()

            //Add back in
            return { ...state, projectDetails: { ...projectDetails, ProjectLocations: [...projectDetails.ProjectLocations, plFiltered[0]], state: modState } }
          }
        }
      }

      return state
    }

    case "LOAD_MORE_PROJECTS": {
      const { start, end } = state
      let newend = end + 25
      let newstart = start

      return { ...state, start: newstart, end: newend }
    }

    case "RESET_PROJECT_COUNTS": {
      return { ...state, start: 0, end: 25 }
    }

    case "SET_PROJECT_SCROLL": {
      return { ...state, listScrollPos: payload }
    }

    case "SET_SELECTED_PROJECT_ID": {
      return { ...state, selectedProjectId: payload }
    }

    case "SET_PROJECT_DETAILS_VERIFIED": {
      let { projectDetails } = state
      return { ...state, projectDetails: { ...projectDetails, Verified: payload, state: modState } }
    }

    default: {
      return state
    }

  }
}
