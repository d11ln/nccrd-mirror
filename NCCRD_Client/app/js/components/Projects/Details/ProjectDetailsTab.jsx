import React from 'react'
import { Button, Input } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import RangeComponent from '../../Shared/RangeComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import { apiBaseURL } from "../../../config/apiBaseURL.cfg"

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

            <>
                {/* <br /> */}

                <div className="row">
                    <TextAreaComponent
                        col="col-md-12"
                        label="Project title:"
                        id="txtProjectTitle"
                        value={projectDetails.ProjectTitle}
                        setValueKey={"SET_PROJECT_DETAILS_TITLE"}
                    />
                </div>

                <br />

                <div className="row">
                    <RangeComponent
                        col="col-md-6"
                        id="txtProjectYear"
                        label=""
                        inputWidth="75px"
                        valueFrom={projectDetails.StartYear} valueTo={projectDetails.EndYear}
                        setValueFromKey={"SET_PROJECT_DETAILS_YEAR_FROM"}
                        setValueToKey={"SET_PROJECT_DETAILS_YEAR_TO"}
                    />
                </div>

                <br />

                <div className="row">
                    <TextAreaComponent
                        col="col-md-12"
                        label="Description:"
                        id="txtProjectDescription"
                        value={projectDetails.ProjectDescription}
                        setValueKey={"SET_PROJECT_DETAILS_DESCRIPTION"}
                    />
                </div>

                <br />

                <div className="row">
                    <TextComponent
                        col="col-md-4"
                        label="Lead agent:"
                        id="txtProjectLeadAgent"
                        value={projectDetails.LeadAgent}
                        setValueKey={"SET_PROJECT_DETAILS_LEAD_AGENT"}
                    />
                    <TextComponent
                        col="col-md-4"
                        readOnly="true"
                        label="Host partner:"
                        id="txtProjectHostPartner"
                        value={projectDetails.HostPartner}
                        setValueKey={"SET_PROJECT_DETAILS_HOST_PARTNER"}
                    />
                    <TextComponent
                        col="col-md-4"
                        label="Host organisation:"
                        id="txtProjectHostOrganisation"
                        value={projectDetails.HostOrganisation}
                        setValueKey={"SET_PROJECT_DETAILS_HOST_ORG"}
                    />
                </div>

                <br />

                <div className="row">
                    <TextComponent
                        col="col-md-4"
                        label="Contact (alt):"
                        id="txtProjectAlternativeContact"
                        value={projectDetails.AlternativeContact}
                        setValueKey={"SET_PROJECT_DETAILS_ALT_CONTACT"}
                    />
                    <TextComponent
                        col="col-md-4"
                        label="Contact email (alt):"
                        id="txtProjectAlternativeContactEmail"
                        value={projectDetails.AlternativeContactEmail}
                        setValueKey={"SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL"}
                    />
                    <TextComponent
                        col="col-md-4"
                        label="Link:"
                        id="txtProjectLink"
                        value={projectDetails.Link}
                        setValueKey={"SET_PROJECT_DETAILS_LINK"}
                    />
                </div>

                <br />

                <div className="row">
                    <TextAreaComponent
                        col="col-md-12"
                        label="Validation comments:"
                        id="txtProjectValidationComments"
                        value={projectDetails.ValidationComments}
                        setValueKey={"SET_PROJECT_DETAILS_VALIDATION_COMMENTS"}
                    />
                </div>

                <br />

                <div className="row">
                    <RangeComponent
                        col="col-md-12"
                        id="txtProjectBudget"
                        label="Budget range:"
                        prefix="R"
                        inputWidth="125px"
                        valueFrom={projectDetails.BudgetLower}
                        valueTo={projectDetails.BudgetUpper}
                        setValueFromKey={"SET_PROJECT_DETAILS_BUDGET_FROM"}
                        setValueToKey={"SET_PROJECT_DETAILS_BUDGET_TO"}
                    />
                </div>

                <br />

                <div className="row">
                    <SelectComponent
                        id="selProjectType"
                        col="col-md-4"
                        label="Project type:"
                        selectedValue={projectDetails.ProjectTypeId}
                        data={this.props.projectTypes}
                        setSelectedValueKey={"SET_PROJECT_DETAILS_PROJECT_TYPE"}
                        dispatch={"LOAD_PROJECT_TYPE"}
                        persist="ProjectType"
                        allowEdit={true}
                        newItemTemplate={{
                            "ProjectTypeId": 0,
                            "Value": "",
                            "Description": ""
                        }}
                    />
                    <SelectComponent
                        id="selProjectSubType"
                        col="col-md-4"
                        label="Project sub-type:"
                        selectedValue={projectDetails.ProjectSubTypeId}
                        data={this.props.projectSubTypes}
                        dataFilterKey={"ProjectTypeId"}
                        dataFilterValue={projectDetails.ProjectTypeId}
                        setSelectedValueKey={"SET_PROJECT_DETAILS_PROJECT_SUBTYPE"}
                        dispatch={"LOAD_PROJECT_SUBTYPE"}
                        persist="ProjectSubType"
                        allowEdit={true}
                        dependencies={[
                            { key: "ProjectTypeId", value: this.props.projectTypes }
                        ]}
                        newItemTemplate={{
                            "ProjectSubTypeId": 0,
                            "Value": "",
                            "Description": "",
                            "ProjectTypeId": 0
                        }}
                    />
                    <SelectComponent
                        id="selProjectStatus"
                        col="col-md-4"
                        label="Project status:"
                        selectedValue={projectDetails.ProjectStatusId}
                        data={this.props.projectStatus}
                        setSelectedValueKey={"SET_PROJECT_DETAILS_PROJECT_STATUS"}
                        dispatch={"LOAD_PROJECT_STATUS"}
                        persist="ProjectStatus"
                        allowEdit={true}
                        newItemTemplate={{
                            "ProjectStatusId": 0,
                            "Value": "",
                            "Description": ""
                        }}
                    />
                </div>

                <br />

                <div className="row">
                    <SelectComponent
                        id="selProjectValidationStatus"
                        col="col-md-4"
                        label="Validation status:"
                        selectedValue={projectDetails.ValidationStatusId}
                        data={this.props.validationStatus}
                        setSelectedValueKey={"SET_PROJECT_DETAILS_VALIDATION_STATUS"}
                        dispatch={"LOAD_VALIDATION_STATUS"}
                        persist="ValidationStatus"
                        allowEdit={true}
                        newItemTemplate={{
                            "ValidationStatusId": 0,
                            "Value": "",
                            "Description": ""
                        }}
                    />
                    <SelectComponent
                        id="selProjectManager"
                        col="col-md-8"
                        label="Project manager:"
                        selectedValue={projectDetails.ProjectManagerId}
                        data={this.props.users}
                        setSelectedValueKey={"SET_PROJECT_DETAILS_PROJECT_MANAGER"}
                        allowEdit={false}
                        dispatch={"LOAD_USERS"}
                        persist="User"
                        newItemTemplate={{
                            "UserId": 0,
                            "EmailAddress": "",
                            "FirstName": "",
                            "Surname": "",
                            "Organisation": "",
                            "PhoneNumber": "",
                            "MobileNumber": ""
                        }}
                    />
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(ProjectDetailsTab)