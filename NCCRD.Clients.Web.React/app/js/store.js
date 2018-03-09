'use strict'

import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
import reducers from './reducers'
//import ProjectReducer from './reducers/ProjectsReducer'
const history = createHashHistory()
const middleware = routerMiddleware(history)


const store = createStore(
  combineReducers({...reducers, router: routerReducer}), {
    ...applyMiddleware(middleware),
    projects: { projectHeaders: [] }
  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store