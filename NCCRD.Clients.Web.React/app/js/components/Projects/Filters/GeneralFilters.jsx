'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import ReactTooltip from 'react-tooltip'
import { UILookup } from '../../../constants/ui_config';

//Filters
import TitleFilter from './TitleFilter.jsx'
import StatusFilter from './StatusFilter.jsx'
import TypologyFilter from './TypologyFilter.jsx'

class GeneralFilters extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        let uiconf = UILookup("txtGeneralFilters", "General filters:")

        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <p data-tip={uiconf.tooltip} style={{ fontSize: "large" }}>{uiconf.label}</p>
                    </div>
                </div>

                <div className="row">
                    <TitleFilter />
                    <StatusFilter />
                    <TypologyFilter />
                </div>

                <ReactTooltip />
            </>
        )
    }
}

export default GeneralFilters