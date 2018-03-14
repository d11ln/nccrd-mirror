'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../constants/apiBaseURL";
import { connect } from 'react-redux'
import { LOAD_REGION_TREE } from "../../constants/action-types"

const mapStateToProps = (state, props) => {
    let { lookupData: { regionTree } } = state
    return { regionTree }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_REGION_TREE, payload })
        }
    }
}

class RegionFilters extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

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

    fillTree() {

        const { regionTree } = this.props
        $('#regionTree').tree(regionTree);
    }

    render() {

        this.fillTree()

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ fontSize: "large" }}>Region filters:</p>
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
                    <div className="col-md-12" key="regionTree" id="regionTree">
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionFilters)