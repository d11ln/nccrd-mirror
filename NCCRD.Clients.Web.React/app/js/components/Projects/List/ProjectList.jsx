'use strict'

import React from 'react'
import ProjectCard from './ProjectCard.jsx'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL"

const mapStateToProps = (state, props) => {
    let { projectData: { projects, start, end, listScrollPos } } = state
    let { filterData: { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter } } = state
    return {
        projects, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, polygonFilter, start, end,
        listScrollPos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setScrollPos: payload => {
            dispatch({ type: ACTION_TYPES.SET_PROJECT_SCROLL, payload })
        },
        loadProjects: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECTS, payload })
        },
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        },
        clearProjectDetails: () => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_DETAILS, payload: [] })
        },
        clearAdaptationDetails: () => {
            dispatch({ type: ACTION_TYPES.LOAD_ADAPTATION_DETAILS, payload: [] })
        },
        clearMitigationDetails: () => {
            dispatch({ type: ACTION_TYPES.LOAD_MITIGATION_DETAILS, payload: [] })
        },
        clearEmissionsData: () => {
            dispatch({ type: ACTION_TYPES.LOAD_MITIGATION_EMISSIONS, payload: [] })
        },
        clearResearchDetails: () => {
            dispatch({ type: ACTION_TYPES.LOAD_RESEARCH_DETAILS, payload: [] })
        },
        loadMoreProjects: () => {
            dispatch({ type: ACTION_TYPES.LOAD_MORE_PROJECTS })
        },
        resetProjectCounts: () => {
            dispatch({ type: ACTION_TYPES.RESET_PROJECT_COUNTS })
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
            end: 10
        }
        this.handleScroll = this.handleScroll.bind(this);
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
            clearResearchDetails, start, end, resetProjectCounts, polygonFilter } = this.props

        if (resetCounts === true) {
            start = 0
            end = 10
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

        let fetchURL = ""
        if (polygonFilter !== "") {
            fetchURL = apiBaseURL + 'api/Projects/GetByPolygon?polygon=' + polygonFilter
        }
        else {
            fetchURL = apiBaseURL + 'api/Projects/GetAll/List?titlePart=' + titleFilter + '&statusId=' + statusFilter +
                '&regionId=' + regionFilter + '&sectorId=' + sectorFilter + '&typologyId=' + typologyFilter +
                '&batchSize=' + 10 + '&batchCount=' + Math.floor(end / 10)
        }

        //Get project list data
        fetch(fetchURL,
            {
                headers: {
                    "Content-Type": "application/json"
                }
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
                {projectlist}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)