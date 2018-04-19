'use strict'

import React from 'react'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import TextAreaComponent from '../../Shared/TextAreaComponent.jsx'
import SelectComponent from '../../Shared/SelectComponent.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import ReactTooltip from 'react-tooltip'

//AntD Tree-Select
import TreeSelect from 'antd/lib/tree-select'
import '../../../../css/antd.tree-select.css' //Overrides default antd.tree-select css
import '../../../../css/antd.select.css' //Overrides default antd.select css
const TreeNode = TreeSelect.TreeNode;

const mapStateToProps = (state, props) => {
  let { lookupData: { adaptationPurpose, sector, sectorTree, sectorType, typology } } = state
  return { adaptationPurpose, sector, sectorTree, sectorType, typology }
}

class AdaptationDetailsItem extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    //Set initial state
    this.state = {
      value: undefined,
      treeData: {}
    }
  }

  onChange(value) {
      console.log(arguments);
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

  deepMorph(parent) {
    if (parent instanceof Array) {
        return parent.map(value => {
          if(value.children){
            return (
              <TreeNode value={value.text || 'test'} title={value.text} key={value.id || 0}>
                {value.children ? this.deepMorph(value.children) : <></>}
              </TreeNode>
            )
          } else {
            return (
              <TreeNode value={value.text || 'test'} title={value.text} key={value.id || 0}/>
            )
          }
        })
    }
    else {
        return (
          <TreeNode value={parent.text || 'test'} title={parent.text} key={parent.id || 0}/>
        )
    }
}

  render() {

    let { details, adaptationPurpose, sector, sectorTree, sectorType, typology } = this.props
    let tree = (<div></div>)
    if(this.state.treeData !== undefined){
      tree = this.deepMorph(this.state.treeData)
    }
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
          <div className='d-flex flex-column-reverse pb-1'>
            <TreeSelect
              showSearch
              label= "Sector:"
              style={{ width: 300 }}
              value={this.state.value}
              dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
              placeholder="Select Sector"
              allowClear
              onChange={this.onChange}
              >
              {
                tree
              }
            </TreeSelect>
          </div>

          <SelectComponent
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
              { key: "SectorTypeId", value: sectorType },
              { key: "ParentSectorId", value: sector },
              { key: "TypologyId", value: typology }
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

        <ReactTooltip />
      </>
    )
  }
}

export default connect(mapStateToProps)(AdaptationDetailsItem)