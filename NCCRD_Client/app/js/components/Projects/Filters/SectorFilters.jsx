'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL";
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import ReactTooltip from 'react-tooltip'
import { UILookup } from '../../../constants/ui_config';

//AntD Tree
import Tree from 'antd/lib/tree'
import '../../../../css/antd.tree.css' //Overrides default antd.tree css
const TreeNode = Tree.TreeNode

const _gf = require("../../../globalFunctions")
const queryString = require('query-string')
const o = require("odata")

const mapStateToProps = (state, props) => {
    let { lookupData: { sectorTree, sector } } = state
    let { filterData: { sectorFilter } } = state
    return { sectorTree, sectorFilter, sector }
}

const mapDispatchToProps = (dispatch) => {
    return {
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

        this.expandAllNodes = this.expandAllNodes.bind(this)
        this.collapseAllNodes = this.collapseAllNodes.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onExpand = this.onExpand.bind(this)

        //Set initial local
        this.state = { expandedKeys: [] }

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.sector !== 'undefined') {

            //Dispatch to store
            let { loadSectorFilter } = this.props
            loadSectorFilter(parsedHash.sector)
            _gf.stripURLParam("sector=" + parsedHash.sector)
        }
    }

    componentDidMount() {

        let { loadSectors } = this.props

        //Get data
        var oHandler = o(apiBaseURL + "Sector")
            .orderBy("Value")

        oHandler.get(function (data) {
            loadSectors(data)
        }, function (error) {
            console.error(error)
        })
    }

    expandAllNodes() {
        let expandedKeys = []
        let { sector } = this.props

        sector.map(x => expandedKeys.push(x.SectorId.toString()))

        this.setState({ expandedKeys: expandedKeys })
    }

    collapseAllNodes() {
        this.setState({ expandedKeys: [] })
    }

    transformDataToTree(data) {

        let tree = []

        data.filter(x => x.SectorTypeId === 1).map(p => {

            //Districts
            let districtChildren = []
            data.filter(px => px.ParentSectorId === p.SectorId && px.SectorTypeId === 2).map(d => {

                //Municipalities
                let municipalityChildren = []
                data.filter(dx => dx.ParentSectorId === d.SectorId && dx.SectorTypeId === 3).map(m => {
                    municipalityChildren.push({ id: m.SectorId, text: m.Value })
                })

                //Add District
                districtChildren.push({ id: d.SectorId, text: d.Value, children: municipalityChildren })
            })

            //Add Province
            tree.push({ id: p.SectorId, text: p.Value, children: districtChildren })
        })

        return tree
    }

    renderTreeNodes(data) {

        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} />
        })
    }

    onSelect(selectedKeys, info) {

        let { loadSectorFilter } = this.props
        let id = selectedKeys[0]

        if (typeof id === 'undefined') {
            id = 0
        }

        loadSectorFilter(id)
    }

    getParentKeys(id, data) {

        let parentKeys = []

        if (data.length > 0 && id > 0) {

            let idKey = Object.keys(data[0])[0].toString()
            let parentIdKey = "Parent" + idKey

            let selectedItem = data.filter(x => x[idKey] == id)[0]

            if (selectedItem[parentIdKey] !== null) {
                let parentId = selectedItem[parentIdKey].toString()
                parentKeys.push(parentId)
                parentKeys.push(...this.getParentKeys(parentId, data))
            }
        }

        return parentKeys
    }

    onExpand(expandedKeys) {
        this.setState({ expandedKeys: expandedKeys })
    }

    render() {

        let { sector, sectorFilter } = this.props
        let { expandedKeys } = this.state
        let selectedValue = "All"
        //let treeData = typeof sectorTree.dataSource === 'undefined' ? [] : sectorTree.dataSource

        if (sectorFilter > 0 && sector.length > 0) {
            selectedValue = sector.filter(x => x.SectorId === parseInt(sectorFilter))[0].Value
        }

        let uiconf = UILookup("treeSectorFilter", "Sector filter:")

        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <label data-tip={uiconf.tooltip} style={{ fontSize: "large" }}>{uiconf.label}&nbsp;&nbsp;</label>
                        <label data-tip={uiconf.tooltip2} style={{ fontSize: "large", fontWeight: "bold" }}>{selectedValue}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Button color="secondary" size="sm" id="btnRegionTreeExpandAll" style={{ marginLeft: "0px" }} onClick={this.expandAllNodes} >
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Expand all
                        </Button>
                        <Button color="secondary" size="sm" id="btnRegionTreeCollapseAll" onClick={this.collapseAllNodes}>
                            <i className="fa fa-minus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Collapse all
                        </Button>
                    </div>
                </div>

                <Tree key={_gf.GetUID()}
                    autoExpandParent
                    onSelect={this.onSelect}
                    defaultSelectedKeys={[sectorFilter.toString()]}
                    defaultExpandedKeys={[...expandedKeys, ...this.getParentKeys(sectorFilter, sector), sectorFilter.toString()]}
                    onExpand={this.onExpand}
                >
                    {this.renderTreeNodes(this.transformDataToTree(sector))}
                </Tree>

            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectorFilters)