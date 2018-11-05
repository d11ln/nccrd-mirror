'use strict'

import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from './reducers'
import { loadUser } from 'redux-oidc'
import userManager from './components/Authentication/userManager'
import { reducer as oidcReducer } from 'redux-oidc';

const store = createStore(
    combineReducers({ oidc: oidcReducer, ...reducers, router: routerReducer }), {

        globalData: {
            loading: false,
            editMode: false,
            daoid: null
        },

        navigation: {
            locationHash: "#/"
        },

        editListModalData: {
            show: false,
            data: [],
            dispatch: "",
            persist: "",
            type: "std",
            dependencies: [],
            newItemTemplate: {}
        },

        projectData: {
            projects: [],
            projectDetails: {},
            start: 0,
            end: 25,
            listScrollPos: 0
        },

        projectFundersData: {
            projectFunderDetails: []
        },

        adaptationData: {
            adaptationDetails: []
        },

        mitigationData: {
            mitigationDetails: []
        },

        emissionsData: {
            emissionsData: []
        },

        researchData: {
            researchDetails: []
        },

        lookupData: {
            projectTypes: [],
            projectSubTypes: [],
            projectStatus: [],
            users: [],
            validationStatus: [],
            typology: [],
            regionTree: [],
            region: [],
            sectorTree: [],
            sector: [],
            sectorType: [],
            maOptions: [],
            adaptationPurpose: [],
            carbonCredit: [],
            carbonCreditMarket: [],
            cdmStatus: [],
            cdmMethodology: [],
            voluntaryMethodology: [],
            voluntaryGoldStandard: [],
            researchType: [],
            targetAudience: [],
            hazards: []
        },

        filterData: {
            titleFilter: "",
            titleFilterInternal: "",
            statusFilter: 0,
            typologyFilter: 0,
            regionFilter: 0,
            sectorFilter: 0,
            polygonFilter: "",
            favoritesFilter: false
        }

    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
loadUser(store, userManager)

export default store