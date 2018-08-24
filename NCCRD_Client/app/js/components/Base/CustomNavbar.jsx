'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'mdbreact'
import * as ACTION_TYPES from "../../constants/action-types"
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact'
import userManager from '../Authentication/userManager'
import { ssoBaseURL } from '../../constants/ssoBaseURL'

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
        this.Logout = this.Logout.bind(this)
        this.LoginLogout = this.LoginLogout.bind(this)
        this.GetUser = this.GetUser.bind(this)
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

    Logout() {
        console.log("LOGOUT")
    }

    LoginLogout() {

        let { user } = this.props

        if (!user || user.expired) {
            return <a className="nav-link" href="#/login"><b style={{ color: "black" }}>Login</b></a>
        }
        else {
            return <a className="nav-link" href="#/logout"><b style={{ color: "black" }}>Logout</b></a>
        }
    }

    Register() {
        let { user } = this.props

        if (!user || user.expired) {
            return <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank"><b style={{ color: "black" }}>Register</b></a>
        }
    }

    GetUser() {
        let { user } = this.props

        if (!user || user.expired) {
            return <span className="nav-link"></span>
        }
        else {
            return <span className="nav-link"><b style={{ color: "#2BBBAD" }}>{"Hello, " + user.profile.email}</b></span>
        }
    }

    render() {

        let { locationHash } = this.props

        return (
            <Navbar size="sm" color="white" dark expand="md" style={{ boxShadow: "none", borderTop: "1px solid gainsboro" }} >
                {!this.state.isWideEnough && <NavbarToggler style={{backgroundColor: "#2BBBAD"}} onClick={this.onClick} />}
                <Collapse isOpen={this.state.collapse} navbar>

                    {/* <NavbarBrand tag="span">
                        NCCRD
                    </NavbarBrand> */}

                    <NavbarNav left>
                        <NavItem style={{borderBottom: (locationHash === "#/" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px"}}>
                            <a className="nav-link" href="#"><b style={{ color: "black" }}>Home</b></a>
                        </NavItem>
                        <NavItem style={{borderBottom: (locationHash.startsWith("#/projects") ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px"}}>
                            <a className="nav-link" href="#/projects"><b style={{ color: "black" }}>Projects</b></a>
                        </NavItem>
                    </NavbarNav>

                    <NavbarNav right>
                        <NavItem style={{marginLeft: "15px"}}>
                            {this.GetUser()}
                        </NavItem>
                        <NavItem style={{marginLeft: "15px"}}>
                            {this.LoginLogout()}
                        </NavItem>
                        <NavItem style={{marginLeft: "15px"}}>
                            {this.Register()}
                        </NavItem>
                    </NavbarNav>

                </Collapse>
            </Navbar>
        )
    }
}

export default connect(mapStateToProps)(CustomNavbar)