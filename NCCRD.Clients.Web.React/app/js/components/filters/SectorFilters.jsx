'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { apiBaseURL } from "../../constants/apiBaseURL";
import { connect } from 'react-redux'
import { LOAD_SECTOR_TREE } from "../../constants/action-types"

const mapStateToProps = (state, props) => {
    let { lookupData: { sectorTree } } = state
    return { sectorTree }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_SECTOR_TREE, payload })
        }
    }
}

class SectorFilters extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let { loadData } = this.props
        fetch(apiBaseURL + 'api/sector/GetAllTree', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                loadData(res)
            })  
    }

    fillTree() {

        const { sectorTree } = this.props
        $('#sectorTree').tree(sectorTree);
    }

    render() {

        this.fillTree()

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ fontSize: "large" }}>Sector filters:</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" key="sectorTree" id="sectorTree">
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectorFilters)