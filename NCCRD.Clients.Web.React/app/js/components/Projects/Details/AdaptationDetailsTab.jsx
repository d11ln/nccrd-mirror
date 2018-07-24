'use strict'

import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import AdaptationDetailsItem from './AdaptationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
    let { adaptationData: { adaptationDetails } } = state
    let { projectData: { projectDetails } } = state
    let { globalData: { editMode } } = state
    return { adaptationDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAdaptationDetails: payload => {
            dispatch({ type: ACTION_TYPES.ADD_ADAPTATION_DETAILS, payload })
        }
    }
}

class AdaptationDetailsTab extends React.Component {

    constructor(props) {
        super(props)
        this.addClick = this.addClick.bind(this)
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

    addClick() {
        let { addAdaptationDetails, projectDetails } = this.props
        addAdaptationDetails(projectDetails.ProjectId);
    }

    render() {

        let { editMode } = this.props

        return (
            <>
                <div style={{ position: "fixed", right: "14%", bottom: "65px", zIndex: "99" }}>
                    <Button hidden={!editMode} data-tip="Add Adaptation Details" tag="a" size="sm" floating color="primary" onTouchTap={this.addClick}>
                        <Fa icon="plus" />
                    </Button>
                </div>

                {this.loadDetails()}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationDetailsTab)