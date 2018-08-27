import React from 'react'
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'

import backdrop from '../../../images/backdrop.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {
    return (
      <div>
        <Row style={{ marginLeft: "0px", marginRight: "0px", backgroundImage: `url(${backdrop})`, minHeight: "450px" }}>
          <Col md="12">
            <br />
            <h1 style={{ color: "white" }}>NCCRD Data Service</h1>
            <p className="lead" style={{ color: "white" }}>
              Home of the NCCRD (National Climate Change Response Database) Web site
                <br />
              A project by SAEON for the DEA (Department of Environmental Affairs)
              </p>
            <p style={{ color: "white" }}>
              <a href="http://www.saeon.ac.za" className="btn btn-default btn-sm" style={{ width: "150px" }}>SAEON</a>
              <a href="http://www.environment.gov.za/" className="btn btn-default btn-sm" style={{ width: "150px" }}>DEA</a>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)