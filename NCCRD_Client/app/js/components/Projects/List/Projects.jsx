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
import { DEAGreen } from '../../../config/colours.js'
import HazardFilter from '../Filters/HazardFilter.jsx';
import { Tooltip } from 'antd';

const queryString = require('query-string')
const _gf = require("../../../globalFunctions")

const mapStateToProps = (state, props) => {
  let { globalData: { loading, showListFilterOptions } } = state
  let user = state.oidc.user
  return { loading, user, showListFilterOptions }
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
    },
    setProjectsFullView: payload => {
      dispatch({ type: "SET_PROJECTS_FULLVIEW", payload })
    }
  }
}

class Projects extends React.Component {

  constructor(props) {
    super(props);

    this.backToTop = this.backToTop.bind(this)
    this.addProject = this.addProject.bind(this)
    this.handleScroll = this.handleScroll.bind(this);

    this.state = { showBackToTop: false }
  }

  backToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addProject() {
    location.hash = '/projects/add'
  }

  componentDidMount() {
    this.props.setProjectsFullView(true)
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

    let { showBackToTop } = this.state

    return (
      <>
        <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>
          {showBackToTop &&
            <Tooltip title="Back to top" mouseEnterDelay={0.7}>
              <Button size="sm" floating color="" onClick={this.backToTop}
                style={{ backgroundColor: DEAGreen }}>
                <Fa icon="arrow-up" />
              </Button>
            </Tooltip>
          }
        </div>

        {
          this.props.showListFilterOptions === true &&
          <div>
            <Row>
              <Col md="2">
                <TitleFilter />
              </Col>

              <RegionFilters />
              <SectorFilters />
              <HazardFilter />
              <StatusFilter />
              <TypologyFilter />

            </Row>

            <ProjectFilters />
            <div style={{ height: "15px", backgroundColor: "whitesmoke" }} />
          </div>
        }

        <ProjectList />
        <ReactTooltip delayShow={700} />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)