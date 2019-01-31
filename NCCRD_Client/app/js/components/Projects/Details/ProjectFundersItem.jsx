import React from 'react'
import { apiBaseURL } from "../../../config/serviceURLs.js"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx';
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { Row, Col } from 'mdbreact'
import { DEAGreenDark } from '../../../config/colours.js'

const _gf = require('../../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { lookupData: { users, fundingStatus } } = state
  let { projectFundersData: { projectFunderDetails } } = state
  return { users, fundingStatus, projectFunderDetails }
}

class ProjectFundersItem extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange(value) {
    this.setState({ value });
  }


  render() {

    let { details, users, fundingStatus, projectFunderDetails } = this.props

    return (
      <>
        <Row>

          <TextComponent
            col="col-md-6"
            label="Funding Agency:"
            value={details.FundingAgency}
            setValueKey="SET_PROJECTFUNDER_FUNDINGAGENCY"
            parentId={details.FunderId}
          />

          <TextComponent
            col="col-md-6"
            label="Grant or Program name:"
            value={details.GrantProgName}
            setValueKey="SET_PROJECTFUNDER_GRANTPROGNAME"
            parentId={details.FunderId}
          />

        </Row>

        <br />

        <Row>

          <TextComponent
            col="col-md-6"
            label="Partnering Departments/Organisations:"
            value={details.PartnerDepsOrgs}
            setValueKey="SET_PROJECTFUNDER_PARTNERDEPSORGS"
            parentId={details.FunderId}
          />

        </Row>

        <br />

        <Row>

          <TextComponent
            col="col-md-6"
            label="Total Budget:"
            value={details.TotalBudget}
            setValueKey="SET_PROJECTFUNDER_TOTALBUDGET"
            parentId={details.FunderId}
            numeric={true}
          />

          <TextComponent
            col="col-md-6"
            label="Annual Budget:"
            value={details.AnnualBudget}
            setValueKey="SET_PROJECTFUNDER_ANNUALBUDGET"
            parentId={details.FunderId}
            numeric={true}
          />

        </Row>

        <br />

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

        {
          (projectFunderDetails && projectFunderDetails.length > 1) &&
          <div
            style={{
              height: "5px",
              backgroundColor: "#white",
              margin: "35px -16px 30px -16px",
              borderStyle: "double none none none",
              borderColor: "#C8C8C8"
            }}
          />
        }

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps)(ProjectFundersItem)