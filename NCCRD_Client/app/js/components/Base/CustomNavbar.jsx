import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'mdbreact'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact'
import userManager from '../Authentication/userManager'
import { ssoBaseURL } from '../../config/serviceURLs.cfg'
import {DEAGreen} from '../../config/colours.cfg'

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
      <Navbar size="sm" color="white" light expand="md" style={{ boxShadow: "none", borderTop: "1px solid gainsboro" }} >
        {!this.state.isWideEnough && <NavbarToggler style={{ backgroundColor: "#2BBBAD" }} onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>

          {/* LEFT */}
          <NavbarNav left>
            <NavItem style={{ borderBottom: (locationHash === "#/" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <NavLink to="/"><b>Home</b></NavLink>
            </NavItem>

            <NavItem style={{ borderBottom: (locationHash === "#/projects" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <NavLink to="/projects"><b>Project List</b></NavLink>
            </NavItem>

          </NavbarNav>

          {/* RIGHT */}
          <NavbarNav right>

            {/* Username */}
            {(user && !user.expired) &&
              <NavItem style={{ marginLeft: "15px" }}>
                <span className="nav-link">
                  <b style={{ color: DEAGreen }}>
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