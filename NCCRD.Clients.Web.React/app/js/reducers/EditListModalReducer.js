'use strict'

import * as ACTION_TYPES from "../constants/action-types"

export default function GlobalReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case ACTION_TYPES.SET_EDIT_LIST: {

            if (typeof payload.show === 'undefined') { payload.show = state.show }
            if (typeof payload.data === 'undefined') { payload.data = state.data }
            if (typeof payload.dispatch === 'undefined') { payload.dispatch = state.dispatch }
            if (typeof payload.persist === 'undefined') { payload.persist = state.persist }
            if (typeof payload.type === 'undefined') { payload.type = state.type }
            if (typeof payload.dependencies === 'undefined') { payload.dependencies = state.dependencies }

            return {
                ...state, show: payload.show, data: payload.data, treeData: payload.treeData, dispatch: payload.dispatch, persist: payload.persist,
                type: payload.type, dependencies: payload.dependencies 
            }
        }

        default: {
            return state
        }

    }
}