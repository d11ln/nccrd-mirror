import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popin from '../../../images/popin.png'
import { CordovaPopupWindow } from 'oidc-client';

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class ChartView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h4 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>[ChartName]</b>
        </h4>

        <img
          src={popin}
          style={{
            width: "25px",
            float: "right",
            margin: "5px 5px 0px 0px",
            cursor: "pointer"
          }}
          onClick={() => { location.hash = "" }}
        />

        {/* <Button size="sm" color="white"
          style={{ padding: "5px", boxShadow: "none", marginTop: "0px", display: "inline-block", float: "right" }}
          onClick={() => { location.hash = "" }}>
         
        </Button> */}

        <hr />

        {/* temp */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* temp */}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartView)