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
        projectData: { projects: [], projectDetails: {}, adaptationDetails: [], mitigationDetails: [], emissionsData: [], researchDetails: [] },
        lookupData: { projectTypes: [], projectSubTypes: [], projectStatus: [], users: [], validationStatus: [], typology: [], 
                        regionTree: [], sectorTree: [], maOptions: [], adaptationPurpose: [], sector: [] }
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store