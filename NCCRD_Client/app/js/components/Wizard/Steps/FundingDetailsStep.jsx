import React from 'react'
import { Row } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx';
import SelectComponent from '../../Shared/SelectComponent.jsx';

import "./shared.css"

const mapStateToProps = (state, props) => {
  let { lookupData: { users, fundingStatus } } = state
  let { projectFundersData: { projectFunderDetails } } = state
  return { users, fundingStatus, projectFunderDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class FundingDetailsStep extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { details, users, fundingStatus, projectFunderDetails } = this.props

    return (
      <>
        <Row>
          <TextComponent
            col="col-md-6"
            label="Grant or Program name:"
            value={details.GrantProgName}
            setValueKey="SET_PROJECTFUNDER_GRANTPROGNAME"
            parentId={details.FunderId}
          />
        </Row>

        <div className="horizontal-spacer" />

        <Row>
          <TextComponent
            col="col-md-6"
            label="Funding Agency:"
            value={details.FundingAgency}
            setValueKey="SET_PROJECTFUNDER_FUNDINGAGENCY"
            parentId={details.FunderId}
          />
        </Row>

        <div className="horizontal-spacer" />

        <Row>
          <TextComponent
            col="col-md-6"
            label="Partnering Departments/Organisations:"
            value={details.PartnerDepsOrgs}
            setValueKey="SET_PROJECTFUNDER_PARTNERDEPSORGS"
            parentId={details.FunderId}
          />
        </Row>

        <div className="horizontal-spacer" />

        <Row>
          <SelectComponent
            col="col-md-6"
            label="Project Coordinator:"
            readOnly={true}
            selectedValue={details.ProjectCoordinatorId}
            data={users.map(x => { return { Id: x.PersonId, Value: (x.FirstName + " " + x.Surname + " (" + x.EmailAddress + ")") } })}
            setSelectedValueKey={"SET_PROJECTFUNDERS_PROJECTCOORDINATOR"}
            parentId={details.FunderId}
            dispatch={"LOAD_PROJECTFUNDERS_PROJECTCOORDINATOR"}
            persist="ProjectCoordinator"
            allowEdit={true}
            newItemTemplate={{
              "Id": 0,
              "Value": "",
              "Description": ""
            }}
            allowClear={true}
          />
        </Row>

        <div className="horizontal-spacer" />

        <Row>
          <TextComponent
            col="col-md-6"
            label="Total Budget:"
            value={details.TotalBudget}
            setValueKey="SET_PROJECTFUNDER_TOTALBUDGET"
            parentId={details.FunderId}
            numeric={true}
          />
        </Row>

        <div className="horizontal-spacer" />

        <Row>
          <TextComponent
            col="col-md-6"
            label="Annual Budget:"
            value={details.AnnualBudget}
            setValueKey="SET_PROJECTFUNDER_ANNUALBUDGET"
            parentId={details.FunderId}
            numeric={true}
          />
        </Row>

        <div className="horizontal-spacer" />

        <Row>
          <SelectComponent
            col="col-md-6"
            label="Funding Status:"
            selectedValue={details.FundingStatusId}
            data={fundingStatus}
            setSelectedValueKey={"SET_PROJECTFUNDERS_FUNDINGSTATUS"}
            parentId={details.FunderId}
            dispatch={"LOAD_PROJECTFUNDERS_FUNDINGSTATUS"}
            persist="FundingStatus"
            allowEdit={false}
            newItemTemplate={{
              "Id": 0,
              "Value": "",
              "Description": ""
            }}
            allowClear={true}
          />
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundingDetailsStep)