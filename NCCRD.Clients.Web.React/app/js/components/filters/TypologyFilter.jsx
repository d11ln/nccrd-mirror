'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { LOAD_TYPOLOGY } from "../../constants/action-types"
import { apiBaseURL } from "../../constants/apiBaseURL";

const mapStateToProps = (state, props) => {
    let { lookupData: { typology } } = state
    return { typology }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_TYPOLOGY, payload })
        }
    }
}

class TypologyFilter extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

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

    typologyOptions() {

        const { typology } = this.props
        let ar = [{ value: "0", label: "Not selected" }]

        if (typeof typology !== 'undefined') {
            for (let i of typology) {
                ar.push({ value: i.TypologyId, label: i.Value })
            }
        }

        return ar
    }

    render() {

        return (
            <div className="col-md-4" id="filterTypology">
                <label>Typology:</label>
                <br />
                <Select style={{ marginTop: "3px" }}
                    name="selFilterTypology"
                    value="0"
                    options={this.typologyOptions()}
                />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypologyFilter)