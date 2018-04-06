'use strict'

import React from 'react'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../constants/action-types"

const mapStateToProps = (state, props) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthenticated: payload => {
            dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload })
        }
    }
}

class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      Promise.all([ this.props.setAuthenticated(false) ]).then(location.hash = "/")
    }

    render() {

        return (
            <div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)