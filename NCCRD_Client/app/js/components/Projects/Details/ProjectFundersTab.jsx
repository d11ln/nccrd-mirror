import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import { connect } from 'react-redux'
import ProjectFundersItem from './ProjectFundersItem.jsx'

const mapStateToProps = (state, props) => {
    let { projectFundersData: { projectFunderDetails } } = state
    let { projectData: { projectDetails } } = state
    let { globalData: { editMode } } = state
    return { projectFunderDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

class ProjectFundersTab extends React.Component {

    constructor(props) {
        super(props)
    }

    loadDetails() {

        let { projectFunderDetails } = this.props
        let details = []

        if (typeof projectFunderDetails !== 'undefined') {
            for (let i of projectFunderDetails.sort((a, b) => parseInt(a.FunderId) - parseInt(b.FunderId))) {
                details.push(<ProjectFundersItem key={i.FunderId + i.key} details={i} />)
            }

            return details
        }
        return <div />
    }

    render() {
        return (
            <>
                {this.loadDetails()}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFundersTab)