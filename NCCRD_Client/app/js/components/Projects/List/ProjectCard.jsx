import React from 'react'
import { Card, CardBody, CardText, CardTitle, Button } from 'mdbreact'
import { connect } from 'react-redux'
import {DEAGreen} from "../../../config/colours.cfg"

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
      setScrollPos: payload => {
          dispatch({ type: "SET_PROJECT_SCROLL", payload })
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
            <Button color="" className="btn-sm" onClick={this.onClick.bind(this)}
             style={{ backgroundColor: DEAGreen}}>
             View</Button>  
          </CardBody>
        </Card>
        <br />
      </>
    )
  }
}

//export default ProjectCard
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)