'use strict'

import React from 'react'
import ProjectList from './ProjectList.jsx'
import ProjectFilters from './ProjectFilters.jsx'

class Projects extends React.Component {

    constructor(props) {
        super(props);
        
    }
    onComponentDidMount() {

    }

    render() {
        return (
          <div>
            <ProjectFilters />
            <ProjectList />
          </div>
        )
    }
}

export default Projects