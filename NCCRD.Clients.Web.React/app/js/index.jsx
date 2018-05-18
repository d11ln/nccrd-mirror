'use strict'

/**
 * Depecdencies
 * @ignore
 */
import 'antd/lib/style/index.css'

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
import Home from './components/Base/Home.jsx'
import Projects from './components/Projects/List/Projects.jsx'
import ProjectDetails from './components/Projects/Details/ProjectDetails.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import CustomNavbar from './components/Base/CustomNavbar.jsx'
import { stripURLParam } from "./globalFunctions.js"
import userManager from './components/Authentication/userManager';
import CallbackPage from '../js/components/Authentication/callback.jsx';
import { OidcProvider } from 'redux-oidc'
import LoggedOut from './components/Authentication/LoggedOut.jsx';

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

    this.getNavbar = this.getNavbar.bind(this)

    this.state = { navbar: true}
    if(location.toString().includes("navbar=hidden")){
      this.state = { navbar: false}
      stripURLParam("navbar=hidden")
    }
  }

  getNavbar(){
    if(this.state.navbar){
      return <CustomNavbar />
    }
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>

            {this.getNavbar()}

            <Switch>
              {/* <Redirect from="/" to="/projects" exact /> */}
              <Route path="/" component={Home} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/projects/:id" component={ProjectDetails} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/loggedout" component={LoggedOut} exact />
              <Route path="/callback" component={CallbackPage} />
            </Switch>

          </div>

        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <App />
    </OidcProvider>
  </Provider>,
  document.getElementById('app')
)
