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
                    <div className="col-md-12" key="regionTree" id="regionTree">
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionFilters)