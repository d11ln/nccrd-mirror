'use strict'

import React from 'react'
import { Button, Input } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from './TextComponent.jsx'
import TextAreaComponent from './TextAreaComponent.jsx'
import RangeComponent from './RangeComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import { apiBaseURL } from "../constants/apiBaseURL"
import {
  SET_PROJECT_DETAILS_BUDGET_FROM, SET_PROJECT_DETAILS_BUDGET_TO, SET_PROJECT_DETAILS_DESCRIPTION,
  SET_PROJECT_DETAILS_LEAD_AGENT, SET_PROJECT_DETAILS_HOST_PARTNER, SET_PROJECT_DETAILS_HOST_ORG,
  SET_PROJECT_DETAILS_ALT_CONTACT, SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL, SET_PROJECT_DETAILS_LINK,
  SET_PROJECT_DETAILS_VALIDATION_COMMENTS, SET_PROJECT_DETAILS_PROJECT_TYPE, SET_PROJECT_DETAILS_PROJECT_SUBTYPE,
  SET_PROJECT_DETAILS_PROJECT_STATUS, SET_PROJECT_DETAILS_PROJECT_MANAGER, SET_PROJECT_DETAILS_VALIDATION_STATUS,
  SET_PROJECT_DETAILS_MAOPTION
} from "../constants/action-types"

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
            setValueKey={SET_PROJECT_DETAILS_DESCRIPTION}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-4"
            label="Lead agent:"
            id="txtLeadAgent"
            value={projectDetails.LeadAgent}
            setValueKey={SET_PROJECT_DETAILS_LEAD_AGENT}
          />
          <TextComponent
            col="col-md-4"
            readOnly="true"
            label="Host partner:"
            id="txtHostPartner"
            value={projectDetails.HostPartner}
            setValueKey={SET_PROJECT_DETAILS_HOST_PARTNER}
          />
          <TextComponent
            col="col-md-4"
            label="Host organisation:"
            id="txtHostOrganisation"
            value={projectDetails.HostOrganisation}
            setValueKey={SET_PROJECT_DETAILS_HOST_ORG}
          />
        </div>

        <br />

        <div className="row">
          <TextComponent
            col="col-md-4"
            label="Contact (alt):"
            id="txtAlternativeContact"
            value={projectDetails.AlternativeContact}
            setValueKey={SET_PROJECT_DETAILS_ALT_CONTACT}
          />
          <TextComponent
            col="col-md-4"
            label="Contact email (alt):"
            id="txtAlternativeContactEmail"
            value={projectDetails.AlternativeContactEmail}
            setValueKey={SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL}
          />
          <TextComponent
            col="col-md-4"
            label="Link:"
            id="txtLink"
            value={projectDetails.Link}
            setValueKey={SET_PROJECT_DETAILS_LINK}
          />
        </div>

        <br />

        <div className="row">
          <TextAreaComponent
            col="col-md-12"
            label="Validation comments:"
            id="txtValidationComments"
            value={projectDetails.ValidationComments}
            setValueKey={SET_PROJECT_DETAILS_VALIDATION_COMMENTS}
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
            setValueFromKey={SET_PROJECT_DETAILS_BUDGET_FROM}
            setValueToKey={SET_PROJECT_DETAILS_BUDGET_TO}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            col="col-md-4"
            label="Project type:"
            readOnly="true"
            selectedValue={projectDetails.ProjectTypeId}
            options={this.props.projectTypes}
            setSelectedValueKey={SET_PROJECT_DETAILS_PROJECT_TYPE}
          />
          <SelectComponent
            col="col-md-4"
            label="Project sub-type:"
            selectedValue={projectDetails.ProjectSubTypeId}
            options={this.props.projectSubTypes}
            setSelectedValueKey={SET_PROJECT_DETAILS_PROJECT_SUBTYPE}
          />
          <SelectComponent
            col="col-md-4"
            label="Project status:"
            selectedValue={projectDetails.ProjectStatusId}
            options={this.props.projectStatus}
            setSelectedValueKey={SET_PROJECT_DETAILS_PROJECT_STATUS}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            col="col-md-4"
            label="Project manager:"
            selectedValue={projectDetails.ProjectManagerId}
            options={this.props.users}
            setSelectedValueKey={SET_PROJECT_DETAILS_PROJECT_MANAGER}
          />
          <SelectComponent
            col="col-md-4"
            label="Validation status:"
            selectedValue={projectDetails.ValidationStatusId}
            options={this.props.validationStatus}
            setSelectedValueKey={SET_PROJECT_DETAILS_VALIDATION_STATUS}
          />
          <SelectComponent
            col="col-md-4"
            label="MAOptions:"
            selectedValue={projectDetails.MAOptionId}
            options={this.props.maOptions}
            setSelectedValueKey={SET_PROJECT_DETAILS_MAOPTION}
          />
        </div>

      </div>


    )
  }
}

export default connect(mapStateToProps)(ProjectDetailsTab)