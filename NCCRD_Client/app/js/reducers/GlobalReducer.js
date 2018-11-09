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

        case "TOGGLE_SIDENAV": {
            return {
                ...state, showSideNav: payload
            }
        }

        default: {
            return state
        }

    }
}