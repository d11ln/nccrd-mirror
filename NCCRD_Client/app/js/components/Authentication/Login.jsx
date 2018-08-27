import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'mdbreact'
import * as ACTION_TYPES from '../../constants/action-types'
import userManager from '../Authentication/userManager'

const mapStateToProps = (state, props) => {
  let { globalData: { loading } } = state
  return { loading }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: payload => {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
    }
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    //Hide loading and redirect to IDS
    this.props.setLoading(false)
    userManager.signinRedirect()
  }

  render() {

    console.log("window.location.origin", window.location.origin)

    return (
      <>
        <br />
        <label>&nbsp;Redirecting...</label>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)