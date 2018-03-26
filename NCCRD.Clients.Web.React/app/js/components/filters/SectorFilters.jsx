'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../constants/apiBaseURL";
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../constants/action-types"

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { lookupData: { sectorTree, sector } } = state
    let { filterData: { sectorFilter } } = state
    return { sectorTree, sectorFilter, sector }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR_TREE, payload })
        },
        loadSectorFilter: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR_FILTER, payload })
        },
        loadSectors: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR, payload })
        }
    }
}

class SectorFilters extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this)
        this.fillTree = this.fillTree.bind(this)
        this.expandAllNodes = this.expandAllNodes.bind(this)
        this.collapseAllNodes = this.collapseAllNodes.bind(this)

        //Set initial local
        this.state = { eventsAdded: 0 }

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.sector !== 'undefined') {

            //Dispatch to store
            let { loadSectorFilter } = this.props
            loadSectorFilter(parsedHash.sector)
        }
    }

    componentDidMount() {

        let { loadData, loadSectors } = this.props
        fetch(apiBaseURL + 'api/sector/GetAllTree', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                loadData(res)
            })

        fetch(apiBaseURL + 'api/Sector/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                loadSectors(res)
            })
    }

    onClick(tree, dispatch = true) {

        let selectedNodeId = tree.getSelections()[0]
        let { loadSectorFilter } = this.props

        if (typeof selectedNodeId !== 'undefined') {

            //Get node data
            let nodeData = tree.getDataById(selectedNodeId)

            //Dispatch to store
            if (dispatch === true) {
                loadSectorFilter(nodeData.id)
            }
        }
        else {

            if (dispatch === true) {

                //Dispatch to store
                loadSectorFilter(0)
            }
        }
    }

    fillTree() {

        const { sectorTree } = this.props

        if (typeof sectorTree.dataSource !== 'undefined') {

            $('#sectorTree').tree(sectorTree)

            //Setup tree events
            let tree = $('#sectorTree').tree()

            if (this.state.eventsAdded === 0 && typeof tree !== 'undefined') {
                this.state.eventsAdded = 1
                tree.on("click", () => this.onClick(tree))

                this.setSelectedNode(tree)
                this.onClick(tree, false)

                //Save tree to state - for later reference/use
                this.setState({ tree: tree })
            }

        }
    }

    componentDidUpdate() {
        this.fillTree()
    }

    setSelectedNode(tree) {

        //Get tree
        if (typeof tree !== 'undefined') {

            let { sectorTree, sectorFilter } = this.props

            if (typeof sectorTree.dataSource !== 'undefined' && typeof sectorFilter !== 'undefined' && sectorFilter !== 0) {

                let selectedSector = sectorTree.dataSource.find((item) => item.id.toString() === sectorFilter.toString());

                if (typeof selectedSector !== 'undefined') {
                    let selectNode = tree.getNodeByText(selectedSector.text)

                    if (typeof selectNode !== 'undefined') {
                        tree.select(selectNode)
                    }
                }
            }
        }
        else {
            return "All"
        }
    }

    expandAllNodes() {
        let { tree } = this.state
        if (typeof tree !== 'undefined') {
            tree.expandAll()
        }
    }

    collapseAllNodes() {
        let { tree } = this.state
        if (typeof tree !== 'undefined') {
            tree.collapseAll()
        }
    }

    render() {

        let { sector, sectorFilter } = this.props
        let selectedValue = "All"

        if (sectorFilter > 0 && sector.length > 0) {
            selectedValue = sector.filter(x => x.id === parseInt(sectorFilter))[0].value
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <label style={{ fontSize: "large" }}>Sector filters:&nbsp;&nbsp;</label>
                        <label style={{ fontSize: "large" }}>{selectedValue}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Button color="secondary" size="sm" id="btnRegionTreeExpandAll" style={{ marginLeft: "0px" }} onTouchTap={this.expandAllNodes} >
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Expand all
                        </Button>
                        <Button color="secondary" size="sm" id="btnRegionTreeCollapseAll" onTouchTap={this.collapseAllNodes}>
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