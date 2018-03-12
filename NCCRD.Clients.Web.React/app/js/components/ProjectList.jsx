'use strict'

import React from 'react'
import ProjectCard from './ProjectCard.jsx';
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
    let { projects: { projectHeaders } } = state
    return { projectHeaders }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCards: payload => {
            dispatch({ type: 'UPDATE_CARDS', payload })
        }
    }
}

class ProjectList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { updateCards } = this.props
        fetch('http://localhost:58683/api/Projects/GetAll/List', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            updateCards(res)
        })
    }

    buildList() {

        const { projectHeaders } = this.props
        let ar = []

        if (typeof projectHeaders !== 'undefined') {
            for (let i of projectHeaders) {
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