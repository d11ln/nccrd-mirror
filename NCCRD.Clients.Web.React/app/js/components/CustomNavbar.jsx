'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { Button, Input } from 'mdbreact'
import * as ACTION_TYPES from "../constants/action-types"
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';

const mapStateToProps = (state, props) => {
  let { globalData: { isAuthenticated } } = state
  return { isAuthenticated }
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
    this.Logout = this.Logout.bind(this);
    this.LoginLogout = this.LoginLogout.bind(this);
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

  Logout(){
    console.log("LOGOUT")
  }

  LoginLogout(){

    let { isAuthenticated } = this.props

    if(isAuthenticated === false){
      return <a className="nav-link" href="#/login">Login</a>
    }
    else{
      return <a className="nav-link" href="#/logout">Logout</a>
    }
  }

  render() {

    return (
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

          <NavbarNav right>
            <NavItem>
              {this.LoginLogout()}
            </NavItem>
          </NavbarNav>

        </Collapse>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps)(CustomNavbar)