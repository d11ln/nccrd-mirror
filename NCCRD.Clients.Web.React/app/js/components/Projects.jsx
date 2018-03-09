'use strict'

import React from 'react'
import ProjectList from './ProjectList.jsx'

class Projects extends React.Component {

    constructor(props) {
        super(props);
        
    }
    onComponentDidMount() {

    }

    render() {
        return (
          <ProjectList/>
        )
    }
}

export default Projects