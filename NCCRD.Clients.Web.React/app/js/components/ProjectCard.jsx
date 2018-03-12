'use strict'

import React from 'react'
import { Card, CardBody, CardText, CardTitle, Button } from 'mdbreact'

class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
        
    }
    onComponentDidMount() {

    }

    render() {
      return (
        <div>
          <Card>
            <CardBody>
              <CardTitle>{this.props.ptitle}</CardTitle>
              <CardText>{this.props.pdes}</CardText>
              <Button color="primary" className="btn-sm" onTouchTap={() => location.hash = `/projects/` + this.props.pid}>View</Button>
            </CardBody>
          </Card>
          <br />
        </div>
      ) 
    }
}

export default ProjectCard