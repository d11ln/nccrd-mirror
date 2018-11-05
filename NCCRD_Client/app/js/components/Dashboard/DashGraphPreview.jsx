import React, { Children } from 'react'
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'

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
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashGraphPreview)