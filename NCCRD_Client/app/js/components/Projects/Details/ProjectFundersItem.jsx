import React from 'react'
import { apiBaseURL } from "../../../config/apiBaseURL.cfg"
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx';
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { Row, Col } from 'mdbreact'
import { DEAGreenDark } from '../../../config/colours.cfg'

const _gf = require('../../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { lookupData: { users, fundingStatus } } = state
  return { users, fundingStatus }
}

class ProjectFundersItem extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange(value) {
    this.setState({ value });
  }


  render() {

    let { details, users, fundingStatus } = this.props

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
          />

        </Row>

        <br />
        <hr style={{ borderWidth: "2px", borderStyle: "solid", borderColor: DEAGreenDark }} />
        <br />

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps)(ProjectFundersItem)