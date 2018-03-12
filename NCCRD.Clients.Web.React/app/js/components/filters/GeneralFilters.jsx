'use strict'

import React from 'react'
import { Button } from 'mdbreact'

//Filters
import TitleFilter from './TitleFilter.jsx'
import StatusFilter from './StatusFilter.jsx'
import TypologyFilter from './TypologyFilter.jsx'

class GeneralFilters extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {


        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ fontSize: "large" }}>General filters:</p>
                    </div>
                </div>

                <div className="row">
                    <TitleFilter />
                    <StatusFilter />
                    <TypologyFilter />
                </div>

            </div>
        )
    }
}

export default GeneralFilters