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
import DashGraphPreview from "./DashGraphPreview.jsx"
import { DEAGreen } from '../../config/colours.cfg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
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
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    this.setState({ showBackToTop: (window.pageYOffset > 1200 && window.pageYOffset < (document.body.scrollHeight - window.innerHeight - 250)) })
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
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                })
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
          {/* main content layout*/}

          <Col md="7">
            <ProjectList />
          </Col>

          <Col md="5">
            {/* right content layout */}
            <Row>
              {/* filter pills */}
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
              {/* graphs layout */}

              <Col md="12">

                <Row>
                  {/* top row */}

                  <Col md="6">
                    {/* top left graph */}
                    <DashGraphPreview>
                      {/* temp */}
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      {/* temp */}
                    </DashGraphPreview>
                  </Col>

                  <Col md="6">
                    {/* top right graph */}
                    <DashGraphPreview>
                      {/* temp */}
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      {/* temp */}
                    </DashGraphPreview>
                  </Col>

                </Row>

                <br />

                <Row>
                  {/* bottom row */}

                  <Col md="6">
                    {/* bottom left graph */}
                    <DashGraphPreview>
                      {/* temp */}
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      {/* temp */}
                    </DashGraphPreview>
                  </Col>

                  <Col md="6">
                    {/* bottom right graph */}
                    <DashGraphPreview>
                      {/* temp */}
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      {/* temp */}
                    </DashGraphPreview>
                  </Col>

                </Row>

              </Col>

            </Row>
          </Col>
        </Row>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashLayout)