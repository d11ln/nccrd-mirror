'use strict'

import * as ACTION_TYPES from "../constants/action-types"

export default function GlobalReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.SET_EDIT_LIST: {

            if(typeof payload.show === 'undefined'){ payload.show = state.show }
            if(typeof payload.items === 'undefined'){ payload.items = state.items }
            if(typeof payload.dispatch === 'undefined'){ payload.dispatch = state.dispatch }
            if(typeof payload.persist === 'undefined'){ payload.persist = state.persist }

            return { ...state, show: payload.show, items: payload.items, dispatch: payload.dispatch, persist: payload.persist }
        }     

        default: {
            return state
        }

    }
}