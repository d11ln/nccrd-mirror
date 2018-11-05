import React from 'react'
import ProjectCard from './ProjectCard.jsx'
import { connect } from 'react-redux'
import { apiBaseURL } from "../../../config/serviceURLs.cfg"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Fa, InputSwitch } from "mdbreact"
import { DEAGreen } from '../../../config/colours.cfg'
import popout from '../../../../images/popout.png'
import popin from '../../../../images/popin.png'

//AntD Tree
import Popover from 'antd/lib/popover'
import 'antd/lib/popover/style/index.css' //Overrides default antd.tree css

const _gf = require("../../../globalFunctions")
const o = require("odata")
const queryString = require('query-string')

const mapStateToProps = (state, props) => {
  let { projectData: { projects, start, end, listScrollPos } } = state
  let { filterData: { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter } } = state
  let user = state.oidc.user
  let { globalData: { loading, daoid } } = state
  let { lookupData: { typology } } = state
  return {
    projects, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter, start, end,
    listScrollPos, user, loading, typology, daoid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    },
    loadProjects: payload => {
      dispatch({ type: "LOAD_PROJECTS", payload })
    },
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    },
    clearProjectDetails: () => {
      dispatch({ type: "LOAD_PROJECT_DETAILS", payload: [] })
    },
    clearAdaptationDetails: () => {
      dispatch({ type: "LOAD_ADAPTATION_DETAILS", payload: [] })
    },
    clearMitigationDetails: () => {
      dispatch({ type: "LOAD_MITIGATION_DETAILS", payload: [] })
    },
    clearEmissionsData: () => {
      dispatch({ type: "LOAD_MITIGATION_EMISSIONS", payload: [] })
    },
    clearResearchDetails: () => {
      dispatch({ type: "LOAD_RESEARCH_DETAILS", payload: [] })
    },
    loadMoreProjects: () => {
      dispatch({ type: "LOAD_MORE_PROJECTS" })
    },
    resetProjectCounts: () => {
      dispatch({ type: "RESET_PROJECT_COUNTS" })
    },
    setDAOID: async payload => {
      dispatch({ type: "SET_DAOID", payload })
    }
  }
}

class ProjectList extends React.Component {

  constructor(props) {
    super(props);

    //Set initial state
    this.state = {
      titleFilter: "",
      statusFilter: 0,
      typologyFilter: 0,
      regionFilter: 0,
      sectorFilter: 0,
      polygonFilter: "",
      start: 0,
      end: 25,
      messageModal: false,
      title: "",
      message: "",
      favorite: false,
      ellipsisMenu: false
    }

    this.showMessage = this.showMessage.bind(this)
  }

  async componentDidMount() {

    //Read initial filter from URL
    const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
    if (typeof parsedHash.daoid !== 'undefined') {
      await this.props.setDAOID(parsedHash.daoid)
    }

    this.getProjectList()
    window.scrollTo(0, this.props.listScrollPos);
  }

  componentDidUpdate() {

    let pTitleFilter = this.props.titleFilter
    let pStatusFilter = this.props.statusFilter
    let pTypologyFilter = this.props.typologyFilter
    let pRegionFilter = this.props.regionFilter
    let pSectorFilter = this.props.sectorFilter
    let pPolygonFilter = this.props.polygonFilter
    let pStart = this.props.start
    let pEnd = this.props.end
    let { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter, start, end } = this.state

    //If any filters changed...refetch projects
    let filtersChanged = false
    if (pTitleFilter !== titleFilter || pStatusFilter !== statusFilter || pTypologyFilter !== typologyFilter ||
      pRegionFilter !== regionFilter || pSectorFilter !== sectorFilter || pPolygonFilter !== polygonFilter) {

      filtersChanged = true
    }

    //If next batch needed
    let nextBatchNeeded = false
    if (pStart !== start || pEnd !== end) {
      nextBatchNeeded = true
    }

    if (filtersChanged === true || nextBatchNeeded === true) {
      this.getProjectList(filtersChanged)
    }
  }

  showMessage(title, message) {
    this.setState({
      title,
      message,
      messageModal: true
    })
  }

  async getProjectList(resetCounts) {

    let { loadProjects, setLoading, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter,
      clearProjectDetails, clearAdaptationDetails, clearMitigationDetails, clearEmissionsData,
      clearResearchDetails, start, end, resetProjectCounts, polygonFilter, user, typology, daoid } = this.props

    if (resetCounts === true) {
      start = 0
      end = 25
      resetProjectCounts()
    }

    this.setState({
      titleFilter: titleFilter,
      statusFilter: statusFilter,
      typologyFilter: typologyFilter,
      regionFilter: regionFilter,
      sectorFilter: sectorFilter,
      polygonFilter: polygonFilter,
      start: start,
      end: end
    })

    setLoading(true)

    //Clear details data
    clearProjectDetails()
    clearAdaptationDetails()
    clearMitigationDetails()
    clearEmissionsData()
    clearResearchDetails()

    if (polygonFilter !== "") {

      let fetchURL = apiBaseURL + 'api/Projects/GetByPolygonPost'

      //Get project list data
      fetch(fetchURL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: "{ 'polygon':'" + polygonFilter + "' }"
        })
        .then(res => res.json())
        .then(res => {
          loadProjects(res)
          setLoading(false)
        })
        .catch(res => {
          setLoading(false)
          console.log("Error details:", res)
          alert("An error occurred while trying to fetch data from the server. Please try again later. (See log for error details)")
        })
    }
    else {

      let batchSize = 25
      let skip = 0
      let batchCount = Math.floor(end / batchSize)
      let filters = {}

      //BATCH//
      if (batchCount > 0) {
        skip = (batchCount - 1) * batchSize
      }

      //ADD FILTERS//
      if(this.state.favorite){
        filters.favorites = _gf.ReadCookie("NCCRD_Project_Favorites")
      }

      //Title//
      if (titleFilter !== "") {
        filters.title = titleFilter
      }

      //Status//
      if (statusFilter !== 0) {
        filters.status = statusFilter
      }

      //Typology//
      if (typologyFilter !== 0) {
        filters.typology = typologyFilter
      }

      //Region//
      if (regionFilter != 0) {
        filters.region = regionFilter
      }

      //Sector//
      if (sectorFilter != 0) {
        filters.sector = sectorFilter
      }

      //DAO Goal Filter//
      if (_gf.IsValidGuid(daoid)) {
        filters.daoid = daoid
      }

      //GET PROJECTS FILTERED//
      try {

        var oHandler = o(apiBaseURL + "Projects/Extensions.Filter")

        //Pagination and ordering
        oHandler
          .skip(skip)
          .top(batchSize)
          .orderBy("ProjectTitle")

        //Select
        oHandler.select("ProjectId,ProjectTitle,ProjectDescription")

        let res = await oHandler.post(filters).save()
        setLoading(false)
        loadProjects(res.data)
      }
      catch (ex) {
        console.error("error", ex)
        setLoading(false)
        this.showMessage("An error occurred", "An error occurred while trying to fetch data from the server. Please try again later. (See log for error details)")
      }
    }
  }

  buildList() {

    const { projects } = this.props
    let ar = []
    if (typeof projects !== 'undefined' && projects.length > 0) {
      for (let i of projects) {
        ar.push(<ProjectCard key={i.ProjectId} pid={i.ProjectId} ptitle={i.ProjectTitle} pdes={i.ProjectDescription} />)
      }
      return ar
    }
    return <div />
  }

  render() {

    let { user, daoid } = this.props
    let { favorite, ellipsisMenu } = this.state

    const projComps = this.buildList()
    let projectlist = []

    if (projComps.length > 0) {
      projectlist = (
        projComps.slice(this.props.start, this.props.end)
      )
    }

    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h4 style={{ margin: "5px 5px 5px 19px", display: "inline-block" }}>
          <b>Projects</b>
        </h4>

        <div style={{ float: "right" }}>

          {
            !location.hash.includes("projects") &&
            <Button size="sm" color="white"
              style={{ padding: "5px", boxShadow: "none", marginTop: "0px", display: "inline-block" }}
              onClick={() => { location.hash = "/projects" }}>
              <img src={popout} style={{ width: "25px" }} />
            </Button>
          }

          {
            location.hash.includes("projects") &&
            <Button size="sm" color="white"
              style={{ padding: "5px", boxShadow: "none", marginTop: "0px", display: "inline-block" }}
              onClick={() => { location.hash = "" }}>
              <img src={popin} style={{ width: "25px" }} />
            </Button>
          }

          <Popover
            content={
              <div>
                <p style={{ display: "inline-block", marginRight: "5px" }}>
                  Favorites:
                </p>
                <Button
                  size="sm"
                  color={ favorite ? "primary" : "grey"}
                  style={{ padding: "4px 10px 5px 10px", marginTop: "1px", marginRight: "-1px", width: "40px" }}
                  onClick={() => { 
                    this.setState({ favorite: !favorite, ellipsisMenu: false}, () => {
                      this.getProjectList(true)
                    }) 
                  }}
                >
                  On
                </Button>
                <Button
                  size="sm"
                  color={ !favorite ? "primary" : "grey"}
                  style={{ padding: "4px 10px 5px 10px", marginTop: "1px", marginLeft: "-1px", width: "40px" }}
                  onClick={() => { 
                    this.setState({ favorite: !favorite, ellipsisMenu: false}, () => {
                      this.getProjectList(true)
                    }) 
                  }}
                >
                  Off
                </Button>
              </div>
            }
            placement="leftTop"
            trigger="click"
            visible={ellipsisMenu}
            onVisibleChange={(visible) => { this.setState({ ellipsisMenu: visible }) }}
          >
            <Button size="sm" color="white"
              style={{ padding: "5px 10px 5px 10px", boxShadow: "none", marginTop: "0px" }} >
              <Fa icon="ellipsis-v" size="2x" style={{ color: "black", marginTop: "4px" }} />
            </Button>
          </Popover>

        </div>

        <hr />

        {
          projectlist.length > 0 &&
          <div>
            {projectlist}
            <br />
            <Button
              size="sm"
              color=""
              style={{ marginTop: "-25px", marginLeft: "20px", backgroundColor: DEAGreen }}
              onClick={() => { this.props.loadMoreProjects() }}
            >
              Load More Projects
            </Button>
          </div>
        }

        {
          (projectlist.length === 0 && this.props.loading) &&
          <h5 style={{ marginLeft: "20px" }}>
            Loading Projects...
          </h5>
        }

        {
          (projectlist.length === 0 && !this.props.loading) &&
          <h5 style={{ marginLeft: "20px" }}>
            No Projects Found.
          </h5>
        }

        <Modal fade={false} isOpen={this.state.messageModal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
          <ModalBody>
            <div className="col-md-12" style={{ overflowY: "auto", maxHeight: "65vh" }}>
              {this.state.message.split("\n").map(str => <div key={_gf.GetUID()}><label>{str}</label><br /></div>)}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" style={{ width: "100px" }} color="default" onClick={() => this.setState({ messageModal: false })} >Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)