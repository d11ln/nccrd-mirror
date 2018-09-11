import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import { apiBaseURL } from "../../../config/apiBaseURL.cfg"
import SelectComponent from '../../Shared/SelectComponent.jsx'

const _gf = require("../../../globalFunctions")
const queryString = require('query-string')
const o = require("odata")

const mapStateToProps = (state, props) => {
    let { lookupData: { projectStatus } } = state
    let { filterData: { statusFilter } } = state
    return { projectStatus, statusFilter }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: "LOAD_PROJECT_STATUS", payload })
        },
        loadStatusFilter: payload => {
            dispatch({ type: "LOAD_STATUS_FILTER", payload })
        }
    }
}

class StatusFilter extends React.Component {

    constructor(props) {
        super(props);

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))

        if (typeof parsedHash.status !== 'undefined') {

            //Dispatch to store
            let { loadStatusFilter } = this.props
            loadStatusFilter({ value: parsedHash.status })
            _gf.stripURLParam("status=" + parsedHash.status)
        }
    }

    componentDidMount() {

        //Load data
        let { loadData } = this.props

        //Get data
        var oHandler = o(apiBaseURL + "ProjectStatus")
            .select("ProjectStatusId,Value")
            .orderBy("Value")

        oHandler.get(function (data) {
            loadData(data)
        }, function (error) {
            console.error(error)
        })
    }

    render() {

        let { statusFilter } = this.props

        return (
            <SelectComponent
                id="selStatusFilter"
                col="col-md-4"
                label="Status:"
                selectedValue={statusFilter}
                data={this.props.projectStatus}
                setSelectedValueKey={"LOAD_STATUS_FILTER"}
                editModeOverride={true}
                allowEdit={false}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter)