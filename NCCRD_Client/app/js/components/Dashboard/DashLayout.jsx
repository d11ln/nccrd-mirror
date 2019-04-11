import React from 'react'
import { Row, Col, Button, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import TitleFilter from '../Projects/Filters/TitleFilter.jsx'
import StatusFilter from '../Projects/Filters/StatusFilter.jsx'
import TypologyFilter from '../Projects/Filters/TypologyFilter.jsx'
import RegionFilters from '../Projects/Filters/RegionFilters.jsx'
import SectorFilters from '../Projects/Filters/SectorFilters.jsx'
import ProjectList from "../Projects/List/ProjectList.jsx"
import ProjectFilters from "../Projects/Filters/ProjectFilters.jsx"
import DashGraph1Preview from "./DashGraph1Preview.jsx"
import DashGraph2Preview from "./DashGraph2Preview.jsx"
import DashGraph3Preview from "./DashGraph3Preview.jsx"
import DashGraph4Preview from "./DashGraph4Preview.jsx"
import { DEAGreen } from '../../config/colours.js'
import MapViewCore from '../Map/MapViewCore.jsx'
import HazardFilter from '../Projects/Filters/HazardFilter.jsx';
import { Tooltip } from 'antd';

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    setProjectsFullView: payload => {
      dispatch({ type: "SET_PROJECTS_FULLVIEW", payload })
    }
  }
}

class DashLayout extends React.Component {

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.state = { showBackToTop: false }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.props.setProjectsFullView(false)
    document.getElementById("app-content").addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.getElementById("app-content").removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    let { showBackToTop } = this.state

    if (document.getElementById("app-content").scrollTop > 1350 && showBackToTop === false) {
      this.setState({ showBackToTop: true })
    }
    else if (document.getElementById("app-content").scrollTop <= 1350 && showBackToTop === true) {
      this.setState({ showBackToTop: false })
    }

  }

  scrollToTop() {
    document.getElementById("app-content").scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getDashText(small) {
    return (
      <div style={{ color: "grey" }}>
        {
          !small &&
          <table>
            <tbody>
              <tr>
                <td>
                  <div style={{ paddingLeft: 115 }}>Filters</div>
                </td>
                <td>
                  <Fa icon="angle-double-right" style={{ marginLeft: 2 }} />
                </td>
              </tr>
            </tbody>
          </table>
        }

        <table>
          <tbody>
            <tr>
              <td>
                <h2 style={{ letterSpacing: -2 }}>
                  <b>Dashboard</b>
                </h2>
              </td>
              <td>
                <h2>
                  <Fa icon="arrow-circle-down" style={{ marginLeft: 2 }} />
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {

    let { showBackToTop } = this.state

    return (
      <>

        <Row className="d-lg-none">
          <Col>
            {this.getDashText(true)}
          </Col>
        </Row>

        <Row style={{ marginBottom: "15px" }}>
          <Col className="d-none d-lg-block" md="2">
            {this.getDashText()}
          </Col>

          <Col md="10">
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
          </Col>
        </Row>

        <Row>
          {/* Projects & Filters*/}
          <Col md={showBackToTop ? "12" : "7"}>
            <ProjectList />
          </Col>

          <Col md="5" style={{
            position: (showBackToTop ? "fixed" : "relative"),
            top: 0,
            right: showBackToTop ? "-50vw" : 0
          }}>
            <Row>
              <Col md="12">
                <ProjectFilters />
              </Col>
            </Row>

            <br />

            <Row>
              {/* map */}
              <Col md="12">
                <MapViewCore />
              </Col>
            </Row>

            <br />

            <Row>
              {/* graphs */}
              <Col md="12">
                <Row>
                  <Col md="6">
                    <DashGraph1Preview />
                  </Col>

                  <Col md="6">
                    <DashGraph2Preview>
                      <iframe
                        style={{
                          width: "100%",
                          height: "150px",
                          margin: "0px",
                          border: "none"
                        }}
                        src={""}
                      />
                    </DashGraph2Preview>
                  </Col>

                </Row>

                <br />

                <Row>
                  <Col md="6">
                    <DashGraph3Preview>
                      <iframe
                        style={{
                          width: "100%",
                          height: "150px",
                          margin: "0px",
                          border: "none"
                        }}
                        src={""}
                      />
                    </DashGraph3Preview>
                  </Col>

                  <Col md="6">
                    <DashGraph4Preview>
                      <iframe
                        style={{
                          width: "100%",
                          height: "150px",
                          margin: "0px",
                          border: "none"
                        }}
                        src={""}
                      />
                    </DashGraph4Preview>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>
          {
            showBackToTop &&
            <Tooltip title="Back to top" mouseEnterDelay={0.7}>
              <Button
                size="sm"
                floating
                color=""
                onClick={() => {
                  this.scrollToTop()
                }}
                style={{ backgroundColor: DEAGreen }}
              >
                <Fa icon="arrow-up" />
              </Button>
            </Tooltip>

          }
        </div>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashLayout)