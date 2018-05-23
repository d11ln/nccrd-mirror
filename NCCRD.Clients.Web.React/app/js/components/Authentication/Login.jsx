'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'mdbreact'
import * as ACTION_TYPES from "../../constants/action-types"

const mapStateToProps = (state, props) => {
    let { globalData: { loading } } = state
    return { loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        },
        setAuthenticated: payload => {
            dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload })
        }
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this)

        this.state = { username: "", password: "" }
    }

    componentDidMount() {
        this.props.setLoading(false)
    }

    login() {

        let { username, password } = this.state
        let valid = true

        valid = this.validateUsername(username)
        if (valid) {
            valid = this.validatePassword(password)
        }

        if (valid) {
            Promise.all([this.props.setAuthenticated({isAuthenticated: true, username: username})]).then(location.hash = "/")
        }
    }

    validateUsername(username) {

        let valid = true

        if (username === "") {
            alert("Email (username) required")
            valid = false
        }
        else if (!(username.includes("@") && username.includes("."))) {
            alert("Invalid Email (username)")
            valid = false
        }

        return valid
    }

    validatePassword(password) {
        let valid = true

        if (password === "") {
            alert("Password required")
            valid = false
        }

        return valid
    }

    username(e) {
        this.setState({ username: e.target.value })
    }

    password(e) {
        this.setState({ password: e.target.value })
    }

    render() {

        return (
            <>
                <div className="row" style={{ marginTop: "10%" }}>

                    <div className="col-md-4">
                    </div>

                    <div className="col-md-4">
                        <h2>Login</h2>
                        <br />
                        <br />
                        <div style={{ marginLeft: "3px" }}>
                            <Input onChange={this.username.bind(this)} size="sm" label="Email" icon="envelope" group type="email" />
                            <Input onChange={this.password.bind(this)} size="sm" label="Password" icon="lock" group type="password" />
                            <Button onClick={this.login} size="sm" style={{ float: "right", marginRight: "13px" }}>Login</Button>
                        </div>
                    </div>
                </div>

                {/* <br/> */}
                {/* Third party login providers */}
                {/* <div className="row mt-2 mb-3 d-flex justify-content-center">
                    <a className="fa-lg p-2 m-2 fb-ic"><i className="fa fa-facebook white-text fa-lg"> </i></a>
                    <a className="fa-lg p-2 m-2 tw-ic"><i className="fa fa-twitter white-text fa-lg"> </i></a>
                    <a className="fa-lg p-2 m-2 gplus-ic"><i className="fa fa-google-plus white-text fa-lg"> </i></a>
                </div> */}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)