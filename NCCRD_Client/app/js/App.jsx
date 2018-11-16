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
import { Spinner, Container } from 'mdbreact/'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Base/Home.jsx'
import Projects from './components/Projects/List/Projects.jsx'
import ProjectDetails from './components/Projects/Details/ProjectDetails.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import CustomNavbar from './components/Base/CustomNavbar.jsx'
import CallbackPage from '../js/components/Authentication/callback.jsx'
import ReactTooltip from 'react-tooltip'
import Header from './components/Base/Header.jsx'
import Footer from './components/Base/Footer.jsx'
import userManager from './components/Authentication/userManager'
import DashLayout from './components/Dashboard/DashLayout.jsx'
import MapView from './components/Map/MapView.jsx'
import ChartView from './components/Charts/ChartView.jsx'
import SideNav from './components/Base/SideNav.jsx'
import { data as NavData } from '../data/sideNavConfig'

const Oidc = require("oidc-client")
const _gf = require("./globalFunctions.js")
const o = require("odata")
const queryString = require('query-string')

const mapStateToProps = (state, props) => {
  let { globalData: { loading, showSideNav } } = state
  let user = state.oidc.user
  return { loading, user, showSideNav }
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

    let navbar = 'show'
    const parsedHash = queryString.parse(location.hash.substring(location.hash.indexOf("?")))

    if (typeof parsedHash.navbar !== 'undefined') {
      navbar = parsedHash.navbar
    }

    this.state = { 
      navbar 
    }
  }

  componentDidMount() {
    userManager.signinSilent()
  }

  componentDidUpdate() {
    let { user } = this.props

    let headers = []
    headers.push({ name: "Accept", value: "application/json" })

    if (user && !user.expired) {
      //Add auth token to headers
      headers.push({ name: "Authorization", value: "Bearer " + (user === null ? "" : user.access_token) })
    }

    //Add headers to OData global config
    o().config({
      headers: headers
    })

  }

  render() {

    let loaderWidth = 300
    let loaderHeight = 165

    let { navbar } = this.state
    let { showSideNav } = this.props

    return (
      <div style={{ margin: "0px 25px 0px 25px", backgroundColor: "white" }}>
        <Router>
          <div>

            {(navbar === "show" ) && <Header />}
            {(navbar !== "hidden") && <CustomNavbar />}

            {
              NavData.enabled &&
              <SideNav data={NavData} isOpen={showSideNav} />
            }

            <div style={{ height: "15px", backgroundColor: "whitesmoke" }} />

            <div style={{ backgroundColor: "whitesmoke" }}>
              <div style={{ margin: "0px 15px 0px 15px" }}>
                <Switch >
                  {/* <Route path="/" component={Home} exact /> */}
                  <Route path="/" component={DashLayout} exact />
                  <Route path="/projects" component={Projects} exact />
                  <Route path="/projects/:id" component={ProjectDetails} exact />
                  <Route path="/map" component={MapView} exact />
                  <Route path="/chart" component={ChartView} exact />
                  <Route path="/login" component={Login} exact />
                  <Route path="/logout" component={Logout} exact />
                  <Route path="/callback" component={CallbackPage} />
                </Switch>
              </div>
            </div>

            <div style={{ height: "15px", backgroundColor: "whitesmoke" }} />

            {(navbar === "show" ) && <Footer />}

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

