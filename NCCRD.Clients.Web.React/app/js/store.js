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
            editMode: true
        },

        editListModalData: {
            show: false,
            data: [],
            treeData: [],
            dispatch: "",
            persist: "",
            type: "std",
            dependencies: []
        },

        projectData: {
            projects: [],
            projectDetails: {}
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
            sectorTree: [],
            maOptions: [],
            adaptationPurpose: [],
            sector: [],
            region: [],
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
            sectorFilter: 0
        }

    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store