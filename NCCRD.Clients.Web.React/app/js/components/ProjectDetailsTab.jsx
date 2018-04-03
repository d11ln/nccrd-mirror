'use strict'

import React from 'react'
import { Button, Input } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import TextAreaComponent from './TextAreaComponent.jsx'
import RangeComponent from './RangeComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import { apiBaseURL } from "../constants/apiBaseURL"
import * as ACTION_TYPES from "../constants/action-types"

const mapStateToProps = (state, props) => {
    let { projectData: { projectDetails } } = state
    let { lookupData: { projectTypes, projectSubTypes, projectStatus, users, validationStatus, maOptions } } = state
    return { projectDetails, projectTypes, projectSubTypes, projectStatus, users, validationStatus, maOptions }
}

class ProjectDetailsTab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { projectDetails } = this.props

        return (

            <div>

                <br />

                <div className="row">
                    <TextAreaComponent
                        col="col-md-12"
                        label="Description:"
                        id="txtDescription"
                        value={projectDetails.ProjectDescription}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_DESCRIPTION}
                    />
                </div>

                <br />

                <div className="row">
                    <TextComponent
                        col="col-md-4"
                        label="Lead agent:"
                        id="txtLeadAgent"
                        value={projectDetails.LeadAgent}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_LEAD_AGENT}
                    />
                    <TextComponent
                        col="col-md-4"
                        readOnly="true"
                        label="Host partner:"
                        id="txtHostPartner"
                        value={projectDetails.HostPartner}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_HOST_PARTNER}
                    />
                    <TextComponent
                        col="col-md-4"
                        label="Host organisation:"
                        id="txtHostOrganisation"
                        value={projectDetails.HostOrganisation}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_HOST_ORG}
                    />
                </div>

                <br />

                <div className="row">
                    <TextComponent
                        col="col-md-4"
                        label="Contact (alt):"
                        id="txtAlternativeContact"
                        value={projectDetails.AlternativeContact}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_ALT_CONTACT}
                    />
                    <TextComponent
                        col="col-md-4"
                        label="Contact email (alt):"
                        id="txtAlternativeContactEmail"
                        value={projectDetails.AlternativeContactEmail}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL}
                    />
                    <TextComponent
                        col="col-md-4"
                        label="Link:"
                        id="txtLink"
                        value={projectDetails.Link}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_LINK}
                    />
                </div>

                <br />

                <div className="row">
                    <TextAreaComponent
                        col="col-md-12"
                        label="Validation comments:"
                        id="txtValidationComments"
                        value={projectDetails.ValidationComments}
                        setValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_VALIDATION_COMMENTS}
                    />
                </div>

                <br />

                <div className="row">
                    <RangeComponent
                        col="col-md-12"
                        align="left"
                        id="txtBudget"
                        label="Budget range:"
                        prefix="R"
                        inputWidth="125px"
                        valueFrom={projectDetails.BudgetLower}
                        valueTo={projectDetails.BudgetUpper}
                        setValueFromKey={ACTION_TYPES.SET_PROJECT_DETAILS_BUDGET_FROM}
                        setValueToKey={ACTION_TYPES.SET_PROJECT_DETAILS_BUDGET_TO}
                    />
                </div>

                <br />

                <div className="row">
                    <SelectComponent
                        col="col-md-4"
                        label="Project type:"
                        selectedValue={projectDetails.ProjectTypeId}
                        data={this.props.projectTypes}
                        setSelectedValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_TYPE}
                        dispatch={ACTION_TYPES.LOAD_PROJECT_TYPE}
                        persist={"api/ProjectType/AddOrUpdate"}
                        allowEdit={true}
                    />
                    <SelectComponent
                        col="col-md-4"
                        label="Project sub-type:"
                        selectedValue={projectDetails.ProjectSubTypeId}
                        data={this.props.projectSubTypes}
                        setSelectedValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_SUBTYPE}
                        dispatch={ACTION_TYPES.LOAD_PROJECT_SUBTYPE}
                        persist={"api/ProjectSubType/AddOrUpdate"}
                        allowEdit={false}
                    />
                    <SelectComponent
                        col="col-md-4"
                        label="Project status:"
                        selectedValue={projectDetails.ProjectStatusId}
                        data={this.props.projectStatus}
                        setSelectedValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_STATUS}
                        dispatch={ACTION_TYPES.LOAD_PROJECT_STATUS}
                        persist={"api/ProjectStatus/AddOrUpdate"}
                        allowEdit={true}
                    />
                </div>

                <br />

                <div className="row">
                    <SelectComponent
                        col="col-md-4"
                        label="Project manager:"
                        selectedValue={projectDetails.ProjectManagerId}
                        data={this.props.users}
                        setSelectedValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_PROJECT_MANAGER}
                        allowEdit={false}
                    />
                    <SelectComponent
                        col="col-md-4"
                        label="Validation status:"
                        selectedValue={projectDetails.ValidationStatusId}
                        data={this.props.validationStatus}
                        setSelectedValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_VALIDATION_STATUS}
                        dispatch={ACTION_TYPES.LOAD_VALIDATION_STATUS}
                        persist={"api/ValidationStatus/AddOrUpdate"}
                        allowEdit={true}
                    />
                    <SelectComponent
                        col="col-md-4"
                        label="MAOptions:"
                        selectedValue={projectDetails.MAOptionId}
                        data={this.props.maOptions}
                        setSelectedValueKey={ACTION_TYPES.SET_PROJECT_DETAILS_MAOPTION}
                        // dispatch={ACTION_TYPES.LOAD_MA_OPTIONS}
                        // persist={"api/MAOptions/AddOrUpdate"}
                        allowEdit={false}
                    />
                </div>

            </div>


        )
    }
}

export default connect(mapStateToProps)(ProjectDetailsTab)