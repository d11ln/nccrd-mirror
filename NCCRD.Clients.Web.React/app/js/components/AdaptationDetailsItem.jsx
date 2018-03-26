'use strict'

import React from 'react'
import { apiBaseURL } from "../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextAreaComponent from './TextAreaComponent.jsx'
import SelectComponent from './SelectComponent.jsx'
import * as ACTION_TYPES from "../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { adaptationPurpose, sector } } = state
  return { adaptationPurpose, sector }
}

class AdaptationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, adaptationPurpose, sector } = this.props

    return (
      <div>
        <br />

        <div className="row">
          <TextAreaComponent
            col="col-md-12"
            label="Description:"
            id="txtDescription"
            value={details.Description}
            setValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_DESCR}
            parentId={details.AdaptationDetailId}
          />
        </div>

        <br />

        <div className="row">
          <SelectComponent
            col="col-md-4"
            label="Purpose:"
            readOnly="true"
            selectedValue={details.AdaptationPurposeId}
            options={adaptationPurpose}
            setSelectedValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_PURPOSE}
            parentId={details.AdaptationDetailId}
            dispatch={ACTION_TYPES.LOAD_ADAPTATION_PURPOSE}
            persist={"api/AdaptationPurpose/AddOrUpdate"}
          />
          <SelectComponent
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            options={sector}
            setSelectedValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_SECTOR}
            parentId={details.AdaptationDetailId}
            // dispatch={ACTION_TYPES.LOAD_SECTOR}
            // persist={"api/Sector/AddOrUpdate"}
          />
        </div>

        <br />
        <hr />
      </div>
    )
  }
}

export default connect(mapStateToProps)(AdaptationDetailsItem)