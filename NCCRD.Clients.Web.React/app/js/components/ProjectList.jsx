'use strict'

import React from 'react'
import ProjectCard from './ProjectCard.jsx'
import { connect } from 'react-redux'
import { LOAD_PROJECTS } from "../constants/action-types"
import { apiBaseURL } from "../constants/apiBaseURL"

const mapStateToProps = (state, props) => {
    let { projectData: { projects } } = state
    return { projects }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadInitial: payload => {
            dispatch({ type: LOAD_PROJECTS, payload })
        }
    }
}

class ProjectList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { loadInitial } = this.props
        fetch(apiBaseURL + 'api/Projects/GetAll/List', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadInitial(res)
        })
    }

    buildList() {

        const { projects } = this.props
        let ar = []

        if (typeof projects !== 'undefined') {
            for (let i of projects) {
                ar.push(<ProjectCard key={i.ProjectId} pid={i.ProjectId} ptitle={i.ProjectTitle} pdes={i.ProjectDescription} />)
            }

            return ar
        }
        return <div />
    }

    render() {
        return (
            this.buildList()
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)