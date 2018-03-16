'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { LOAD_TYPOLOGY, LOAD_TYPOLOGY_FILTER } from "../../constants/action-types"
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
            dispatch({ type: LOAD_TYPOLOGY, payload })
        },
        loadTypologyFilter: payload => {
            dispatch({ type: LOAD_TYPOLOGY_FILTER, payload })
        }
    }
}

class TypologyFilter extends React.Component {

    constructor(props) {
        super(props);
        this.selectCallbackHandler = this.selectCallbackHandler.bind(this)

        //Set initial local
        this.state = { typologyFilter: 0 }

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.typology !== 'undefined') {

            //Update local state
            this.state = { typologyFilter: parsedHash.typology }

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

    selectCallbackHandler(selectedValue) {

        if (selectedValue !== this.state.typologyFilter) {
            //Update local state
            this.setState({ typologyFilter: selectedValue })

            //Dispatch to store
            let { loadTypologyFilter } = this.props
            loadTypologyFilter(selectedValue)
        }
    }

    render() {

        let { typologyFilter } = this.state

        return (
            <SelectComponent col="col-md-4" label="Typology:" readOnly="false" value={typologyFilter} options={this.props.typology}
                selectCallback={this.selectCallbackHandler}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypologyFilter)