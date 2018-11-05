import React from 'react'
import { Button, Collapse } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen } from '../../../config/colours.cfg'

//Filters
import GeneralFilters from './GeneralFilters.jsx';
import RegionFilters from './RegionFilters.jsx';
import SectorFilters from './SectorFilters.jsx';

const mapStateToProps = (state, props) => {
  let { filterData: { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter } } = state
  let { lookupData: { projectStatus, typology, sector, region } } = state
  return { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, projectStatus, typology, sector, region }
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
    }
  }
}

class ProjectFilters extends React.Component {

  constructor(props) {
    super(props);
    this.toggleGeneral = this.toggleGeneral.bind(this);
    this.toggleRegion = this.toggleRegion.bind(this);
    this.toggleSector = this.toggleSector.bind(this);
    this.clearFilters = this.clearFilters.bind(this)
    this.renderFilterChips = this.renderFilterChips.bind(this)

    this.state = {
      collapseGeneral: false,
      collapseRegion: false,
      collapseSector: false,
    };
  }

  toggleGeneral() {
      this.setState({ collapseGeneral: !this.state.collapseGeneral });
  }

  toggleRegion() {
    this.setState({ collapseRegion: !this.state.collapseRegion });
  }

  toggleSector() {
    this.setState({ collapseSector: !this.state.collapseSector });
  }

  getBottonColor(state) {

    if (state === true) {
      return DEAGreen
    }
    else {
      return "grey"
    }
  }

  clearFilters() {

    let { clearFilters } = this.props
    clearFilters("")

    location.hash = "/projects"
  }

  renderFilterChips() {

    let { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, projectStatus, typology, sector, region } = this.props
    let filterChips = []

    if (titleFilter !== "" || statusFilter !== 0 || typologyFilter !== 0 || sectorFilter !== 0 || regionFilter !== 0) {

      // filterChips.push(<br key="br" />)

      if (titleFilter !== "") {
        filterChips.push(
          <div className="chip blue lighten-1" key="titleFilterChip">
            {"Title: " + titleFilter}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("title")}></i>
          </div>
        )
      }

      if (statusFilter > 0 && projectStatus.length > 0) {
        filterChips.push(
          <div className="chip blue lighten-1" key="statusFilterChip">
            {"Status: " + projectStatus.filter(x => x.ProjectStatusId === parseInt(statusFilter))[0].Value}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("status")}></i>
          </div>
        )
      }

      if (typologyFilter > 0 && typology.length > 0) {
        filterChips.push(
          <div className="chip blue lighten-1" key="typologyFilterChip">
            {"Typology: " + typology.filter(x => x.TypologyId === parseInt(typologyFilter))[0].Value}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("typology")}></i>
          </div>
        )
      }

      if (regionFilter > 0 && region.length > 0) {

        filterChips.push(
          <div className="chip blue lighten-1" key="regionFilterChip">
            {"Region: " + region.filter(x => x.Id == regionFilter)[0].Text}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("region")}></i>
          </div>
        )
      }

      if (sectorFilter > 0 && sector.length > 0) {
        filterChips.push(
          <div className="chip blue lighten-1" key="sectorFilterChip">
            {"Sector: " + sector.filter(x => x.Id == sectorFilter)[0].Text}
            <i className="close fa fa-times" onClick={() => this.deleteFilterChip("sector")}></i>
          </div>
        )
      }
    }
    else {
      filterChips.push(<div key="br" />)
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
    }
  }

  render() {

    return (
      <div style={{ marginLeft: "0px", marginRight: "0px", backgroundColor: "white" }}>

        <div className="row" style={{ marginBottom: "-25px", marginTop: "10px" }}>
          <div className="col-md-12">
            {this.renderFilterChips()}
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-3">
            <Button block color="" className="btn-sm" onClick={this.toggleGeneral} style={{ marginBottom: "2px", backgroundColor: this.getBottonColor(this.state.collapseGeneral) }}>General filters</Button>
          </div>

          <div className="col-md-3">
            <Button block color="" className="btn-sm" onClick={this.toggleRegion} style={{ marginBottom: "2px", backgroundColor: this.getBottonColor(this.state.collapseRegion) }} >Region filters</Button>
          </div>

          <div className="col-md-3">
            <Button block color="" className="btn-sm" onClick={this.toggleSector} style={{ marginBottom: "2px", backgroundColor: this.getBottonColor(this.state.collapseSector) }} >Sector filters</Button>
          </div>

          <div className="col-md-3">
            <Button block color="secondary" className="btn-sm" onClick={this.clearFilters} style={{ marginBottom: "2px" }}>
              <i className="fa fa-eraser" aria-hidden="true"></i>&nbsp;&nbsp;Clear filters
              </Button>
          </div>
        </div>

        <hr />

        <Collapse isOpen={this.state.collapseGeneral} >
          <GeneralFilters />
          <hr />
        </Collapse>

        <Collapse isOpen={this.state.collapseRegion}>
          <RegionFilters />
          <hr />
        </Collapse>

        <Collapse isOpen={this.state.collapseSector}>
          <SectorFilters />
          <hr />
        </Collapse>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilters)