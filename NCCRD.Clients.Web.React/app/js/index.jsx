'use strict'

/**
 * Depecdencies
 * @ignore
 */

//Styles - Ant.Design (has to be loaded before MDB so that MDB can replace all applicable styles)
import 'antd/lib/style/index.css'

//Styles - MDB
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

//Components
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import queryString from 'query-string'
import { Button, Spinner } from 'mdbreact/'
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
import ReactTooltip from 'react-tooltip'

/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

const mapStateToProps = (state, props) => {
    let { globalData: { loading } } = state
    return { loading }
}

/**
 * App
 */
class App extends React.Component {

    constructor(props) {
        super(props);

        this.getNavbar = this.getNavbar.bind(this)

        this.state = { navbar: true }
        if (location.toString().includes("navbar=hidden")) {
            this.state = { navbar: false }
            stripURLParam("navbar=hidden")
        }
    }

    getNavbar() {
        if (this.state.navbar) {
            return <CustomNavbar />
        }
    }

    render() {

        let loaderWidth = 300
        let loaderHeight = 165

        return (
            <div className="container">
                <Router>
                    <div>

                        {this.getNavbar()}

                        <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/projects" component={Projects} exact />
                            <Route path="/projects/:id" component={ProjectDetails} exact />
                            <Route path="/login" component={Login} exact />
                            <Route path="/logout" component={Logout} exact />
                            <Route path="/loggedout" component={LoggedOut} exact />
                            <Route path="/callback" component={CallbackPage} />
                        </Switch>

                        <div className="container-fluid">
                            <div className="row">
                                <div
                                    hidden={!this.props.loading}
                                    className="card"
                                    style={{ height: (loaderHeight + "px"), width: (loaderWidth + 'px'), position: "fixed", left: ((window.innerWidth / 2) - (loaderWidth / 2)), top: ((window.innerHeight / 2) - (loaderHeight / 2)), zIndex: "99" }}>

                                    <div className="card-body">
                                        <label style={{ width: "100%", textAlign: "center", fontSize: "x-large", fontWeight: "bold", color: "#4285F4" }}>LOADING</label>
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

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <App />
        </OidcProvider>
    </Provider>,
    document.getElementById('app')
)
