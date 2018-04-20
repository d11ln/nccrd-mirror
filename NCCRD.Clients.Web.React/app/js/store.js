'use strict'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
import reducers from './reducers'

const history = createHashHistory()
const middleware = routerMiddleware(history)


const store = createStore(
    combineReducers({ ...reducers, router: routerReducer }), {
        ...applyMiddleware(middleware),

        globalData: {
            isAuthenticated: true,
            loading: true,
            editMode: false,
            username: ""
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

export default store