import React from 'react'
import { Button, Collapse, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen } from '../../../config/colours.cfg'

//Filters
import GeneralFilters from './GeneralFilters.jsx';
import RegionFilters from './RegionFilters.jsx';
import SectorFilters from './SectorFilters.jsx';

const mapStateToProps = (state, props) => {
  let { filterData: { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, favoritesFilter } } = state
  let { lookupData: { projectStatus, typology, sector, region } } = state
  return {
    titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, projectStatus, typology, sector, region,
    favoritesFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearFilters: payload => {
      dispatch({ type: "CLEAR_FILTERS", payload })
    },
    clearTitleFilter: () => {
      dispatch({ type: "LOAD_TITLE_FILTER", payload: "" })
    },
    clearStatusFilter: () => {
      dispatch({ type: "LOAD_STATUS_FILTER", payload: { id: 0, value: 0 } })
    },
    clearTypologyFilter: () => {
      dispatch({ type: "LOAD_TYPOLOGY_FILTER", payload: { id: 0, value: 0 } })
    },
    clearRegionFilter: () => {
      dispatch({ type: "LOAD_REGION_FILTER", payload: 0 })
    },
    clearSectorFilter: () => {
      dispatch({ type: "LOAD_SECTOR_FILTER", payload: 0 })
    },
    toggleFavorites: async payload => {
      dispatch({ type: "TOGGLE_FAVS_FILTER", payload })
    }
  }
}

class ProjectFilters extends React.Component {

  constructor(props) {
    super(props);
    this.renderFilterChips = this.renderFilterChips.bind(this)

  }

  renderFilterChips() {

    let {
      titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, projectStatus, typology, sector, region,
      favoritesFilter
    } = this.props
    let filterChips = []

    if (titleFilter !== "" || statusFilter !== 0 || typologyFilter !== 0 || sectorFilter !== 0 || regionFilter !== 0 ||
      favoritesFilter === true) {
        
      if (favoritesFilter === true) {
        filterChips.push(
          <div className="chip" key="favsFilterChip" style={{ backgroundColor: DEAGreen }}>
            {"Favorites"}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("favs")}></i>
          </div>
        )
      }

      if (titleFilter !== "") {
        filterChips.push(
          <div className="chip" key="titleFilterChip" style={{ backgroundColor: DEAGreen }}>
            {"Title: " + titleFilter}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("title")}></i>
          </div>
        )
      }

      if (statusFilter > 0 && projectStatus.length > 0) {
        filterChips.push(
          <div className="chip" key="statusFilterChip" style={{ backgroundColor: DEAGreen }}>
            {"Status: " + projectStatus.filter(x => x.ProjectStatusId === parseInt(statusFilter))[0].Value}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("status")}></i>
          </div>
        )
      }

      if (typologyFilter > 0 && typology.length > 0) {
        filterChips.push(
          <div className="chip" key="typologyFilterChip" style={{ backgroundColor: DEAGreen }}>
            {"Typology: " + typology.filter(x => x.TypologyId === parseInt(typologyFilter))[0].Value}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("typology")}></i>
          </div>
        )
      }

      if (regionFilter > 0 && region.length > 0) {

        filterChips.push(
          <div className="chip" key="regionFilterChip" style={{ backgroundColor: DEAGreen }}>
            {"Region: " + region.filter(x => x.Id == regionFilter)[0].Text}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("region")}></i>
          </div>
        )
      }

      if (sectorFilter > 0 && sector.length > 0) {
        filterChips.push(
          <div className="chip" key="sectorFilterChip" style={{ backgroundColor: DEAGreen }}>
            {"Sector: " + sector.filter(x => x.Id == sectorFilter)[0].Text}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("sector")}></i>
          </div>
        )
      }
    }
    else {
      filterChips.push(<p key="naf">No Filters Appied.</p>)
    }

    return filterChips
  }

  deleteFilterChip(type) {

    switch (type) {

      case "title":
        this.props.clearTitleFilter()
        break

      case "status":
        this.props.clearStatusFilter()
        break

      case "typology":
        this.props.clearTypologyFilter()
        break

      case "region":
        this.props.clearRegionFilter()
        break

      case "sector":
        this.props.clearSectorFilter()
        break

      case "favs":
        this.props.toggleFavorites()
        break
    }
  }

  render() {

    return (

      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h4 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>Current Filters</b>
        </h4>
        <Button
          size="sm"
          color="white"
          style={{
            border: "0px solid gainsboro",
            boxShadow: "none",
            borderRadius: "7px",
            float: "right",
            marginTop: "8px",
            marginRight: "15px",
            padding: "2px",
          }}
          onClick={() => { this.props.clearFilters("") }}
        >
          <Fa icon="trash-o" size="2x" style={{ color: DEAGreen }} />
        </Button>

        <hr />

        <div style={{ padding: "10px 20px 10px 20px" }}>
          {this.renderFilterChips()}
        </div>

      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilters)