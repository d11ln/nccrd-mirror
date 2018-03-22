'use strict'

import React from 'react'
import { Button, Collapse } from 'mdbreact'
import { connect } from 'react-redux'
import { Chip } from 'material-ui'
import {
    CLEAR_FILTERS, LOAD_TITLE_FILTER, LOAD_STATUS_FILTER, LOAD_TYPOLOGY_FILTER, LOAD_REGION_FILTER, LOAD_SECTOR_FILTER
} from "../constants/action-types"

//Filters
import GeneralFilters from './filters/GeneralFilters.jsx';
import RegionFilters from './filters/RegionFilters.jsx';
import SectorFilters from './filters/SectorFilters.jsx';

const mapStateToProps = (state, props) => {
    let { filterData: { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter } } = state
    let { lookupData: { projectStatus, typology, sector, region } } = state
    return { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, projectStatus, typology, sector, region }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearFilters: payload => {
            dispatch({ type: CLEAR_FILTERS, payload })
        },
        clearTitleFilter: () => {
            dispatch({ type: LOAD_TITLE_FILTER, payload: "" })
        },
        clearStatusFilter: () => {
            dispatch({ type: LOAD_STATUS_FILTER, payload: { id: 0, value: 0 }})
        },
        clearTypologyFilter: () => {
            dispatch({ type: LOAD_TYPOLOGY_FILTER, payload: { id: 0, value: 0 } })
        },
        clearRegionFilter: () => {
            dispatch({ type: LOAD_REGION_FILTER, payload: 0 })
        },
        clearSectorFilter: () => {
            dispatch({ type: LOAD_SECTOR_FILTER, payload: 0 })
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
            return "warning"
        }
        else {
            return "primary"
        }
    }

    clearFilters() {

        let { clearFilters } = this.props
        clearFilters("")

        location.hash = "/"
    }

    renderFilterChips() {

        let { titleFilter, statusFilter, typologyFilter, sectorFilter, regionFilter, projectStatus, typology, sector, region } = this.props
        let filterChips = []

        if (titleFilter !== "" || statusFilter !== 0 || typologyFilter !== 0 || sectorFilter !== 0 || regionFilter !== 0) {

            filterChips.push(<br key="br" />)

            if (titleFilter !== "") {
                filterChips.push(
                    <Chip
                        label={"Title: " + titleFilter}
                        onDelete={() => this.deleteFilterChip("title")}
                        style={{ backgroundColor: "#4285F4", marginRight: "5px" }}
                        key="titleFilterChip"
                    />
                )
            }

            if (statusFilter !== 0) {
                filterChips.push(
                    <Chip
                        label={"Status: " + projectStatus.filter(x => x.id === statusFilter )[0].value}
                        onDelete={() => this.deleteFilterChip("status")}
                        style={{ backgroundColor: "#4285F4", marginRight: "5px" }}
                        key="statusFilterChip"
                    />
                )
            }

            if (typologyFilter !== 0) {
                filterChips.push(
                    <Chip
                        label={"Typology: " + typology.filter(x => x.id === typologyFilter)[0].value}
                        onDelete={() => this.deleteFilterChip("typology")}
                        style={{ backgroundColor: "#4285F4", marginRight: "5px" }}
                        key="typologyFilterChip"
                    />
                )
            }

            if (regionFilter !== 0) {
                filterChips.push(
                    <Chip
                        label={"Region: " + region.filter(x => x.id === regionFilter)[0].value}
                        onDelete={() => this.deleteFilterChip("region")}
                        style={{ backgroundColor: "#4285F4", marginRight: "5px" }}
                        key="regionFilterChip"
                    />
                )
            }

            if (sectorFilter !== 0) {
                filterChips.push(
                    <Chip
                        label={"Sector: " + sector.filter(x => x.id === sectorFilter)[0].value}
                        onDelete={() => this.deleteFilterChip("sector")}
                        style={{ backgroundColor: "#4285F4", marginRight: "5px" }}
                        key="sectorFilterChip"
                    />
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
            <div>

                <div className="row">
                    <div className="col-md-12">
                        {this.renderFilterChips()}
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-3">
                        <Button block color={this.getBottonColor(this.state.collapseGeneral)} className="btn-sm" onTouchTap={this.toggleGeneral}>General filters</Button>
                    </div>

                    <div className="col-md-3">
                        <Button block color={this.getBottonColor(this.state.collapseRegion)} className="btn-sm" onTouchTap={this.toggleRegion} >Region filters</Button>
                    </div>

                    <div className="col-md-3">
                        <Button block color={this.getBottonColor(this.state.collapseSector)} className="btn-sm" onTouchTap={this.toggleSector} >Sector filters</Button>
                    </div>

                    <div className="col-md-3">
                        <Button block color="secondary" className="btn-sm" onTouchTap={this.clearFilters} >
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