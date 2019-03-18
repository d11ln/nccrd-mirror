import React from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Fa, Badge } from 'mdbreact'
import TextComponent from '../../Shared/TextComponent.jsx';
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx';
import SelectComponent from '../../Shared/SelectComponent.jsx';
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx';

import "./shared.css"

const mapStateToProps = (state, props) => {
  let { adaptationData: { adaptationDetails } } = state
  let { lookupData: { adaptationPurpose, sector, sectorType, typology, hazards, projectStatus } } = state
  return { adaptationDetails, adaptationPurpose, sector, sectorType, typology, hazards, projectStatus }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class AdaptationContactStep extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { details } = this.props

    return (
      <>
        <Row>
        <TextComponent
            col="col-md-6"
            label="Contact Name:"
            id="txtAdaptationContactName"
            value={details.ContactName}
            setValueKey={"SET_ADAPTATION_DETAILS_CONTACT_NAME"}
            parentId={details.AdaptationDetailId}
          />
        </Row>

        <div className="vertical-spacer" />

        <Row>
        <TextComponent
            col="col-md-6"
            label="Contact Email Address:"
            id="txtAdaptationContactEmail"
            value={details.ContactEmail}
            setValueKey={"SET_ADAPTATION_DETAILS_CONTACT_EMAIL"}
            parentId={details.AdaptationDetailId}
          />
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdaptationContactStep)