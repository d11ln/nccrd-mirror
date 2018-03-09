'use strict'

import React from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';


class CustomNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
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
            <Navbar color="indigo" dark expand="lg">
            <NavbarBrand href="/">
                <strong>NCCRD</strong>
            </NavbarBrand>
            { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
            <Collapse isOpen = { this.state.collapse } navbar>
            <NavbarNav left>
                <NavItem active>
                    <NavLink className="nav-link" to="#/home" >Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/projects">Projects</NavLink>
                </NavItem>
            </NavbarNav>
            </Collapse>
        </Navbar>
        )
    }
}

export default CustomNavbar