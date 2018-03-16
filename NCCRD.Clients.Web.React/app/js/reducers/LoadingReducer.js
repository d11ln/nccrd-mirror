'use strict'

import {
    SET_LOADING
} from "../constants/action-types";

export default function LoadingReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case SET_LOADING: {
            return { ...state, loading: payload }
        }

        default: {
            return state
        }

    }
}