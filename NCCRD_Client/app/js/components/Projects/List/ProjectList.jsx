import React from 'react'
import ProjectCard from './ProjectCard.jsx'
import { connect } from 'react-redux'
import { apiBaseURL } from "../../../config/apiBaseURL.cfg"
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "mdbreact"

const _gf = require("../../../globalFunctions")
const o = require("odata")

const mapStateToProps = (state, props) => {
    let { projectData: { projects, start, end, listScrollPos } } = state
    let { filterData: { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter } } = state
    let user = state.oidc.user
    let { globalData: { loading } } = state
    let { lookupData: { typology } } = state
    return {
        projects, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter, start, end,
        listScrollPos, user, loading, typology
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
            end: 10,
            messageModal: false,
            title: "",
            message: ""
        }

        this.handleScroll = this.handleScroll.bind(this)
        this.showMessage = this.showMessage.bind(this)
    }

    showMessage(title, message) {
        this.setState({
            title,
            message,
            messageModal: true
        })
    }

    handleScroll() {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        const { loadMoreProjects } = this.props
        if (Math.ceil(windowBottom) >= docHeight && this.props.polygonFilter === "") {
            loadMoreProjects()
        }
    }

    getProjectList(resetCounts) {

        let { loadProjects, setLoading, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter,
            clearProjectDetails, clearAdaptationDetails, clearMitigationDetails, clearEmissionsData,
            clearResearchDetails, start, end, resetProjectCounts, polygonFilter, user, typology } = this.props

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
            if (batchCount > 0) {
                skip = (batchCount - 1) * batchSize
            }

            //Handle error messages with error-config in order 
            //to get error message back and not just code
            o().config({
                error: (code, error) => {

                    console.log("code", code)
                    console.log("error", error)

                    // //Try to get & parse error message
                    // let errorJS = JSON.parse(error)
                    // let message = errorJS.value
                    // if (typeof message === 'undefined') message = errorJS.error.message
                    // if (typeof message === 'undefined') message = "(See log for error details)"

                    // //Log error message & details
                    // this.showMessage("Unable to save changes", message)
                    // console.error("Unable to save changes", code, errorJS)
                }
            })

            //Get project list data
            //Setup oHandler
            var oHandler = o(apiBaseURL + "Projects")

            //Conditional filters
            if (titleFilter !== "") oHandler.search(["ProjectTitle"], titleFilter)
            if (statusFilter !== 0) oHandler.filter("ProjectStatusId eq " + statusFilter)
            if (regionFilter != 0) oHandler.filter("ProjectRegions/any(x:x/RegionId eq " + regionFilter + ")")
            if (sectorFilter !== 0) oHandler.filter("(AdaptationDetails/any(x:x/SectorId eq " + sectorFilter + ") or MitigationDetails/any(x:x/SectorId eq " + sectorFilter + ") or ResearchDetails/any(x:x/SectorId eq " + sectorFilter + "))")

            //if (typologyFilter !== 0) oHandler.filter("(AdaptationDetails/any(x:x/Sector/TypologyId eq " + typologyFilter + ") or MitigationDetails/any(x:x/Sector/TypologyId eq " + typologyFilter + ") or ResearchDetails/any(x:x/Sector/TypologyId eq " + typologyFilter + "))")
            if (typologyFilter !== 0 && typology.length > 0) {
                let typologyVal = typology.filter(t => t.TypologyId === typologyFilter)[0].Value
                if (typeof typologyVal !== 'undefined') {
                    switch (typologyVal) {
                        case "Adaptation":
                            oHandler.filter("AdaptationDetails/any(x:x/AdaptationDetailId gt 0)")
                            break;
                        case "Mitigation":
                            oHandler.filter("MitigationDetails/any(x:x/MitigationDetailId gt 0)")
                            break;
                        case "Research":
                            oHandler.filter("ResearchDetails/any(x:x/ResearchDetailId gt 0)")
                            break;
                    }
                }
            }

            //Pagination and ordering
            oHandler
                .skip(skip)
                .top(batchSize)
                .orderBy("ProjectTitle")

            oHandler.get((data) => {
                o().config({ error: null }) //Reset error config
                setLoading(false)
                loadProjects(data)
            }, (error) => {
                o().config({ error: null }) //Reset error config
                setLoading(false)
                this.showMessage("An error occurred", "An error occurred while trying to fetch data from the server. Please try again later. (See log for error details)")
                console.error("error", error)
            })
        }
    }

    componentDidMount() {
        this.getProjectList()
        window.addEventListener("scroll", this.handleScroll);
        window.scrollTo(0, this.props.listScrollPos);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
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

        const ar = this.buildList()
        let projectlist = []

        if (ar.length > 0) {
            projectlist = (
                ar.slice(this.props.start, this.props.end)
            )
        }

        return (
            <div>
                {projectlist.length > 0 && projectlist}
                {(projectlist.length === 0 && this.props.loading) && <h5>&nbsp;Loading projects...</h5>}

                <Container>
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
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)