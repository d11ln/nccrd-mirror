import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../../config/serviceURLs.cfg"
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { UILookup } from '../../../config/ui_config.js'

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

        this.expandAllNodes = this.expandAllNodes.bind(this)
        this.collapseAllNodes = this.collapseAllNodes.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onExpand = this.onExpand.bind(this)

        //Set initial local
        this.state = { expandedKeys: [] }

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.region !== 'undefined') {

            //Dispatch to store
            let { loadRegionFilter } = this.props
            loadRegionFilter(parsedHash.region)
            _gf.stripURLParam("region=" + parsedHash.region)
        }
    }

    componentDidMount() {

        //Load data
        let { loadRegions } = this.props

        //Get data
        var oHandler = o(apiBaseURL + "Regions")
            .select("RegionId,RegionName,LocationTypeId,ParentRegionId")
            .orderBy("RegionName")

        oHandler.get(function (data) {
            loadRegions(data)
        }, function (error) {
            console.error(error)
        })
    }

    expandAllNodes() {
        let expandedKeys = []
        let { region } = this.props

        region.map(x => expandedKeys.push(x.RegionId.toString()))

        this.setState({ expandedKeys: expandedKeys })
    }

    collapseAllNodes() {
        this.setState({ expandedKeys: [] })
    }

    transformDataToTree(data) {

        let tree = []

        data.filter(x => x.LocationTypeId === 4).map(p => {

            //Districts
            let districtChildren = []
            data.filter(px => px.ParentRegionId === p.RegionId && px.LocationTypeId === 3).map(d => {

                //Municipalities
                let municipalityChildren = []
                data.filter(dx => dx.ParentRegionId === d.RegionId && dx.LocationTypeId === 2).map(m => {
                    municipalityChildren.push({ id: m.RegionId, text: m.RegionName })
                })

                //Add District
                districtChildren.push({ id: d.RegionId, text: d.RegionName, children: municipalityChildren })
            })

            //Add Province
            tree.push({ id: p.RegionId, text: p.RegionName, children: districtChildren })
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

        let { loadRegionFilter } = this.props
        let id = selectedKeys[0]

        if (typeof id === 'undefined') {
            id = 0
        }

        loadRegionFilter(id)
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

        let { region, regionFilter } = this.props
        let { expandedKeys } = this.state
        let selectedValue = "All"

        if (regionFilter > 0 && region.length > 0) {
            selectedValue = region.filter(x => x.RegionId === parseInt(regionFilter))[0].RegionName
        }

        let uiconf = UILookup("treeRegionFilter", "Region filter:")

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
                    defaultSelectedKeys={[regionFilter.toString()]}
                    defaultExpandedKeys={[...expandedKeys, ...this.getParentKeys(regionFilter, region), regionFilter.toString()]}
                    onExpand={this.onExpand}
                >
                    {this.renderTreeNodes(this.transformDataToTree(region))}
                </Tree>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionFilters)