'use strict'

import React from 'react'
import { Card, CardBody, CardText, CardTitle, Button } from 'mdbreact'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
      setScrollPos: payload => {
          dispatch({ type: ACTION_TYPES.SET_PROJECT_SCROLL, payload })
      }
  }
}

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick() {

    this.props.setScrollPos(window.pageYOffset)
    location.hash = "/projects/" + this.props.pid
  }

  render() {
    return (
      <>
        <Card>
          <CardBody>
            <CardTitle>{this.props.ptitle}</CardTitle>
            <CardText>{this.props.pdes}</CardText>
            <Button color="default" className="btn-sm" onClick={this.onClick.bind(this)}>View</Button>
          </CardBody>
        </Card>
        <br />
      </>
    )
  }
}

//export default ProjectCard
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)