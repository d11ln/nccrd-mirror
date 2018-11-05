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
            console.log("SET_DAOID", payload)
            return { ...state, daoid: payload }
        }
        default: {
            return state
        }

    }
}