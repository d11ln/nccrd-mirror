import React from 'react'
import { Button } from 'mdbreact'
import { vmsBaseURL } from "../../../config/serviceURLs.cfg"
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { UILookup } from '../../../config/ui_config.js'
import TreeSelectComponent from "../../Shared/TreeSelectComponent.jsx"

//AntD Tree
import Tree from 'antd/lib/tree'
import '../../../../css/antd.tree.css' //Overrides default antd.tree css
const TreeNode = Tree.TreeNode

const _gf = require("../../../globalFunctions")
const queryString = require('query-string')
const o = require("odata")

const mapStateToProps = (state, props) => {
  let { lookupData: { regionTree, region } } = state
  let { filterData: { regionFilter } } = state
  return { regionTree, regionFilter, region }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRegionFilter: payload => {
      dispatch({ type: "LOAD_REGION_FILTER", payload })
    },
    loadRegions: payload => {
      dispatch({ type: "LOAD_REGION", payload })
    }
  }
}

class RegionFilters extends React.Component {

  constructor(props) {
    super(props);

    //Read initial filter from URL
    const parsedHash = queryString.parse(location.hash.substring(location.hash.indexOf("?"))) //queryString.parse(location.hash.replace("/projects?", ""))
    if (typeof parsedHash.region !== 'undefined') {

      //Dispatch to store
      let { loadRegionFilter } = this.props
      loadRegionFilter(parsedHash.region)
      _gf.stripURLParam("region=" + parsedHash.region)
    }
  }

  async componentDidMount() {

    //Load data
    let { loadRegions } = this.props

    //Get data
    try {
      let res = await fetch(vmsBaseURL + "Regions/flat")

      if (res.ok) {
        res = await res.json()

        if (res.items && res.items.length > 0) {
          let data = res.items
          loadRegions(data)
        }
      }
    }
    catch (ex) {
      console.error(ex)
    }
  }


  render() {

    let { region, regionFilter } = this.props

    return (
      <>
        <TreeSelectComponent
          col="col-md-2"
          id="treeRegionFilter"
          label="Region"
          selectedValue={regionFilter}
          data={region}
          editModeOverride={true}
          labelStyle={{
            fontSize: "14px",
            fontWeight: "400",
            color: "grey"
          }}
          style={{
            marginTop: "-4px",
            marginBottom: "15px"
          }}
          setSelectedValueKey="LOAD_REGION_FILTER"
        />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionFilters)