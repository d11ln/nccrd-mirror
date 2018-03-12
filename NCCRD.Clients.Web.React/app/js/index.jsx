'use strict'

/**
 * Depecdencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/docs/css/mdb.min.css'


import store from './store'

import queryString from 'query-string'
import { Button } from 'mdbreact/'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Projects from './components/Projects.jsx'
import ProjectDetails from './components/ProjectDetails.jsx'
/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

/**
 * App
 */
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Switch>    
              <Redirect from="/" to="/projects" exact />
              <Route path="/projects"  component={Projects} exact />
              <Route path="/projects/:id"  component={ProjectDetails} exact />
            </Switch>
          </div>
        </Router> 
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
