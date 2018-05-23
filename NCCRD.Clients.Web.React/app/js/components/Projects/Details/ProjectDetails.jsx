'use strict'

import React from 'react'
import {
    Container, Button, Modal, ModalBody, ModalHeader, ModalFooter,
    Row, Col, TabPane, TabContent, Nav, NavItem, NavLink, Fa
} from 'mdbreact'
import { connect } from 'react-redux'
import EditListModal from './ListEditing/EditListModal.jsx'
import EditTreeModal from './ListEditing/EditTreeModal.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL"
import ProjectDetailsTab from './ProjectDetailsTab.jsx'
import AdaptationDetailsTab from './AdaptationDetailsTab.jsx'
import MitigationDetailsTab from './MitigationDetailsTab.jsx'
import MitigationEmissionsDataTab from './MitigationEmissionsDataTab.jsx'
import ResearchDetailsTab from './ResearchDetailsTab.jsx'
import RangeComponent from '../../Shared/RangeComponent.jsx'
import TextComponent from '../../Shared/TextComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { UILookup } from '../../../constants/ui_config';
import classnames from 'classnames';

const mapStateToProps = (state, props) => {

    let { projectData: { projectDetails } } = state
    let { adaptationData: { adaptationDetails } } = state
    let { mitigationData: { mitigationDetails } } = state
    let { emissionData: { emissionsData } } = state
    let { researchData: { researchDetails } } = state
    let { globalData: { loading, editMode, isAuthenticated } } = state

    let editListModalType = state.editListModalData.type
    let editListModalShow = state.editListModalData.show

    return {
        projectDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails, editMode, loading, isAuthenticated,
        editListModalType, editListModalShow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjectDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_DETAILS, payload })
        },
        loadAdaptationDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_ADAPTATION_DETAILS, payload })
        },
        loadMitigationDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_MITIGATION_DETAILS, payload })
        },
        loadMitigationEmissions: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_MITIGATION_EMISSIONS, payload })
        },
        loadResearchDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_RESEARCH_DETAILS, payload })
        },
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        },
        setEditMode: payload => {
            dispatch({ type: ACTION_TYPES.SET_EDIT_MODE, payload })
        },
        loadProjectTypes: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_TYPE, payload })
        },
        loadProjectSubTypes: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_SUBTYPE, payload })
        },
        loadProjectStatus: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_STATUS, payload })
        },
        loadProjectManagers: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_USERS, payload })
        },
        loadValidationStatus: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_VALIDATION_STATUS, payload })
        },
        loadMAOptions: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_MA_OPTIONS, payload })
        },
        loadAdaptationPurpose: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_ADAPTATION_PURPOSE, payload })
        },
        loadSectors: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR, payload })
        },
        loadSectorType: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR_TYPE, payload })
        },
        loadSectorTree: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR_TREE, payload })
        },
        loadCarbonCredit: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CARBON_CREDIT, payload })
        },
        loadCarbonCreditMarket: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CARBON_CREDIT_MARKET, payload })
        },
        loadCDMStatus: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CDM_STATUS, payload })
        },
        loadCDMMethodology: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CDM_METHODOLOGY, payload })
        },
        loadVoluntaryMethodology: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_VOLUNTARY_METHODOLOGY, payload })
        },
        loadVoluntaryGoldStandard: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_VOLUNTARY_GOLD_STANDARD, payload })
        },
        loadResearchType: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_RESEARCH_TYPE, payload })
        },
        loadTargetAudience: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TARGET_AUDIENCE, payload })
        },
        loadTypology: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TYPOLOGY, payload })
        },
        resetProjectState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_PROJECT_STATE, payload })
        },
        resetAdaptationState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_ADAPTATION_STATE, payload })
        },
        resetMitigationState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_MITIGATION_STATE, payload })
        },
        resetEmissionState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_EMISSION_STATE, payload })
        },
        resetResearchState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_RESEARCH_STATE, payload })
        }
    }
}

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props)

        this.editClick = this.editClick.bind(this)
        this.saveClick = this.saveClick.bind(this)
        this.discardClick = this.discardClick.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.discardChanges = this.discardChanges.bind(this)
        this.backToList = this.backToList.bind(this)
        this.renderListEditor = this.renderListEditor.bind(this)
        this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);

        let projectId = this.props.match.params.id
        this.state = { activeItemClassicTabs1: '1', projectId, discardModal: false, saveModal: false, navBack: false }
    }

    loadProjectType(loadProjectTypes) {
        return fetch(apiBaseURL + 'api/ProjectType/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectTypes(res)
        })
    }

    loadProjectSubType(loadProjectSubTypes) {
        return fetch(apiBaseURL + 'api/ProjectSubType/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectSubTypes(res)
        })
    }

    loadProjectStatus(loadProjectStatus) {
        return fetch(apiBaseURL + 'api/ProjectStatus/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectStatus(res)
        })
    }

    loadProjectManager(loadProjectManagers) {
        return fetch(apiBaseURL + 'api/AppUsr/GetAllBasic', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectManagers(res)
        })
    }

    loadValidationStatus(loadValidationStatus) {
        return fetch(apiBaseURL + 'api/ValidationStatus/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadValidationStatus(res)
        })
    }

    loadMAOption(loadMAOptions) {
        return fetch(apiBaseURL + 'api/MAOptions/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadMAOptions(res)
        })
    }

    loadAdaptationPurpose(loadAdaptationPurpose) {
        return fetch(apiBaseURL + 'api/AdaptationPurpose/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadAdaptationPurpose(res)
        })
    }

    loadSector(loadSectors) {
        return fetch(apiBaseURL + 'api/Sector/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadSectors(res)
        })
    }

    loadSectorType(loadSectorType) {
        return fetch(apiBaseURL + 'api/SectorType/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadSectorType(res)
        })
    }

    loadSectorTree(loadSectorTree) {
        return fetch(apiBaseURL + 'api/Sector/GetAllTree/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadSectorTree(res)
        })
    }

    loadTypology(loadTypology) {
        return fetch(apiBaseURL + 'api/Typology/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadTypology(res)
        })
    }

    loadCarbonCredit(loadCarbonCredit) {
        return fetch(apiBaseURL + 'api/CarbonCredit/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCarbonCredit(res)
        })
    }

    loadCarbonCreditMarket(loadCarbonCreditMarket) {
        return fetch(apiBaseURL + 'api/CarbonCreditMarket/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCarbonCreditMarket(res)
        })
    }

    loadCDMStatus(loadCDMStatus) {
        return fetch(apiBaseURL + 'api/CDMStatus/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCDMStatus(res)
        })
    }

    loadCDMMethodology(loadCDMMethodology) {
        return fetch(apiBaseURL + 'api/CDMMethodology/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCDMMethodology(res)
        })
    }

    loadVoluntaryMethodology(loadVoluntaryMethodology) {
        return fetch(apiBaseURL + 'api/VoluntaryMethodology/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadVoluntaryMethodology(res)
        })
    }

    loadVoluntaryGoldStandard(loadVoluntaryGoldStandard) {
        return fetch(apiBaseURL + 'api/VoluntaryGoldStandard/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadVoluntaryGoldStandard(res)
        })
    }

    loadResearchType(loadResearchType) {
        return fetch(apiBaseURL + 'api/ResearchType/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadResearchType(res)
        })
    }

    loadTargetAudience(loadTargetAudience) {
        return fetch(apiBaseURL + 'api/TargetAudience/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadTargetAudience(res)
        })
    }

    loadProjects(loadProjectDetails) {

        let action

        if (this.state.projectId === 'add') {

            let newProject = {
                "ProjectId": Date().valueOf(),
                "ProjectTitle": "",
                "ProjectDescription": "",
                "LeadAgent": "",
                "HostPartner": "",
                "HostOrganisation": "",
                "StartYear": 0,
                "EndYear": 0,
                "AlternativeContact": "",
                "AlternativeContactEmail": "",
                "Link": "",
                "ValidationComments": "",
                "BudgetLower": 0,
                "BudgetUpper": 0,
                "ProjectTypeId": 0,
                "ProjectSubTypeId": 0,
                "ProjectStatusId": 0,
                "ProjectManagerId": 0,
                "ValidationStatusId": 0,
                "MAOptionId": 0,
                "state": "modified"
            }

            action = loadProjectDetails(newProject)
        }
        else {
            action = fetch(apiBaseURL + 'api/Projects/GetById/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.state = "original"
                loadProjectDetails(res)
            })
        }

        return action
    }

    loadAdaptationDetails(loadAdaptationDetails) {

        let action

        if (this.state.projectId === 'add') {
            action = loadAdaptationDetails([])
        }
        else {
            action = fetch(apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadAdaptationDetails(res)
            })
        }

        return action
    }

    loadMitigationDetails(loadMitigationDetails) {

        let action

        if (this.state.projectId === 'add') {
            action = loadMitigationDetails([])
        }
        else {
            action = fetch(apiBaseURL + 'api/MitigationDetails/GetByProjectId/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadMitigationDetails(res)
            })
        }

        return action
    }

    loadMitigationEmissionsData(loadMitigationEmissions) {

        let action

        if (this.state.projectId === 'add') {
            action = loadMitigationEmissions([])
        }
        else {
            action = fetch(apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID//' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadMitigationEmissions(res)
            })
        }

        return action
    }

    loadResearchDetails(loadResearchDetails) {

        let action

        if (this.state.projectId === 'add') {
            action = loadResearchDetails([])
        }
        else {
            action = fetch(apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadResearchDetails(res)
            })
        }

        return action
    }

    loadData() {

        let { setLoading, setEditMode, projectDetails, loadProjectTypes, loadProjectSubTypes, loadProjectStatus, loadProjectManagers, loadValidationStatus,
            loadProjectDetails, loadAdaptationDetails, loadMitigationDetails, loadMAOptions, loadSectorType, loadTypology,
            loadMitigationEmissions, loadResearchDetails, loadAdaptationPurpose, loadSectors, loadSectorTree, loadCarbonCredit,
            loadCarbonCreditMarket, loadCDMStatus, loadCDMMethodology, loadVoluntaryMethodology, loadVoluntaryGoldStandard,
            loadResearchType, loadTargetAudience } = this.props

        setLoading(true)

        Promise.all([
            this.loadProjectType(loadProjectTypes),
            this.loadProjectSubType(loadProjectSubTypes),
            this.loadProjectStatus(loadProjectStatus),
            this.loadProjectManager(loadProjectManagers),
            this.loadValidationStatus(loadValidationStatus),
            this.loadMAOption(loadMAOptions),
            this.loadProjects(loadProjectDetails),
            this.loadAdaptationDetails(loadAdaptationDetails),
            this.loadMitigationDetails(loadMitigationDetails),
            this.loadMitigationEmissionsData(loadMitigationEmissions),
            this.loadResearchDetails(loadResearchDetails),
            this.loadAdaptationPurpose(loadAdaptationPurpose),
            this.loadSector(loadSectors),
            this.loadSectorType(loadSectorType),
            this.loadSectorTree(loadSectorTree),
            this.loadCarbonCredit(loadCarbonCredit),
            this.loadCarbonCreditMarket(loadCarbonCreditMarket),
            this.loadCDMStatus(loadCDMStatus),
            this.loadCDMMethodology(loadCDMMethodology),
            this.loadVoluntaryMethodology(loadVoluntaryMethodology),
            this.loadVoluntaryGoldStandard(loadVoluntaryGoldStandard),
            this.loadResearchType(loadResearchType),
            this.loadTargetAudience(loadTargetAudience),
            this.loadTypology(loadTypology)
        ])
            .then(() => {
                setLoading(false)
                if (this.state.projectId === 'add') {
                    setEditMode(true)
                }
            })
            .catch(res => {
                setLoading(false)
                console.log("Error details:", res)
                alert("An error occurred while trying to fetch data from the server. Please try again later. (See log for error details)")
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadData()
    }

    editClick() {

        //Will require access right in the future...

        let { setEditMode } = this.props
        setEditMode(true)
    }

    saveClick() {
        this.setState({ saveModal: true })
    }

    saveChanges() {

        let { setEditMode, setLoading, loadProjectDetails, loadAdaptationDetails, loadMitigationDetails, loadMitigationEmissions, loadResearchDetails } = this.props

        //Close modal
        this.setState({ saveModal: false })

        //Save changes to DB
        setLoading(true)

        Promise.all([
            this.SaveProjectChanges(),
            this.SaveAdaptationChanges(),
            this.SaveMitigationChanges(),
            this.SaveEmissionsChanges(),
            this.SaveResearchChanges()
        ]).then(([project, adaptations, mitigations, emissions, research]) => {

            let alertMsg = ""

            if ((!isNaN(project) && project > 0) && adaptations === true && mitigations === true && emissions === true && research === true) {
                setEditMode(false)
                this.loadProjects(loadProjectDetails)
                this.loadAdaptationDetails(loadAdaptationDetails)
                this.loadMitigationDetails(loadMitigationDetails)
                this.loadMitigationEmissionsData(loadMitigationEmissions)
                this.loadResearchDetails(loadResearchDetails)
            }
            else if (isNaN(project) || project < 1) {
                alertMsg = "Unable to save project data."
                if (typeof project.ExceptionMessage !== 'undefined' && project.ExceptionMessage.toString().includes("validation errors")) {
                    alertMsg += "\n\nError(s):\n\n" + project.ExceptionMessage
                }
            }
            else if (adaptations !== true) {
                alertMsg = "Unable to save adaptations data."
                if (typeof adaptations.ExceptionMessage !== 'undefined' && adaptations.ExceptionMessage.toString().includes("validation errors")) {
                    alertMsg += "\n\nError(s):\n\n" + adaptations.ExceptionMessage
                }
            }
            else if (mitigations !== true) {
                alertMsg = "Unable to save mitigations data."
                if (typeof mitigations.ExceptionMessage !== 'undefined' && mitigations.ExceptionMessage.toString().includes("validation errors")) {
                    alertMsg += "\n\nError(s):\n\n" + mitigations.ExceptionMessage
                }
            }
            else if (emissions !== true) {
                alertMsg = "Unable to save emissions data."
                if (typeof emissions.ExceptionMessage !== 'undefined' && emissions.ExceptionMessage.toString().includes("validation errors")) {
                    alertMsg += "\n\nError(s):\n\n" + emissions.ExceptionMessage
                }
            }
            else if (research !== true) {
                alertMsg = "Unable to save research data."
                if (typeof research.ExceptionMessage !== 'undefined' && research.ExceptionMessage.toString().includes("validation errors")) {
                    alertMsg += "\n\nError(s):\n\n" + research.ExceptionMessage
                }
            }

            if (alertMsg !== "") {
                alert(alertMsg)
                console.log(alertMsg)
            }

            setLoading(false)
        })
    }

    SaveProjectChanges() {

        let { projectDetails, resetProjectState } = this.props

        if (projectDetails.state === 'modified') {

            let strPostData = JSON.stringify(projectDetails)
            let url = apiBaseURL + "api/Projects/AddOrUpdate"

            return fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: strPostData
            })
                .then((res) => res.json())
                .then((res) => {

                    if (!isNaN(res) && res > 0) {
                        resetProjectState(projectDetails)
                        this.setState({ projectId: res })
                        location.hash = "/projects/" + res
                    }

                    return res
                })
        }
        else {
            return 1
        }
    }

    SaveAdaptationChanges() {

        let { adaptationDetails, resetAdaptationState } = this.props
        let result = true

        return Promise.all(
            adaptationDetails.map((adaptation) => {

                if (result === true && adaptation.state === "modified") {

                    let strPostData = JSON.stringify(adaptation)
                    let url = apiBaseURL + "api/AdaptationDetails/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {

                            if (result === true && res !== true) {
                                result = res
                            }
                            else if (res === true) {
                                resetAdaptationState(adaptation)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    SaveMitigationChanges() {

        let { mitigationDetails, resetMitigationState } = this.props
        let result = true

        return Promise.all(
            mitigationDetails.map((mitigation) => {

                if (result === true && mitigation.state === "modified") {

                    let strPostData = JSON.stringify(mitigation)
                    let url = apiBaseURL + "api/MitigationDetails/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {

                            if (result === true && res !== true) {
                                result = res
                            }
                            else if (res === true) {
                                resetMitigationState(mitigation)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    SaveEmissionsChanges() {

        let { emissionsData, resetEmissionState } = this.props
        let result = true

        return Promise.all(
            emissionsData.map((emissions) => {

                if (result === true && emissions.state === "modified") {

                    let strPostData = JSON.stringify(emissions)
                    let url = apiBaseURL + "api/MitigationEmissionsData/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {

                            if (result === true && res !== true) {
                                result = res
                            }
                            else if (res === true) {
                                resetEmissionState(emissions)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    SaveResearchChanges() {

        let { researchDetails, resetResearchState } = this.props
        let result = true

        return Promise.all(
            researchDetails.map((research) => {

                if (result === true && research.state === "modified") {

                    let strPostData = JSON.stringify(research)
                    let url = apiBaseURL + "api/ResearchDetails/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {

                            if (result === true && res !== true) {
                                result = res
                            }
                            else if (res === true) {
                                resetResearchState(research)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    discardClick() {
        this.setState({ discardModal: true })
    }

    discardChanges() {

        let { setEditMode, projectDetails } = this.props

        this.setState({ discardModal: false })
        setEditMode(false)

        if (this.state.navBack === true) {
            this.navBack()
        }
        else {
            //Re-load data - discarding changes
            this.loadData()
        }
    }

    navBack() {
        this.props.setLoading(true)
        location.hash = "/projects"
    }

    backToList() {

        let { projectDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails } = this.props
        let dataState = "original"

        if (projectDetails.state !== 'original') {
            dataState = projectDetails.state
        }

        let arraySources = [adaptationDetails, mitigationDetails, emissionsData, researchDetails]
        arraySources.map((source) => {
            if (dataState === "original") {
                source.map((item) => {
                    if (item.state !== 'original') {
                        dataState = item.state
                    }
                })
            }
        })

        if (dataState === "original") {
            this.navBack()
        }
        else {
            this.setState({ navBack: true })
            this.discardClick()
        }
    }

    renderListEditor() {

        let { editListModalType, editListModalShow } = this.props

        if (editListModalShow === true) {
            if (editListModalType === "std") {
                return <EditListModal />
            }
            else if (editListModalType === "tree") {
                return <EditTreeModal />
            }
        }
    }

    toggleClassicTabs1(tab) {
        if (this.state.activeItemClassicTabs1 !== tab) {
            this.setState({
                activeItemClassicTabs1: tab
            });
        }
    }

    render() {

        const { projectDetails, editMode, isAuthenticated } = this.props

        return (

            <>
                <Button style={{ width: "100px", margin: "8px 0px 8px 0px" }} color="secondary" size="sm" id="btnBackToList" onTouchTap={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back
                </Button>

                <br />

                <Container className="mt-2">
                    <Row>
                        <Col md="12">
                            <Nav pills color="primary" className="nav-justified" style={{ borderBottom: "1px solid #727272" }}>
                                <NavItem >
                                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '1' })} onClick={() => { this.toggleClassicTabs1('1'); }}>
                                        Project
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '2' })} onClick={() => { this.toggleClassicTabs1('2'); }}>
                                        Adaptation
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '3' })} onClick={() => { this.toggleClassicTabs1('3'); }}>
                                        Mitigation
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '4' })} onClick={() => { this.toggleClassicTabs1('4'); }}>
                                        Emissions
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '5' })} onClick={() => { this.toggleClassicTabs1('5'); }}>
                                        Research
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            {/* <hr /> */}
                            <TabContent activeItem={this.state.activeItemClassicTabs1}>
                                <TabPane tabId="1">
                                    <ProjectDetailsTab />
                                    <br />
                                    <br />
                                    <br />
                                </TabPane>
                                <TabPane tabId="2">
                                    <AdaptationDetailsTab projectId={projectDetails.ProjectId} />
                                    <br />
                                    <br />
                                    <br />
                                </TabPane>
                                <TabPane tabId="3">
                                    <MitigationDetailsTab projectId={projectDetails.ProjectId} />
                                    <br />
                                    <br />
                                    <br />
                                </TabPane>
                                <TabPane tabId="4">
                                    <MitigationEmissionsDataTab projectId={projectDetails.ProjectId} />
                                    <br />
                                    <br />
                                    <br />
                                </TabPane>
                                <TabPane tabId="5">
                                    <ResearchDetailsTab projectId={projectDetails.ProjectId} />
                                    <br />
                                    <br />
                                    <br />
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>

                <div className="container-fluid" hidden={!isAuthenticated}>
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ position: "fixed", right: "14%", bottom: "10px", zIndex: "99" }}>
                                <Button hidden={editMode} data-tip="Edit" tag="a" size="sm" floating color="purple" onClick={this.editClick}>
                                    <Fa icon="pencil" />
                                </Button>
                                <Button hidden={!editMode} data-tip="Save changes" tag="a" size="sm" floating color="purple" onClick={this.saveClick}>
                                    <Fa icon="save" />
                                </Button>
                                <Button hidden={!editMode} data-tip="Discard changes" tag="a" size="sm" floating color="purple" onClick={this.discardClick}>
                                    <Fa icon="trash" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Container>
                    <Modal isOpen={this.state.discardModal} backdrop={false}>
                        <ModalHeader toggle={this.toggle}>Confirm Discard</ModalHeader>
                        <ModalBody>
                            Are you sure you want to discard all changes?
                    </ModalBody>
                        <ModalFooter>
                            <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ discardModal: false })} >Cancel</Button>{' '}
                            <Button size="sm" style={{ width: "100px" }} color="primary" onClick={this.discardChanges} >Discard</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

                <Container>
                    <Modal isOpen={this.state.saveModal} backdrop={false}>
                        <ModalHeader toggle={this.toggle}>Confirm Save</ModalHeader>
                        <ModalBody>
                            Are you sure you want to save all changes?
                    </ModalBody>
                        <ModalFooter>
                            <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ saveModal: false })} >Cancel</Button>{' '}
                            <Button size="sm" style={{ width: "100px" }} color="warning" onClick={this.saveChanges} >Save</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

                {this.renderListEditor()}

                <ReactTooltip delayShow={700} />

            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)