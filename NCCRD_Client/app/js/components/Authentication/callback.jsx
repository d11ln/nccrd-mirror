import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from '../Authentication/userManager'
import * as ACTION_TYPES from '../../constants/action-types'

const o = require("odata")
const _gf = require("../../globalFunctions")

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

class CallbackPage extends React.Component {

  constructor(props) {
    super(props);

    this.successCallbackHandler = this.successCallbackHandler.bind(this);
    this.errorCallbackHandler = this.errorCallbackHandler.bind(this);
  }

  successCallbackHandler(user) {

    //Add auth token to OData config
    o().config({
      headers: [
        { name: "Authorization", value: "Bearer " + (user === null ? "" : user.access_token) }
      ]
    })

    //Redirect
    location = _gf.ReadLastUrl()  //"#"
  }

  errorCallbackHandler(e) {
    console.log("Login failed!!", e)
    location = "#"
  }

  render() {

    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.successCallbackHandler}
        errorCallback={this.errorCallbackHandler}
      >
        <div>
          <br />
          <label>&nbsp;Redirecting...</label>
        </div>

      </CallbackComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackPage)
