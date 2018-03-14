'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { LOAD_PROJECT_STATUS } from "../../constants/action-types"
import { apiBaseURL } from "../../constants/apiBaseURL";
import SelectComponent from '../SelectComponent.jsx'

const mapStateToProps = (state, props) => {
    let { lookupData: { projectStatus } } = state
    return { projectStatus }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_PROJECT_STATUS, payload })
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

    render() {

        return (
            <SelectComponent col="col-md-4" label="Status:" readOnly="false" value={0} options={this.props.projectStatus} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter)