'use strict'

import React from 'react'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import ReactTooltip from 'react-tooltip'

const mapStateToProps = (state, props) => {
  let { lookupData: { adaptationPurpose, sector, sectorTree, sectorType, typology } } = state
  return { adaptationPurpose, sector, sectorTree, sectorType, typology }
}

class AdaptationDetailsItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { details, adaptationPurpose, sector, sectorTree, sectorType, typology } = this.props

    return (
      <>
        <br />

        <div className="row">

          <TextAreaComponent
            col="col-md-12"
            label="Description:"
            id="txtAdaptationDescription"
            value={details.Description}
            setValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_DESCR}
            parentId={details.AdaptationDetailId}
          />

        </div>

        <br />

        <div className="row">

          <SelectComponent
            id="selAdaptationPurpose"
            col="col-md-4"
            label="Purpose:"
            readOnly="true"
            selectedValue={details.AdaptationPurposeId}
            data={adaptationPurpose}
            setSelectedValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_PURPOSE}
            parentId={details.AdaptationDetailId}
            dispatch={ACTION_TYPES.LOAD_ADAPTATION_PURPOSE}
            persist={"api/AdaptationPurpose/AddOrUpdate"}
            allowEdit={true}
            newItemTemplate={{
              "AdaptationPurposeId": 0,
              "Value": "",
              "Description": ""
            }}
          />

          <SelectComponent
            id="selAdaptationSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            treeData={sectorTree}
            setSelectedValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_SECTOR}
            parentId={details.AdaptationDetailId}
            dispatch={ACTION_TYPES.LOAD_SECTOR}
            persist="api/Sector/AddOrUpdate"
            type="tree"
            dependencies={[
              { key: "SectorTypeId", value: sectorType },
              { key: "ParentSectorId", value: sector },
              { key: "TypologyId", value: typology }
            ]}
            allowEdit={false}
            newItemTemplate={{
              "SectorId": 0,
              "Value": "",
              "SectorTypeId": 0,
              "ParentSectorId": 0,
              "TypologyId": 0
            }}
          />

        </div>

        <br />
        <hr />

        <ReactTooltip />
      </>
    )
  }
}

export default connect(mapStateToProps)(AdaptationDetailsItem)