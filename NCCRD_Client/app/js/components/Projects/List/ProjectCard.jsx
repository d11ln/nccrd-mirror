import React from 'react'
import { Card, CardBody, CardText, CardTitle, Button, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen } from "../../../config/colours.cfg"

const _gf = require('../../../globalFunctions')

const mapStateToProps = (state, props) => {
  let { globalData: { showListViewOption, showFavoritesOption, showDetailsInParent } } = state
  return { showListViewOption, showFavoritesOption, showDetailsInParent }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    }
  }
}

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);

    this.togleFavorite = this.togleFavorite.bind(this)
    this.onClick = this.onClick.bind(this)

    this.state = {
      favorite: false
    }
  }

  componentDidMount() {
    let { pid } = this.props
    let favs = this.GetFavorites()
    this.setState({ favorite: favs.includes(pid) })
  }

  onClick() {

    if (this.props.showDetailsInParent) {
      let payload = {}
      payload.action = "showDetails"
      payload.value = this.props.pid
      window.parent.postMessage(payload, "*")
    }
    else {
      this.props.setScrollPos(window.pageYOffset)
      let navTo = ""
      if (location.hash.includes("projects")) {
        navTo = location.hash.replace("#/projects", "#/projects/" + this.props.pid)
      }
      else {
        navTo = location.hash.replace("#/", "#/projects/" + this.props.pid)
      }

      location.hash = navTo
    }
  }

  togleFavorite() {

    let { favorite } = this.state
    let { pid } = this.props

    let newState = !favorite
    this.setState({ favorite: newState })

    //Save to cookie
    let favs = this.GetFavorites()

    if (newState) {
      //Add if not contains
      if (!favs.includes(pid)) {
        favs.push(pid)
      }
    }
    else {
      //Remove if contains
      if (favs.includes(pid)) {
        let index = favs.indexOf(pid)
        favs.splice(index, 1)
      }
    }

    this.SetFavorites(favs)
  }

  GetFavorites() {
    let strFavs = _gf.ReadCookie("NCCRD_Project_Favorites")

    if (strFavs !== null && strFavs.length > 0) {
      let favs = strFavs.split(",")

      if (favs.length > 0) {
        return favs.map(x => parseInt(x))
      }
    }

    return []
  }

  SetFavorites(favs) {

    favs = favs.filter(f => !isNaN(f))

    let strFavs = ""
    if (favs.length > 0) {
      strFavs = favs.map(x => x.toString()).join(",")
    }
    else if (false.length === 1) {
      strFavs = favs[0].toString()
    }

    _gf.CreateCookie("NCCRD_Project_Favorites", strFavs, 3650)
  }

  render() {

    let { pdes } = this.props
    let { favorite } = this.state

    if (pdes.length > 240) {
      pdes = pdes.substring(0, 225) + " ..."
    }

    return (
      <>
        <CardBody>

          <CardTitle>
            {this.props.ptitle}
          </CardTitle >

          <CardText style={{ wordWrap: "break-word", minHeight: 75 }}>
            {pdes}
          </CardText>

          {
            this.props.showListViewOption &&
            <Button
              size="sm"
              color="white"
              onClick={this.onClick.bind(this)}
              style={{
                backgroundColor: "white",
                marginLeft: "0px",
                boxShadow: "none",
                border: "1px solid silver",
                borderRadius: "5px",
                padding: "3px 15px 3px 15px"
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td valign="middle">
                      <Fa icon="eye" size="lg" style={{ color: DEAGreen, marginRight: "5px" }} />
                    </td>
                    <td valign="middle">
                      <div style={{ fontSize: "14px", marginTop: "2px" }} >
                        View
                    </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Button>
          }

          {
            this.props.showFavoritesOption &&
            <Button
              size="sm"
              color="white"
              onClick={this.togleFavorite}
              style={{
                backgroundColor: "white",
                marginLeft: "0px",
                boxShadow: "none",
                border: "1px solid silver",
                borderRadius: "5px",
                padding: "3px 15px 3px 15px"
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td valign="middle">
                      <Fa icon="star" size="lg" style={{ color: favorite ? "#fdd835" : "#D8D8D8", marginRight: "5px" }} />
                    </td>
                    <td valign="middle">
                      <div style={{ fontSize: "14px", marginTop: "2px" }} >
                        Favorite
                    </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Button>
          }

        </CardBody>
        <hr style={{ margin: "0px 0px 15px 0px" }} />
      </>
    )
  }
}

//export default ProjectCard
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)