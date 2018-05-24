'use strict'

import React from 'react'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import ReactTooltip from 'react-tooltip'

const mapStateToProps = (state, props) => {
  let { lookupData: { adaptationPurpose, sector, sectorType, typology } } = state
  return { adaptationPurpose, sector, sectorType, typology }
}

class AdaptationDetailsItem extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange(value) {
    this.setState({ value });
  }

  componentDidMount() {
    fetch(apiBaseURL + 'api/sector/GetAllTree', {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        let { dataSource } = res
        this.setState({ treeData: dataSource })
      })
  }

  render() {

    let { details, adaptationPurpose, sector, sectorType, typology } = this.props
    
    return (
      <>
        {/* <br /> */}

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

          <TreeSelectComponent
            id="selAdaptationSector"
            col="col-md-4"
            label="Sector:"
            selectedValue={details.SectorId}
            data={sector}
            setSelectedValueKey={ACTION_TYPES.SET_ADAPTATION_DETAILS_SECTOR}
            parentId={details.AdaptationDetailId}
            dispatch={ACTION_TYPES.LOAD_SECTOR}
            persist="api/Sector/AddOrUpdate"
            type="tree"
            dependencies={[
              { key: "SectorTypeId", value: sectorType, type: "std" },
              { key: "ParentSectorId", value: sector, type: "tree" },
              { key: "TypologyId", value: typology, type: "std" }
            ]}
            allowEdit={true}
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
        <br />

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps)(AdaptationDetailsItem)