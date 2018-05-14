'use strict'

import React from 'react'

class LoggedOut extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                <div>
                    <br />
                    <label>&nbsp;You are now logged out.</label>
                </div>
            </>
        )
    }
}

export default LoggedOut