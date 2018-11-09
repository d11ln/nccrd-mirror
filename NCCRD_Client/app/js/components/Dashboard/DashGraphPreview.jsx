import React, { Children } from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class DashGraphPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 10px 5px 10px",
          borderRadius: "10px",
          border: "1px solid gainsboro",
          cursor: "pointer",
        }}
        onClick={() => { location.hash = "/chart" }}
      >
        {this.props.children}
        <img src={popout} style={{ width: "25px", position: "absolute", top: "10px", right: "25px" }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashGraphPreview)