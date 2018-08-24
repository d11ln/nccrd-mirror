'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL";
import SelectComponent from '../../Shared/SelectComponent.jsx'

const _gf = require("../../../globalFunctions")
const queryString = require('query-string')
const o = require("odata")

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
            loadTypologyFilter({ value: parsedHash.typology })
            _gf.stripURLParam("typology=" + parsedHash.typology)
        }
    }

    componentDidMount() {

        //Load data
        let { loadData } = this.props

        //Get data
        var oHandler = o(apiBaseURL + "Typology")
        .select("TypologyId,Value")
        .orderBy("Value")

        oHandler.get(function(data){
            loadData(data)
        }, function(error){
            console.error(error)
        })
    }

    render() {

        let { typologyFilter } = this.props

        return (
            <SelectComponent
                id="selTypologyFilter"
                col="col-md-4"
                label="Typology:"
                selectedValue={typologyFilter}
                data={this.props.typology}
                selectCallback={this.selectCallbackHandler}
                setSelectedValueKey={ACTION_TYPES.LOAD_TYPOLOGY_FILTER}
                editModeOverride={true}
                allowEdit={false}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypologyFilter)