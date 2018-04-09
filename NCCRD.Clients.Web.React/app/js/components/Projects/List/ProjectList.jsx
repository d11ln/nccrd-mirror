'use strict'

import React from 'react'
import ProjectCard from './ProjectCard.jsx'
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL"

const mapStateToProps = (state, props) => {
    let { projectData: { projects } } = state
    let { filterData: { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter } } = state
    return { projects, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
            sectorFilter: 0
        }
    }

    getProjectList() {

        let { loadProjects, setLoading, titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter,
                clearProjectDetails, clearAdaptationDetails, clearMitigationDetails, clearEmissionsData, 
                clearResearchDetails } = this.props

        this.setState({
            titleFilter: titleFilter,
            statusFilter: statusFilter,
            typologyFilter: typologyFilter,
            regionFilter: regionFilter,
            sectorFilter: sectorFilter
        })

        setLoading(true)

        //Clear details data
        clearProjectDetails()
        clearAdaptationDetails()
        clearMitigationDetails()
        clearEmissionsData()
        clearResearchDetails()

        //Get project list data
        fetch(apiBaseURL + 'api/Projects/GetAll/List?titlePart=' + titleFilter + '&statusId=' + statusFilter +
            '&regionId=' + regionFilter + '&sectorId=' + sectorFilter + '&typologyId=' + typologyFilter,
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
    }

    componentDidUpdate() {

        let pTitleFilter = this.props.titleFilter
        let pStatusFilter = this.props.statusFilter
        let pTypologyFilter = this.props.typologyFilter
        let pRegionFilter = this.props.regionFilter
        let pSectorFilter = this.props.sectorFilter

        let { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter } = this.state

        //If any filters changed...refetch projects
        if (pTitleFilter !== titleFilter || pStatusFilter !== statusFilter || pTypologyFilter !== typologyFilter ||
            pRegionFilter !== regionFilter || pSectorFilter !== sectorFilter) {

            this.getProjectList()
        }
    }

    buildList() {

        const { projects } = this.props
        let ar = []
        if (typeof projects !== 'undefined') {
            for (let i of projects) {
                // Limit amount of projects shown on page
                if(ar.length == 10){
                    return ar
                }
                ar.push(<ProjectCard key={i.ProjectId} pid={i.ProjectId} ptitle={i.ProjectTitle} pdes={i.ProjectDescription} />)
            }
            return ar
        }
        return <div />
    }

    render() {
        return (
            <div>
                {this.buildList()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)