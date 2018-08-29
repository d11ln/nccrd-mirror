'use strict'

//Styles - Ant.Design (has to be loaded before MDB so that MDB can replace all applicable styles)
import 'antd/lib/style/index.css'

//Styles - MDB
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

//Components
import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'mdbreact/'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Base/Home.jsx'
import Projects from './components/Projects/List/Projects.jsx'
import ProjectDetails from './components/Projects/Details/ProjectDetails.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import CustomNavbar from './components/Base/CustomNavbar.jsx'
import CallbackPage from '../js/components/Authentication/callback.jsx';
import ReactTooltip from 'react-tooltip'
import Header from './components/Base/Header.jsx'
import Footer from './components/Base/Footer.jsx'

const Oidc = require("oidc-client")
const _gf = require("./globalFunctions.js")
const o = require("odata")

const mapStateToProps = (state, props) => {
  let { globalData: { loading } } = state
  let user = state.oidc.user
  return { loading, user }
}

//Enable OIDC Logging
Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

/**
 * App
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { navbar: true }
    if (location.toString().includes("navbar=hidden")) {
      this.state = { navbar: false }
      _gf.stripURLParam("navbar=hidden")
    }
  }

  componentDidUpdate() {
    let { user } = this.props
    if (user && !user.expired) {
      //Add auth token to OData global config
      o().config({
        headers: [
          { name: "Authorization", value: "Bearer " + (user === null ? "" : user.access_token) }
        ]
      })
    }
    else {
      //Remove auth token from OData global config
      o().config({
        headers: []
      })
    }
  }

  render() {

    let loaderWidth = 300
    let loaderHeight = 165

    let { navbar } = this.state

    return (
      <div className="container">
        <Router>
          <div>

            {navbar && <Header />}
            {navbar && <CustomNavbar />}

            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/projects/:id" component={ProjectDetails} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/callback" component={CallbackPage} />
            </Switch>

            {navbar && <Footer />}

            <div className="container-fluid">
              <div className="row">
                <div
                  hidden={!this.props.loading}
                  className="card"
                  style={{ height: (loaderHeight + "px"), width: (loaderWidth + 'px'), position: "fixed", left: ((window.innerWidth / 2) - (loaderWidth / 2)), top: ((window.innerHeight / 2) - (loaderHeight / 2)), zIndex: "99" }}>

                  <div className="card-body">
                    <label style={{ width: "100%", textAlign: "center", fontSize: "x-large", fontWeight: "bold", color: "#2BBBAD" }}>LOADING</label>
                    <br />
                    <span style={{ width: "100px", paddingLeft: ((loaderWidth / 2) - 50) }}>
                      <Spinner big multicolor />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ReactTooltip delayShow={700} />

          </div>

        </Router>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)

