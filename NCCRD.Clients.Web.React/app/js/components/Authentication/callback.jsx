import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from '../../utils/userManager'
import * as ACTION_TYPES from '../../constants/action-types'

const mapStateToProps = (state, props) => {
    let { globalData: { loading } } = state
    return { loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        },
        setAuthenticated: payload => {
            dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload })
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

        console.log("Login succeeded!!")
        console.log("User:", user)
        Promise.all([this.props.setAuthenticated({isAuthenticated: true, username: user.profile.email})]).then(location = "#")
    }

    errorCallbackHandler(e) {

        console.log("Login failed!!", e)
        location = "#"
    }

    render() {

        console.log("MYPROPS: ", this.props);

        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={this.successCallbackHandler}
                errorCallback={this.errorCallbackHandler}
            >
                <div>Redirecting...</div>
            </CallbackComponent>
        );
    }
}

//export default connect()(CallbackPage);
export default connect(mapStateToProps, mapDispatchToProps)(CallbackPage)
