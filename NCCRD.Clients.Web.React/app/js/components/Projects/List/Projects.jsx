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
        },
        updateNav: payload => {
            dispatch({ type: "NAV", payload })
        }
    }
}

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.backToTop = this.backToTop.bind(this)
        this.addProject = this.addProject.bind(this)
        this.handleScroll = this.handleScroll.bind(this);

        //Read polygon filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))

        if (typeof parsedHash.polygon !== 'undefined') {

            //Dispatch to store
            this.props.loadPolygonFilter(parsedHash.polygon)
        }

        this.state = { showBackToTop: false }
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

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.props.updateNav(location.hash)
    }

    handleScroll() {
        this.setState({ showBackToTop: (window.pageYOffset > 300) })
    }

    render() {

        let { user } = this.props
        let { showBackToTop } = this.state

        return (
            <>
                <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>

                    {(user && !user.expired) &&
                        <div>
                            <Button data-tip="Add project" size="sm" floating color="primary" onClick={this.addProject}>
                                <Fa icon="plus" />
                            </Button>
                            <br />
                        </div>}

                    {showBackToTop &&
                        <Button data-tip="Back to top" size="sm" floating color="default" onClick={this.backToTop}>
                            <Fa icon="arrow-up" />
                        </Button>}

                </div>

                <ProjectFilters />
                <ProjectList />

                <ReactTooltip delayShow={700} />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)