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

import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';

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
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    }

    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>

            <Navbar size="sm" color="indigo" expand="md" dark >
              {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
              <Collapse isOpen={this.state.collapse} navbar>

                <NavbarBrand tag="span">
                  NCCRD
                </NavbarBrand>

                <NavbarNav left>
                  <NavItem>
                    <a className="nav-link" href="#">Home</a>
                  </NavItem>
                  <NavItem>
                    <a className="nav-link" href="#/projects">Projects</a>
                  </NavItem>
                </NavbarNav>
              </Collapse>
            </Navbar>

            <Switch>
              {/* <Redirect from="/" to="/projects" exact /> */}
              <Route path="/" component={Home} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/projects/:id" component={ProjectDetails} exact />
              <Route path="/login" component={Login} exact />
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
