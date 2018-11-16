import React from 'react'
import ProjectList from './ProjectList.jsx'
import ProjectFilters from '../Filters/ProjectFilters.jsx'
import TitleFilter from '../Filters/TitleFilter.jsx'
import StatusFilter from '../Filters/StatusFilter.jsx'
import TypologyFilter from '../Filters/TypologyFilter.jsx'
import RegionFilters from '../Filters/RegionFilters.jsx'
import SectorFilters from '../Filters/SectorFilters.jsx'
import { connect } from 'react-redux'
import { Fa, Button, Row, Col } from 'mdbreact'
import ReactTooltip from 'react-tooltip'
import { DEAGreen } from '../../../config/colours.cfg'

const queryString = require('query-string')
const _gf = require("../../../globalFunctions")

const mapStateToProps = (state, props) => {
  let { globalData: { loading } } = state
  let user = state.oidc.user
  return { loading, user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    },
    loadPolygonFilter: payload => {
      dispatch({ type: "LOAD_POLYGON_FILTER", payload })
    },
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Projects extends React.Component {

  constructor(props) {
    super(props);

    this.backToTop = this.backToTop.bind(this)
    this.addProject = this.addProject.bind(this)
    this.handleScroll = this.handleScroll.bind(this);

    //Read polygon filter from URL
    const parsedHash = queryString.parse(location.hash.substring(location.hash.indexOf("?"))) //queryString.parse(location.hash.replace("/projects?", ""))

    if (typeof parsedHash.polygon !== 'undefined') {

      //Dispatch to store
      this.props.loadPolygonFilter(parsedHash.polygon)
    }

    this.state = { showBackToTop: false }
  }

  backToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    // var scrollStep = -window.parent.pageYOffset / 15,
    //   scrollInterval = setInterval(function () {
    //     if (window.parent.pageYOffset != 0) {
    //       window.parent.scrollBy(0, scrollStep);
    //     } else {
    //       clearInterval(scrollInterval);
    //     }
    //   }, 15)
  }

  addProject() {
    location.hash = '/projects/add'
  }

  componentDidMount() {
    this.props.setLoading(true)
    window.addEventListener("scroll", this.handleScroll);
    this.props.updateNav(location.hash)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    this.setState({ showBackToTop: (window.pageYOffset > 300) })
  }

  render() {

    let { user } = this.props
    let { showBackToTop } = this.state

    return (
      <>
        <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>

          {showBackToTop &&
            <Button data-tip="Back to top" size="sm" floating color="" onClick={this.backToTop}
              style={{ backgroundColor: DEAGreen }}>
              <Fa icon="arrow-up" />
            </Button>}

        </div>

        <Row>
          <Col md="3">
            <TitleFilter />
          </Col>

            <StatusFilter />

            <TypologyFilter />

            <RegionFilters />

            <SectorFilters />

        </Row>

        <ProjectFilters />
        <div style={{ height: "15px", backgroundColor: "whitesmoke" }} />
        <ProjectList />

        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)