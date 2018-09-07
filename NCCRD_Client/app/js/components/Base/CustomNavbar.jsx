import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'mdbreact'
import * as ACTION_TYPES from "../../constants/action-types"
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact'
import userManager from '../Authentication/userManager'
import { ssoBaseURL } from '../../config/ssoBaseURL.cfg'

const _gf = require("../../globalFunctions")

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { navigation: { locationHash } } = state
  return { user, locationHash }
}

class CustomNavbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    }

    this.onClick = this.onClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.Register = this.Register.bind(this)
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

  LoginLogoutClicked() {
    //Save current URL to cookie
    _gf.SaveCurrentUrl()
  }


  Register() {
    let { user } = this.props

    if (!user || user.expired) {
      return <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank"><b style={{ color: "black" }}>Register</b></a>
    }
  }

  render() {

    let { locationHash, user } = this.props

    return (
      <Navbar size="sm" color="white" dark expand="md" style={{ boxShadow: "none", borderTop: "1px solid gainsboro" }} >
        {!this.state.isWideEnough && <NavbarToggler style={{ backgroundColor: "#2BBBAD" }} onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>

          {/* LEFT */}
          <NavbarNav left>
            <NavItem style={{ borderBottom: (locationHash === "#/" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#"><b style={{ color: "black" }}>Home</b></a>
            </NavItem>

            <NavItem style={{ borderBottom: (locationHash.startsWith("#/projects") ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#/projects"><b style={{ color: "black" }}>Projects</b></a>
            </NavItem>

            {/* Link new document */}
            <NavItem style={{ borderBottom: (locationHash.startsWith("#/linkdoc") ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#/linkdoc">
                <b style={{ color: "black" }}>
                  Add new plan
                </b>
              </a>
            </NavItem>
          </NavbarNav>

          {/* RIGHT */}
          <NavbarNav right>

            
            {/* Username */}
            {(user && !user.expired) &&
              <NavItem style={{ marginLeft: "15px" }}>
                <span className="nav-link">
                  <b style={{ color: "#2BBBAD" }}>
                    {"Hello, " + user.profile.email}
                  </b>
                </span>
              </NavItem>
            }

            {/* Login / Logout */}
            <NavItem style={{ marginLeft: "15px" }}>
              {(!user || user.expired) &&
                <a className="nav-link" onClick={this.LoginLogoutClicked} href="#/login">
                  <b style={{ color: "black" }}>
                    Login
                  </b>
                </a>
              }
              {(user && !user.expired) &&
                <a className="nav-link" onClick={this.LoginLogoutClicked} href="#/logout">
                  <b style={{ color: "black" }}>
                    Logout
                  </b>
                </a>
              }
            </NavItem>

            {/* Register */}
            {(!user || user.expired) &&
              <NavItem style={{ marginLeft: "15px" }}>
                <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank">
                  <b style={{ color: "black" }}>
                    Register
                  </b>
                </a>
              </NavItem>
            }

          </NavbarNav>

        </Collapse>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps)(CustomNavbar)