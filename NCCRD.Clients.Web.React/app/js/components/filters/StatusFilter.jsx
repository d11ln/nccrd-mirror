'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { LOAD_REGIONS } from "../../constants/action-types"
import { apiBaseURL } from "../../constants/apiBaseURL";

const mapStateToProps = (state, props) => {
    let { lookupData: { projectStatus } } = state
    return { projectStatus }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_REGIONS, payload })
        }
    }
}

class StatusFilter extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        let { loadData } = this.props
        fetch(apiBaseURL + 'api/ProjectStatus/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                loadData(res)
            })
    }

    projectStatusOptions() {

        const { projectStatus } = this.props
        let ar = [{ value: "0", label: "Not selected" }]

        if (typeof projectStatus !== 'undefined') {
            for (let i of projectStatus) {
                ar.push({ value: i.ProjectStatusId, label: i.Value })
            }
        }

        return ar
    }

    render() {

        return (
            <div className="col-md-4" id="filterStatus">
                <label>Status:</label>
                <br />
                <Select style={{ marginTop: "3px" }}
                    name="selFilterStatus"
                    value="0"
                    options={this.projectStatusOptions()}
                />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter)