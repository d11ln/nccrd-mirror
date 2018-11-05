import React from 'react'
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class DashMapPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h4 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>Map</b>
        </h4>

        <hr/>

        {/* temp */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* temp */}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashMapPreview)