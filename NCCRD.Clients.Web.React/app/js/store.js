'use strict'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
//import { createHashHistory } from 'history'
import reducers from './reducers'
import { loadUser } from 'redux-oidc'
import userManager from './components/Authentication/userManager'
import { reducer as oidcReducer } from 'redux-oidc';

//const history = createHashHistory()
//const middleware = routerMiddleware(history)

const store = createStore(
    combineReducers({ oidc: oidcReducer, ...reducers, router: routerReducer }), {
        //...applyMiddleware(middleware),

        globalData: {
            loading: false,
            editMode: false
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
            end: 10,
            listScrollPos: 0
        },

        adaptationData: {
            adaptationDetails: []
        },

        mitigationData: {
            mitigationDetails: []
        },

        emissionData: {
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
            targetAudience: []
        },

        filterData: {
            titleFilter: "",
            titleFilterInternal: "",
            statusFilter: 0,
            typologyFilter: 0,
            regionFilter: 0,
            sectorFilter: 0,
            polygonFilter: ""
        }

    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
loadUser(store, userManager)

export default store