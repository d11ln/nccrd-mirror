'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../constants/action-types"
import { apiBaseURL } from "../../constants/apiBaseURL";
import SelectComponent from '../SelectComponent.jsx'

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { lookupData: { typology } } = state
    let { filterData: { typologyFilter } } = state
    return { typology, typologyFilter }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TYPOLOGY, payload })
        },
        loadTypologyFilter: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TYPOLOGY_FILTER, payload })
        }
    }
}

class TypologyFilter extends React.Component {

    constructor(props) {
        super(props);

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.typology !== 'undefined') {

            //Dispatch to store
            let { loadTypologyFilter } = this.props
            loadTypologyFilter(parsedHash.typology)
        }
    }

    componentDidMount() {

        //Load data
        let { loadData } = this.props
        fetch(apiBaseURL + 'api/Typology/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                loadData(res)
            })
    }

    render() {

        let { typologyFilter } = this.props

        return (
            <SelectComponent 
                col="col-md-4" 
                label="Typology:" 
                selectedValue={typologyFilter} 
                options={this.props.typology}
                selectCallback={this.selectCallbackHandler}
                setSelectedValueKey={ACTION_TYPES.LOAD_TYPOLOGY_FILTER}
                editModeOverride={true}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypologyFilter)