'use strict'

import * as ACTION_TYPES from "../constants/action-types"

export default function GlobalReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.SET_LOADING: {
            return { ...state, loading: payload }
        }

        case ACTION_TYPES.SET_EDIT_MODE: {
            return { ...state, editMode: payload }
        }

        case ACTION_TYPES.TOGGLE_EDIT_LIST_MODAL: {
            return { ...state, showEditListModal: payload }
        }

        case ACTION_TYPES.SET_AUTHENTICATED: {
            
            //Clear token data here
            //...

            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                username: (payload.isAuthenticated === true ? payload.username : "")
            }
        }

        default: {
            return state
        }

    }
}