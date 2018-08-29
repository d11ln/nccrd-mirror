import React from 'react'
import { connect } from 'react-redux'
import userManager from '../Authentication/userManager'


const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Logout extends React.Component {

  constructor(props) {
    super(props);

    //Set initial state
    this.state = { errorMsg: "" }
  }

  componentDidMount() {

    this.props.updateNav(location.hash)

    userManager.createSignoutRequest()
      .then(signoutUrl => {
        if (signoutUrl) {
          fetch(signoutUrl)
            .then(result => {
              if (result.ok) {
                userManager.removeUser()
              }
            })
            .catch(ex => {
              this.setState({ errorMsg: ex.toString() })
            })
        }
      })

    //userManager.signoutRedirect();
  }

  render() {

    let { user } = this.props

    return (
      <>
        <br />
        <div style={{ marginLeft: "22px" }}>
          {(user && !user.expired) &&
            <div>
              {(this.state.errorMsg === "") &&
                <label>Logging out...</label>
              }

              <br />

              {(this.state.errorMsg !== "") &&
                <label>{this.state.errorMsg}</label>
              }
            </div>
          }
          {(!user || user.expired) &&
            <label>You are logged out.</label>
          }
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)