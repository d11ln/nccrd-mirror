import React from 'react'
import userManager from '../Authentication/userManager'

const o = require("odata")

class Logout extends React.Component {

  componentDidMount() {

    //Remove auth token from OData config
    o().config({
      headers: []
    })

    userManager.signoutRedirect();
  }

  render() {

    return (
      <>
        <div>
          <br />
          <label>&nbsp;Logging out...</label>
        </div>
      </>
    )
  }
}

export default Logout