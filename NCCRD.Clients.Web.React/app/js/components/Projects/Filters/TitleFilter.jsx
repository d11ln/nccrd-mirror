'use strict'

import React from 'react'
import { Button, Input, FormInline } from 'mdbreact'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import { UILookup } from '../../../constants/ui_config';
import { stripURLParam } from "../../../globalFunctions.js"

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { filterData: { titleFilter, titleFilterInternal } } = state
    return { titleFilter, titleFilterInternal }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTitleFilter: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TITLE_FILTER, payload })
        },
        loadTitleFilterInternal: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TITLE_FILTER_INTERNAL, payload })
        }
    }
}

class TitleFilter extends React.Component {

    constructor(props) {
        super(props);

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))

        if (typeof parsedHash.title !== 'undefined') {

            //Update internal state
            this.onTouchTap(parsedHash.title)
            stripURLParam("title=" + parsedHash.title)
        }
    }

    onChange(event) {

        //Update internal state
        this.props.loadTitleFilterInternal(event.target.value)
    }

    onTouchTap(filterValue, e) {

        //Update global state
        let { loadTitleFilter, titleFilterInternal } = this.props

        loadTitleFilter(filterValue)
    }

    render() {

        let { titleFilterInternal } = this.props

        let uiconf = UILookup("txtTitleFilter", "Title:")

        return (
            <div className="col-md-4">
                <label data-tip={uiconf.tooltip} style={{ fontWeight: "bold" }}>{uiconf.label}</label>

                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td>
                                <Input size="sm" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: "100%", fontSize: "14px" }}
                                    onChange={this.onChange.bind(this)} value={titleFilterInternal} />
                            </td>
                            <td style={{width: "1px"}}>
                                <Button
                                    color="primary"
                                    size="sm"
                                    style={{ height: "32px", marginTop: "-14px", marginRight: "0px" }}
                                    onTouchTap={this.onTouchTap.bind(this, titleFilterInternal)} >
                                    Apply
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleFilter)