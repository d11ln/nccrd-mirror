'use strict'

import React from 'react'
import { Button } from 'mdbreact'

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props);
        
    }
    onComponentDidMount() {

    }

    render() {
        return (
          <div>
            <h2>Project Details: {this.props.match.params.id}</h2>
            <Button color="primary" className="btn-sm" onTouchTap={() => location.hash = "/projects"}>Back to list</Button>
          </div>
        )
    }
}

export default ProjectDetails