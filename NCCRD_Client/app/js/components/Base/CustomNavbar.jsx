import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Fa } from 'mdbreact'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact'
import userManager from '../Authentication/userManager'
import { ssoBaseURL } from '../../config/serviceURLs.cfg'
import { DEAGreen } from '../../config/colours.cfg'
import { data as NavData } from '../../../data/sideNavConfig'

const _gf = require("../../globalFunctions")
const queryString = require('query-string')

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { globalData: { loading, daoid, showSideNav } } = state
  return { user, loading, daoid, showSideNav }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDAOID: async payload => {
      dispatch({ type: "SET_DAOID", payload })
    },
    toggleSideNav: payload => {
      dispatch({ type: "TOGGLE_SIDENAV", payload })
    }
  }
}

class CustomNavbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      addOnly: false
    }

    this.onClick = this.onClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.Register = this.Register.bind(this)
  }

  componentDidMount() {
    //Read initial filter from URL
    const parsedHash = queryString.parse(location.hash.substring(location.hash.indexOf("?"))) //queryString.parse(location.hash.replace("/projects?", ""))
    if (typeof parsedHash.daoid !== 'undefined') {
      this.props.setDAOID(parsedHash.daoid)
    }

    if (parsedHash.navbar === "addOnly") {
      this.setState({ addOnly: true })
    }

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

    let { user, daoid, toggleSideNav, showSideNav } = this.props
    let { addOnly } = this.state

    return (
      <Navbar
        size="sm"
        color="white"
        light
        expand="md"
        style={{
          boxShadow: "0px 15px 10px -15px gainsboro",
          borderTop: "1px solid #E8E8E8",
        }}
      >
        {
          !this.state.isWideEnough &&
          <NavbarToggler
            style={{ backgroundColor: "#2BBBAD" }}
            onClick={this.onClick}
          />
        }

        <Collapse isOpen={this.state.collapse} navbar>

          {/* LEFT */}
          <NavbarNav left>

            {
              (NavData.enabled && addOnly === false) &&
              <Button size="sm" color="grey" onClick={() => { toggleSideNav(!showSideNav) }}
                style={{ width: "45px", marginLeft: "0px", marginRight: "15px", paddingLeft: "18px" }}>
                <Fa icon="bars" />
              </Button>
            }

            {
              (!location.hash.includes("projects/") && (user && !user.expired)) &&
              <Button
                color="warning"
                size="sm"
                style={{ marginLeft: "0px" }}
                onClick={() => { location.hash = "projects/add" + (_gf.IsValidGuid(daoid) ? `?daoid=${daoid}` : "") }} >
                Add New Project
              </Button>
            }

          </NavbarNav>

          {/* RIGHT */}
          {
            addOnly === false &&
            <NavbarNav right>

              {/* Username */}
              {(user && !user.expired) &&

                <table>
                  <tbody>
                    <tr style={{ height: "40px" }}>
                      <td valign="middle">
                        <div style={{ marginRight: "7px", color: "grey" }} >
                          <Fa size="2x" icon="user-circle-o" />
                        </div>
                      </td>
                      <td valign="middle">
                        <div style={{ fontSize: "17px" }} >
                          <b>{`${user.profile.FirstName} ${user.profile.Surname}`}</b>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
          }

        </Collapse>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar)