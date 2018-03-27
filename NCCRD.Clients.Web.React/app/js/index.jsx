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
import Home from './components/Home.jsx'
import Projects from './components/Projects.jsx'
import ProjectDetails from './components/ProjectDetails.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import CustomNavbar from './components/CustomNavbar.jsx'

/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

/**
 * App
 */
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>

            <CustomNavbar />

            <Switch>
              {/* <Redirect from="/" to="/projects" exact /> */}
              <Route path="/" component={Home} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/projects/:id" component={ProjectDetails} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
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
