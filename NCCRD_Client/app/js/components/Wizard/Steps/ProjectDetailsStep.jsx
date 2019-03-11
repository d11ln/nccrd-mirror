import React from 'react'
import { Row } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx';
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx';
import SelectComponent from '../../Shared/SelectComponent.jsx';
import RangeComponent from '../../Shared/RangeComponent.jsx';

import "./shared.css"

const mapStateToProps = (state, props) => {
  let { projectData: { projectDetails } } = state
  let { lookupData: { projectStatus } } = state
  return { projectStatus, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class ProjectDetailsStep extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { projectDetails } = this.props

    return (
      <>
        <Row>
          <TextAreaComponent
            col="col-md-12"
            label="Title:"
            id="txtProjectTitle"
            value={projectDetails.ProjectTitle}
            setValueKey={"SET_PROJECT_DETAILS_TITLE"}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <TextAreaComponent
            col="col-md-12"
            label="Description:"
            id="txtProjectDescription"
            value={projectDetails.ProjectDescription}
            setValueKey={"SET_PROJECT_DETAILS_DESCRIPTION"}
            rows={4}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <TextComponent
            col="col-md-12"
            label="Link:"
            id="txtProjectLink"
            value={projectDetails.Link}
            setValueKey={"SET_PROJECT_DETAILS_LINK"}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <RangeComponent
            col="col-md-6"
            id="txtProjectYear"
            label=""
            inputWidth="75px"
            valueFrom={projectDetails.StartYear} valueTo={projectDetails.EndYear}
            setValueFromKey={"SET_PROJECT_DETAILS_YEAR_FROM"}
            setValueToKey={"SET_PROJECT_DETAILS_YEAR_TO"}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <SelectComponent
            id="selProjectStatus"
            col="col-md-6"
            label="Project status:"
            selectedValue={projectDetails.ProjectStatusId}
            data={this.props.projectStatus}
            setSelectedValueKey={"SET_PROJECT_DETAILS_PROJECT_STATUS"}
            allowEdit={false}
            allowClear={true}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
          <RangeComponent
            col="col-md-6"
            id="txtProjectBudget"
            label="Budget range:"
            prefix="R"
            inputWidth="125px"
            valueFrom={projectDetails.BudgetLower}
            valueTo={projectDetails.BudgetUpper}
            setValueFromKey={"SET_PROJECT_DETAILS_BUDGET_FROM"}
            setValueToKey={"SET_PROJECT_DETAILS_BUDGET_TO"}
          />
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsStep)