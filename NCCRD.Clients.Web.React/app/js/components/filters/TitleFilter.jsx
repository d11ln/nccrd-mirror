'use strict'

import React from 'react'
import { Button, Input } from 'mdbreact'
import { connect } from 'react-redux'
import { LOAD_TITLE_FILTER } from "../../constants/action-types";

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { filterData: { titleFilter } } = state

    return { titleFilter }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTitleFilter: payload => {
            dispatch({ type: LOAD_TITLE_FILTER, payload })
        }
    }
}

class TitleFilter extends React.Component {

    constructor(props) {
        super(props);

        //Set initial local
        this.state = {titleFilter: ""}

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.title !== 'undefined') {

            //Update local state
            this.state = {titleFilter: parsedHash.title}
            this.onTouchTap()
        }
    }

    onChange(event) {

        //Update local state
        this.setState({titleFilter: event.target.value})
    }

    onTouchTap() {  

        //Dispatch to store
        let { loadTitleFilter } = this.props
        loadTitleFilter(this.state.titleFilter)
    }

    render() {

        let { titleFilter } = this.state

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

                    <div style={{overflow: "hidden", paddingRight: "5px"}}>
                        <input type="text" style={{ marginTop: "-4px", fontSize: "14px", fontWeight: "300", width: "100%" }}
                            value={titleFilter} onChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleFilter)