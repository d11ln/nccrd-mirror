'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../constants/apiBaseURL";
import { connect } from 'react-redux'
import { LOAD_SECTOR_TREE } from "../../constants/action-types"

const mapStateToProps = (state, props) => {
  let { lookupData: { sectorTree } } = state
  return { sectorTree }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: payload => {
      dispatch({ type: LOAD_SECTOR_TREE, payload })
    }
  }
}

class SectorFilters extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    let { loadData } = this.props
    fetch(apiBaseURL + 'api/sector/GetAllTree', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(res => {
        loadData(res)
      })
  }

  fillTree() {

    const { sectorTree } = this.props
    $('#sectorTree').tree(sectorTree);
  }

  render() {

    this.fillTree()

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <p style={{ fontSize: "large" }}>Sector filters:</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Button color="secondary" size="sm" id="btnRegionTreeExpandAll" style={{ marginLeft: "0px" }}>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Expand all
                        </Button>
            <Button color="secondary" size="sm" id="btnRegionTreeCollapseAll">
              <i className="fa fa-minus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Collapse all
                        </Button>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-12" key="sectorTree" id="sectorTree">
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectorFilters)