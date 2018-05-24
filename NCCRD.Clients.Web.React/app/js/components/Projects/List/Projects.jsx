'use strict'

import React from 'react'
import ProjectList from './ProjectList.jsx'
import ProjectFilters from '../Filters/ProjectFilters.jsx'
import { connect } from 'react-redux'
import { Fa, Button, ButtonFixed, Footer, Container, Select, SelectInput, SelectOptions, SelectOption } from 'mdbreact'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL"
import ReactTooltip from 'react-tooltip'

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
                <div style={{ position: "fixed", right: "14%", bottom: "10px", zIndex: "99" }}>

                    <Button data-tip="Add project" tag="a" size="sm" floating color="primary" onClick={this.addProject}>
                        <Fa icon="plus" />
                    </Button>
                    <Button data-tip="Back to top" tag="a" size="sm" floating color="success" onClick={this.backToTop}>
                        <Fa icon="arrow-up" />
                    </Button>

                </div>
                
                <ProjectFilters />
                <ProjectList />

                <ReactTooltip delayShow={700} />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)