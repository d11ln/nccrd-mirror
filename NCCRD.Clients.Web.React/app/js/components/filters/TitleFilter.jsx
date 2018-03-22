'use strict'

import React from 'react'
import { Button, Input } from 'mdbreact'
import { connect } from 'react-redux'
import { LOAD_TITLE_FILTER, LOAD_TITLE_FILTER_INTERNAL } from "../../constants/action-types";

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { filterData: { titleFilter, titleFilterInternal } } = state
    return { titleFilter, titleFilterInternal }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTitleFilter: payload => {
            dispatch({ type: LOAD_TITLE_FILTER, payload })
        },
        loadTitleFilterInternal: payload => {
            dispatch({ type: LOAD_TITLE_FILTER_INTERNAL, payload })
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
            this.props.loadTitleFilterInternal(parsedHash.title)
            this.onTouchTap()
        }
    }

    onChange(event) {

        //Update internal state
        this.props.loadTitleFilterInternal(event.target.value)
    }

    onTouchTap() {

        //Update global state
        let { loadTitleFilter } = this.props
        loadTitleFilter(this.props.titleFilterInternal)
    }

    render() {

        let { titleFilterInternal } = this.props
        
        return (
            <div className="col-md-4">
                <label style={{ fontWeight: "bold" }}>Title:</label>
                <div className="md-form form-sm">

                    <Button
                        color="primary"
                        size="sm"
                        style={{ height: "35px", marginLeft: "3px", marginTop: "2px", float: "right" }}
                        onTouchTap={this.onTouchTap.bind(this)} >
                        Apply
                    </Button>

                    <div style={{ overflow: "hidden", paddingRight: "5px" }}>
                        <input type="text" style={{ marginTop: "-4px", fontSize: "14px", fontWeight: "300", width: "100%" }}
                            value={titleFilterInternal} onChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleFilter)