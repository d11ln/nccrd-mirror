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
  LOAD_PROJECT_TYPE, LOAD_PROJECT_SUBTYPE, LOAD_PROJECT_STATUS, LOAD_USERS, LOAD_VALIDATION_STATUS, LOAD_MA_OPTIONS,
  SET_LOADING, SET_PROJECT_DETAILS_BUDGET_FROM, SET_PROJECT_DETAILS_BUDGET_TO, SET_PROJECT_DETAILS_DESCRIPTION,
  SET_PROJECT_DETAILS_LEAD_AGENT, SET_PROJECT_DETAILS_HOST_PARTNER, SET_PROJECT_DETAILS_HOST_ORG,
  SET_PROJECT_DETAILS_ALT_CONTACT, SET_PROJECT_DETAILS_ALT_CONTACT_EMAIL, SET_PROJECT_DETAILS_LINK,
  SET_PROJECT_DETAILS_VALIDATION_COMMENTS, SET_PROJECT_DETAILS_PROJECT_TYPE
} from "../constants/action-types"


const mapStateToProps = (state, props) => {
  let { projectData: { projectDetails } } = state
  let { lookupData: { projectTypes, projectSubTypes, projectStatus, users, validationStatus, maOptions } } = state
  return { projectDetails, projectTypes, projectSubTypes, projectStatus, users, validationStatus, maOptions }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProjectTypes: payload => {
      dispatch({ type: LOAD_PROJECT_TYPE, payload })
    },
    loadProjectSubTypes: payload => {
      dispatch({ type: LOAD_PROJECT_SUBTYPE, payload })
    },
    loadProjectStatus: payload => {
      dispatch({ type: LOAD_PROJECT_STATUS, payload })
    },
    loadProjectManagers: payload => {
      dispatch({ type: LOAD_USERS, payload })
    },
    loadValidationStatus: payload => {
      dispatch({ type: LOAD_VALIDATION_STATUS, payload })
    },
    loadMAOptions: payload => {
      dispatch({ type: LOAD_MA_OPTIONS, payload })
    },
    setLoading: payload => {
      dispatch({ type: SET_LOADING, payload })
    }
  }
}

class ProjectDetailsTab extends React.Component {

  constructor(props) {
    super(props);
  }

  loadProjectTypes() {

    //Load ProjectType
    let { loadProjectTypes, setLoading } = this.props

    fetch(apiBaseURL + 'api/ProjectType/GetAll', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadProjectTypes(res)
    })
  }

  loadProjectSubTypes() {

    //Load ProjectSubType
    let { loadProjectSubTypes } = this.props

    fetch(apiBaseURL + 'api/ProjectSubType/GetAll', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadProjectSubTypes(res)
    })
  }

  loadProjectStatus() {

    //Load ProjectStatus
    let { loadProjectStatus } = this.props

    fetch(apiBaseURL + 'api/ProjectStatus/GetAll', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadProjectStatus(res)
    })
  }

  loadProjectManagers() {

    //Load ProjectManagers (Users)
    let { loadProjectManagers } = this.props

    fetch(apiBaseURL + 'api/AppUsr/GetAllBasic', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadProjectManagers(res)
    })
  }

  loadValidationStatus() {

    //Load ValidationStatus
    let { loadValidationStatus } = this.props

    fetch(apiBaseURL + 'api/ValidationStatus/GetAll', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadValidationStatus(res)
    })

  }

  loadMAOptions() {

    //Load MAOptions
    let { loadMAOptions } = this.props

    fetch(apiBaseURL + 'api/ValidationStatus/GetAll', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      loadMAOptions(res)
    })
  }

  componentDidMount() {

    let { setLoading } = this.props

    setLoading(true)

    $.when(
      this.loadProjectTypes(),
      this.loadProjectSubTypes(),
      this.loadProjectStatus(),
      this.loadProjectManagers(),
      this.loadValidationStatus(),
      this.loadMAOptions()
    ).done(() => { setLoading(false) })
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
            value={projectDetails.ProjectTypeId} 
            options={this.props.projectTypes} 
            setSelectedValueKey={SET_PROJECT_DETAILS_PROJECT_TYPE}
          />
          <SelectComponent col="col-md-4" label="Project sub-type:" readOnly="true" value={projectDetails.ProjectSubTypeId} options={this.props.projectSubTypes} />
          <SelectComponent col="col-md-4" label="Project status:" readOnly="true" value={projectDetails.ProjectStatusId} options={this.props.projectStatus} />
        </div>

        <br />

        <div className="row">
          <SelectComponent col="col-md-4" label="Project manager:" readOnly="true" value={projectDetails.ProjectManagerId} options={this.props.users} />
          <SelectComponent col="col-md-4" label="Validation status:" readOnly="true" value={projectDetails.ValidationStatusId} options={this.props.validationStatus} />
          <SelectComponent col="col-md-4" label="MAOptions:" readOnly="true" value={projectDetails.MAOptionId} options={this.props.maOptions} />
        </div>

      </div>


    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsTab)