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
import DashMapPreview from "./DashMapPreview.jsx"
import DashGraph1Preview from "./DashGraph1Preview.jsx"
import DashGraph2Preview from "./DashGraph2Preview.jsx"
import DashGraph3Preview from "./DashGraph3Preview.jsx"
import DashGraph4Preview from "./DashGraph4Preview.jsx"
import { DEAGreen } from '../../config/colours.cfg'

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
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    this.setState({ showBackToTop: (window.pageYOffset > 1450) })
  }

  scrollToTop() {
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

  render() {

    let { showBackToTop } = this.state

    return (
      <div style={{ padding: "15px 0px 15px 0px" }}>

        <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>
          {
            showBackToTop &&
            <Button
              data-tip="Back to top"
              size="sm"
              floating
              color=""
              onClick={() => {
                // window.scroll({
                //   top: 0,
                //   left: 0,
                //   behavior: 'smooth'
                // })    

                let scrollStep = window.pageYOffset / 15
                this.scrollToTop()
              }}
              style={{ backgroundColor: DEAGreen }}
            >
              <Fa icon="arrow-up" />
            </Button>
          }
        </div>

        <Row style={{ marginTop: "15px", marginBottom: "15px", marginLeft: "-10px" }}>
          <Col md="2">
            <div style={{ marginTop: "2px" }}>
              <b style={{ color: "grey", fontSize: "14px" }}>
                DASHBOARD
            </b>
              <h3 style={{ marginLeft: "-2px", marginTop: "6px" }}>
                <b>Get Started</b>
              </h3>
            </div>
          </Col>

          <Col md="10">
            <Row>

              <Col md="2">
                <TitleFilter />
              </Col>

              <StatusFilter />
              <TypologyFilter />
              <RegionFilters />
              <SectorFilters />

            </Row>
          </Col>
        </Row>

        <Row>
          {/* Projects & Filters*/}
          <Col md={showBackToTop ? "12" : "7"}>
            <ProjectList />
          </Col>

          {!showBackToTop &&
            <Col md="5">
              <Row>
                <Col md="12">
                  <ProjectFilters />
                </Col>
              </Row>

              <br />

              <Row>
                {/* map */}
                <Col md="12">
                  <DashMapPreview />
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
          }
        </Row>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashLayout)