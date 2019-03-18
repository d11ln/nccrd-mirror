'use strict'

export default function GlobalReducer(state = {}, action) {

  const { type, payload } = action

  switch (type) {

    case "SET_LOADING": {
      return { ...state, loading: payload }
    }

    case "SET_EDIT_MODE": {
      return { ...state, editMode: payload }
    }

    case "SET_DAOID": {
      return { ...state, daoid: payload }
    }

    case "TOGGLE_HEADER": {
      return { ...state, showHeader: payload }
    }

    case "TOGGLE_NAVBAR": {
      return { ...state, showNavbar: payload }
    }

    case "TOGGLE_FOOTER": {
      return { ...state, showFooter: payload }
    }

    case "TOGGLE_SIDENAV": {
      return { ...state, showSideNav: payload }
    }

    case "TOGGLE_SIDENAV_BUTTON": {
      return { ...state, showSideNavButton: payload }
    }

    case "TOGGLE_LIST_FILTER_OPTIONS": {
      return { ...state, showListFilterOptions: payload }
    }

    case "TOGGLE_LIST_EXPAND_COLLAPSE": {
      return { ...state, showListExpandCollapse: payload }
    }

    case "TOGGLE_LIST_FAVORITES": {
      return { ...state, showFavoritesOption: payload }
    }

    case "TOGGLE_BACK_TO_LIST": {
      return { ...state, showBackToList: payload }
    }

    case "TOGGLE_READONLY": {
      return { ...state, readOnly: payload }
    }

    case "TOGGLE_LIST_VIEW": {
      return { ...state, showListViewOption: payload }
    }

    case "TOGGLE_SHOW_DETAILS_IN_PARENT": {
      return { ...state, showDetailsInParent: payload }
    }

    case "SET_PROJECTS_FULLVIEW": {
      return { ...state, projectsFullView: payload }
    }

    case "SET_SHOW_INPUT_WIZARD": {
      return { ...state, showInputWizard: payload }
    }

    default: {
      return state
    }

  }
}