import React from 'react'
import { vmsBaseURL } from "../../../config/serviceURLs.js"
import { connect } from 'react-redux'
import CascaderSelectComponent from '../../Shared/CascaderSelectComponent.jsx'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'

const mapStateToProps = (state, props) => {
  let { lookupData: { sectorTree, sector } } = state
  let { filterData: { sectorFilter } } = state
  return { sectorTree, sectorFilter, sector }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSectorFilter: payload => {
      dispatch({ type: "LOAD_SECTOR_FILTER", payload })
    },
    loadSectors: payload => {
      dispatch({ type: "LOAD_SECTOR", payload })
    }
  }
}

class SectorFilters extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    let { loadSectors, sector } = this.props

    if (sector.length === 0) {
      //Get data
      try {
        let res = await fetch(vmsBaseURL + "Sectors/flat")

        if (res.ok) {
          res = await res.json()

          if (res.items && res.items.length > 0) {
            let data = res.items
            loadSectors(data)
          }
        }
      }
      catch (ex) {
        console.error(ex)
      }
    }
  }

  render() {

    let { sector, sectorFilter } = this.props

    return (
      <>
        <TreeSelectComponent
          col="col-md-2"
          id="treeSectorFilter"
          label="Sector"
          selectedValue={sectorFilter}
          data={sector}
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
          setSelectedValueKey="LOAD_SECTOR_FILTER"
        />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectorFilters)