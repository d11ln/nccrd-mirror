import React from 'react'
import { Card, CardBody, CardText, CardTitle, Button, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen } from "../../../config/colours.cfg"

const _gf = require('../../../globalFunctions')

const mapStateToProps = (state, props) => {
  return {}
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

    this.props.setScrollPos(window.pageYOffset)
    location.hash = "/projects/" + this.props.pid
  }

  togleFavorite() {

    let { favorite } = this.state
    let { pid } = this.props

    let newState = !favorite
    this.setState({ favorite: newState })

    //Save to cookie
    let favs = this.GetFavorites()

    console.log("favs", favs)
    console.log("pid", pid)

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

    console.log("strFavs", strFavs)

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

    console.log("favs2", favs)
    
    // _gf.CreateCookie("NCCRD_Project_Favorites", "", 3650)

    let strFavs = ""
    if(favs.length > 0){
      strFavs = favs.map(x => x.toString()).join(",")
    }
    else if(false.length === 1){
      strFavs = favs[0].toString()
    }

    console.log("strFavs2", strFavs)

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

          <CardText style={{ wordWrap: "break-word" }}>
            {pdes}
          </CardText>

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

          <Button
            size="sm"
            color=""
            style={{
              float: "right",
              marginTop: "5px",
              padding: "5px",
              boxShadow: "none",
              backgroundColor: "white"
            }}
            onClick={this.togleFavorite}
          >
            <Fa icon="star" size="2x" style={{ color: favorite ? "#fdd835" : "#D8D8D8" }} />
          </Button>

        </CardBody>
        <hr style={{ margin: "0px 0px 15px 0px" }} />
      </>
    )
  }
}

//export default ProjectCard
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)