import React from 'react'
import { connect } from 'react-redux'
import MapViewCore from './MapViewCore.jsx'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MapView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    document.getElementById("app-content").scroll({
      top: 125,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {

    return (
      <>
        <MapViewCore fullView height="550px" />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)