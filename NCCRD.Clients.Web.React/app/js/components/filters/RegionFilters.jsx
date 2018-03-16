'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../constants/apiBaseURL";
import { connect } from 'react-redux'
import { LOAD_REGION_TREE, LOAD_REGION_FILTER } from "../../constants/action-types"

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { lookupData: { regionTree } } = state
    let { filterData: { regionFilter } } = state
    return { regionTree, regionFilter }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_REGION_TREE, payload })
        },
        loadRegionFilter: payload => {
            dispatch({ type: LOAD_REGION_FILTER, payload })
        }
    }
}

class RegionFilters extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this)
        this.fillTree = this.fillTree.bind(this)
        this.expandAllNodes = this.expandAllNodes.bind(this)
        this.collapseAllNodes = this.collapseAllNodes.bind(this)

        //Set initial local
        this.state = { regionFilter: 0, selectedValue: "All", eventsAdded: 0 }

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.region !== 'undefined') {

            //Update local state
            this.state = { ...this.state, regionFilter: parsedHash.region }

            //Dispatch to store
            let { loadRegionFilter } = this.props
            loadRegionFilter(parsedHash.region)
        }
    }

    componentDidMount() {

        //Load data
        let { loadData } = this.props
        fetch(apiBaseURL + 'api/region/GetAllTree', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                loadData(res)
            })
    }

    onClick(tree, dispatch = true) {

        let selectedNodeId = tree.getSelections()[0]
        let { loadRegionFilter } = this.props

        if (typeof selectedNodeId !== 'undefined') {

            //Get node data
            let nodeData = tree.getDataById(selectedNodeId)

            //Update internal state
            this.setState({ regionFilter: nodeData.id, selectedValue: nodeData.text })

            //Dispatch to store
            if (dispatch === true) {

                loadRegionFilter(nodeData.id)
            }
        }
        else {

            //Update internal state
            this.setState({ regionFilter: 0, selectedValue: "All" })

            if (dispatch === true) {

                //Dispatch to store
                loadRegionFilter(0)
            }
        }
    }

    fillTree() {

        const { regionTree } = this.props

        if (typeof regionTree.dataSource !== 'undefined') {

            $('#regionTree').tree(regionTree)

            //Setup tree events
            let tree = $('#regionTree').tree()

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

            let { regionTree, regionFilter } = this.props

            if (typeof regionTree.dataSource !== 'undefined' && typeof regionFilter !== 'undefined' && regionFilter !== 0) {

                let selectedRegion = regionTree.dataSource.find((item) => item.id.toString() === regionFilter.toString());

                if (typeof selectedRegion !== 'undefined') {
                    let selectNode = tree.getNodeByText(selectedRegion.text)

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

        let { regionFilter, selectedValue } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <label style={{ fontSize: "large" }}>Region filter:&nbsp;&nbsp;</label>
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
                    <div className="col-md-12" key="regionTree" id="regionTree">
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionFilters)