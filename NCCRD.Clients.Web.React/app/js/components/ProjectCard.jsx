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
          <Card>
            <CardBody>
              <CardTitle>{this.props.ptitle}</CardTitle>
              <CardText>{this.props.pdes}</CardText>
              <Button onTouchTap={() => location.hash+=`/`+this.props.pId}>Button</Button>
            </CardBody>
          </Card>
        )
    }
}

export default ProjectCard