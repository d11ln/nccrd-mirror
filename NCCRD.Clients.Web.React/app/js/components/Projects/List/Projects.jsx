'use strict'

import React from 'react'
import ProjectList from './ProjectList.jsx'
import ProjectFilters from '../Filters/ProjectFilters.jsx'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { Button, Footer, Container } from 'mdbreact'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL"

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { globalData: { loading } } = state
    let user = state.oidc.user
    return { loading, user }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        },
        loadPolygonFilter: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_POLYGON_FILTER, payload })
        }
    }
}

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.backToTop = this.backToTop.bind(this)
        this.addProject = this.addProject.bind(this)

        //Read polygon filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))

        if (typeof parsedHash.polygon !== 'undefined') {

            //Dispatch to store
            this.props.loadPolygonFilter(parsedHash.polygon)
        }
    }

    backToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    addProject() {
        location.hash = '/projects/add'
    }

    componentWillMount() {
        this.props.setLoading(true)
    }

    // testAuth() {

    //     let { user } = this.props

    //     console.log("Test Auth")
    //     console.log("User", user)

    //     fetch(apiBaseURL + 'api/Projects/GetById/741', {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + (user === null ? "" : user.access_token)
    //         }
    //     }).then(res => res.json()).then(res => {
    //         console.log("res", res)
    //     }).catch(res => {
    //         console.log("Error details:", res)
    //     })
    // }

    render() {

        let { user } = this.props

        return (
            <>
                {/* <Button onTouchTap={this.testAuth.bind(this)} >
                    Test Auth
                </Button> */}

                <div className="container-fluid">
                    <div className="row">
                        <div
                            hidden={!this.props.loading}
                            className="card"
                            style={{ position: "fixed", right: "40%", bottom: "42%", zIndex: "99" }}>

                            <div className="card-body" style={{ margin: "30px 80px 30px 80px" }}>
                                <label style={{ fontSize: "x-large", fontWeight: "bold", color: "#4285F4" }}>LOADING</label>
                                <BeatLoader
                                    color={'#4285F4'}
                                    size={30}
                                    loading={this.props.loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ position: "fixed", right: "14%", bottom: "10px", zIndex: "99" }}>

                    <Button hidden={!user || user.expired} color="secondary" className="btn-sm" onTouchTap={this.addProject} >
                        <i className="fa fa-plus-circle" aria-hidden="true" />
                        &nbsp;&nbsp;
                        Add project
                                </Button>

                    <Button color="secondary" className="btn-sm" onTouchTap={this.backToTop} >
                        <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                        &nbsp;&nbsp;
                        Back to top
                                </Button>

                </div>
                <ProjectFilters />
                <ProjectList />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)