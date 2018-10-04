import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../config/serviceURLs.cfg"
import { connect } from 'react-redux'
import AdaptationDetailsItem from './AdaptationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
    let { adaptationData: { adaptationDetails } } = state
    let { projectData: { projectDetails } } = state
    let { globalData: { editMode } } = state
    return { adaptationDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

class AdaptationDetailsTab extends React.Component {

    constructor(props) {
        super(props)
    }

    loadDetails() {

        let { adaptationDetails } = this.props
        let details = []

        if (typeof adaptationDetails !== 'undefined') {
            for (let i of adaptationDetails.sort((a, b) => parseInt(a.AdaptationDetailId) - parseInt(b.AdaptationDetailId))) {
                details.push(<AdaptationDetailsItem key={i.AdaptationDetailId} details={i} />)
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

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsTab)