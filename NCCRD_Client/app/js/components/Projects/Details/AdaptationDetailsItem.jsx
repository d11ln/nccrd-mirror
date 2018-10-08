import React from 'react'
import { apiBaseURL } from "../../../config/serviceURLs.cfg"
import { connect } from 'react-redux'
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { DEAGreenDark } from '../../../config/colours.cfg'

const mapStateToProps = (state, props) => {
  let { lookupData: { adaptationPurpose, sector, sectorType, typology, hazards, projectStatus } } = state
  return { adaptationPurpose, sector, sectorType, typology, hazards, projectStatus }
}

class AdaptationDetailsItem extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {

    let { details, adaptationPurpose, sector, sectorType, typology, hazards, projectStatus } = this.props

    return (
      <>
        {/* <br /> */}

        <div className="row">

          <TextAreaComponent
            col="col-md-12"
            label="Description:"
            id="txtAdaptationDescription"
            value={details.Description}
            setValueKey={"SET_ADAPTATION_DETAILS_DESCR"}
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
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_PURPOSE"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_ADAPTATION_PURPOSE"}
            persist="AdaptationPurpose"
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
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_SECTOR"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_SECTOR"}
            persist="Sector"
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

          <TreeSelectComponent
            id="selAdaptationHazard"
            col="col-md-4"
            label="Hazard:"
            selectedValue={details.HazardId}
            data={hazards}
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_HAZARD"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_HAZARDS"}
            type="tree"
            allowEdit={false}
          />
        </div>
        <br />

        <div className="row">
          <SelectComponent
            id="selProjectStatus"
            col="col-md-4"
            label="Status:"
            selectedValue={details.ProjectStatusId}
            data={this.props.projectStatus}
            setSelectedValueKey={"SET_ADAPTATION_DETAILS_PROJECT_STATUS"}
            parentId={details.AdaptationDetailId}
            dispatch={"LOAD_PROJECT_STATUS"}
            persist="ProjectStatus"
            allowEdit={true}
            newItemTemplate={{
              "ProjectStatusId": 0,
              "Value": "",
              "Description": ""
            }}
          />
        </div>

        <br />
        <hr style={{ borderWidth: "2px", borderStyle: "solid", borderColor: DEAGreenDark }} />
        <br />

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps)(AdaptationDetailsItem)