'use strict'

import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import { connect } from 'react-redux'

import {
    LOAD_PROJECT_DETAILS, SET_LOADING, SET_EDIT_MODE, SET_PROJECT_DETAILS_YEAR_FROM, SET_PROJECT_DETAILS_YEAR_TO,
    LOAD_ADAPTATION_DETAILS, LOAD_MITIGATION_DETAILS, LOAD_MITIGATION_EMISSIONS, LOAD_RESEARCH_DETAILS,
    LOAD_ADAPTATION_PURPOSE, LOAD_SECTOR, LOAD_CARBON_CREDIT, LOAD_CARBON_CREDIT_MARKET, LOAD_CDM_STATUS,
    LOAD_CDM_METHODOLOGY, LOAD_VOLUNTARY_METHODOLOGY, LOAD_VOLUNTARY_GOLD_STANDARD, LOAD_RESEARCH_TYPE,
    LOAD_TARGET_AUDIENCE, LOAD_PROJECT_TYPE, LOAD_PROJECT_SUBTYPE, LOAD_PROJECT_STATUS, LOAD_USERS,
    LOAD_VALIDATION_STATUS, LOAD_MA_OPTIONS
} from "../constants/action-types"

import { apiBaseURL } from "../constants/apiBaseURL"
import ProjectDetailsTab from './ProjectDetailsTab.jsx'
import AdaptationDetailsTab from './AdaptationDetailsTab.jsx'
import MitigationDetailsTab from './MitigationDetailsTab.jsx'
import MitigationEmissionsDataTab from './MitigationEmissionsDataTab.jsx'
import ResearchDetailsTab from './ResearchDetailsTab.jsx'
import RangeComponent from './RangeComponent.jsx'
import { BeatLoader } from 'react-spinners';

//react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const mapStateToProps = (state, props) => {
    let { projectData: { projectDetails } } = state
    let { adaptationData: { adaptationDetails } } = state
    let { mitigationData: { mitigationDetails } } = state
    let { emissionData: { emissionsData } } = state
    let { researchData: { researchDetails } } = state
    let { globalData: { loading, editMode } } = state
    return { projectDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails, editMode, loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjectDetails: payload => {
            dispatch({ type: LOAD_PROJECT_DETAILS, payload })
        },
        loadAdaptationDetails: payload => {
            dispatch({ type: LOAD_ADAPTATION_DETAILS, payload })
        },
        loadMitigationDetails: payload => {
            dispatch({ type: LOAD_MITIGATION_DETAILS, payload })
        },
        loadMitigationEmissions: payload => {
            dispatch({ type: LOAD_MITIGATION_EMISSIONS, payload })
        },
        loadResearchDetails: payload => {
            dispatch({ type: LOAD_RESEARCH_DETAILS, payload })
        },
        setLoading: payload => {
            dispatch({ type: SET_LOADING, payload })
        },
        setEditMode: payload => {
            dispatch({ type: SET_EDIT_MODE, payload })
        },
        loadProjectTypes: payload => {
            dispatch({ type: LOAD_PROJECT_TYPE, payload })
        },
        loadProjectSubTypes: payload => {
            dispatch({ type: LOAD_PROJECT_SUBTYPE, payload })
        },
        loadProjectStatus: payload => {
            dispatch({ type: LOAD_PROJECT_STATUS, payload })
        },
        loadProjectManagers: payload => {
            dispatch({ type: LOAD_USERS, payload })
        },
        loadValidationStatus: payload => {
            dispatch({ type: LOAD_VALIDATION_STATUS, payload })
        },
        loadMAOptions: payload => {
            dispatch({ type: LOAD_MA_OPTIONS, payload })
        },
        loadAdaptationPurpose: payload => {
            dispatch({ type: LOAD_ADAPTATION_PURPOSE, payload })
        },
        loadSectors: payload => {
            dispatch({ type: LOAD_SECTOR, payload })
        },
        loadCarbonCredit: payload => {
            dispatch({ type: LOAD_CARBON_CREDIT, payload })
        },
        loadCarbonCreditMarket: payload => {
            dispatch({ type: LOAD_CARBON_CREDIT_MARKET, payload })
        },
        loadCDMStatus: payload => {
            dispatch({ type: LOAD_CDM_STATUS, payload })
        },
        loadCDMMethodology: payload => {
            dispatch({ type: LOAD_CDM_METHODOLOGY, payload })
        },
        loadVoluntaryMethodology: payload => {
            dispatch({ type: LOAD_VOLUNTARY_METHODOLOGY, payload })
        },
        loadVoluntaryGoldStandard: payload => {
            dispatch({ type: LOAD_VOLUNTARY_GOLD_STANDARD, payload })
        },
        loadResearchType: payload => {
            dispatch({ type: LOAD_RESEARCH_TYPE, payload })
        },
        loadTargetAudience: payload => {
            dispatch({ type: LOAD_TARGET_AUDIENCE, payload })
        },
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

        let projectId = this.props.match.params.id
        this.state = { ...this.state, projectId, discardModal: false, saveModal: false }
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

    loadProjects(loadProjectDetails) {
        return fetch(apiBaseURL + 'api/Projects/GetById/' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectDetails(res)
        })
    }

    loadAdaptationDetails(loadAdaptationDetails) {
        return fetch(apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadAdaptationDetails(res)
        })
    }

    loadMitigationDetails(loadMitigationDetails) {
        return fetch(apiBaseURL + 'api/MitigationDetails/GetByProjectId/' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadMitigationDetails(res)
        })
    }

    loadMitigationEmissionsData(loadMitigationEmissions) {
        return fetch(apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID//' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadMitigationEmissions(res)
        })
    }

    loadResearchDetails(loadResearchDetails) {
        return fetch(apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadResearchDetails(res)
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

    loadData() {

        let { setLoading, projectDetails, loadProjectTypes, loadProjectSubTypes, loadProjectStatus, loadProjectManagers, loadValidationStatus,
            loadProjectDetails, loadAdaptationDetails, loadMitigationDetails, loadMAOptions,
            loadMitigationEmissions, loadResearchDetails, loadAdaptationPurpose, loadSectors, loadCarbonCredit,
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
            this.loadCarbonCredit(loadCarbonCredit),
            this.loadCarbonCreditMarket(loadCarbonCreditMarket),
            this.loadCDMStatus(loadCDMStatus),
            this.loadCDMMethodology(loadCDMMethodology),
            this.loadVoluntaryMethodology(loadVoluntaryMethodology),
            this.loadVoluntaryGoldStandard(loadVoluntaryGoldStandard),
            this.loadResearchType(loadResearchType),
            this.loadTargetAudience(loadTargetAudience)
        ]).then(() => { setLoading(false) })
    }

    componentDidMount() {
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

        let { setEditMode, setLoading } = this.props
        
        setEditMode(false)
        this.setState({ saveModal: false })

        //Save changes to DB
        setLoading(true)

        Promise.all([
            this.SaveProjectChanges(),
            this.SaveAdaptationChanges(),
            this.SaveMitigationChanges(),
            this.SaveEmissionsChanges(),
            this.SaveResearchChanges()
        ]).then(() => {setLoading(false)})
    }

    SaveProjectChanges() {

        let { projectDetails } = this.props

        //Validate data...

        let strPostData = JSON.stringify(projectDetails)
        let url = apiBaseURL + "api/Projects/AddOrUpdate"

        fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: strPostData
        })
            .then(res => res.json())
            .then((res) => {
                if (res !== true) {
                    alert("Unable to save project data. See log for errors.")
                    console.log('Error:', res)
                }
            })
    }

    SaveAdaptationChanges() {

        let { adaptationDetails } = this.props

        adaptationDetails.forEach(element => {

            //Validate data...

            let strPostData = JSON.stringify(element)
            let url = apiBaseURL + "api/AdaptationDetails/AddOrUpdate"

            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: strPostData
            })
                .then(res => res.json())
                .then((res) => {
                    if (res !== true) {
                        alert("Unable to save adaptation data. See log for errors.")
                        console.log('Error:', res)
                    }
                })
        });
    }

    SaveMitigationChanges() {

        let { mitigationDetails } = this.props

        mitigationDetails.forEach(element => {

            //Validate data...

            let strPostData = JSON.stringify(element)
            let url = apiBaseURL + "api/MitigationDetails/AddOrUpdate"

            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: strPostData
            })
                .then(res => res.json())
                .then((res) => {
                    if (res !== true) {
                        alert("Unable to save mitigation data. See log for errors.")
                        console.log('Error:', res)
                    }
                })
        });
    }

    SaveEmissionsChanges() {
        let { emissionsData } = this.props

        emissionsData.forEach(element => {

            //Validate data...

            let strPostData = JSON.stringify(element)
            let url = apiBaseURL + "api/MitigationEmissionsData/AddOrUpdate"

            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: strPostData
            })
                .then(res => res.json())
                .then((res) => {
                    if (res !== true) {
                        alert("Unable to save emissions data. See log for errors.")
                        console.log('Error:', res)
                    }
                })
        });
    }

    SaveResearchChanges() {
        let { researchDetails } = this.props

        researchDetails.forEach(element => {

            //Validate data...

            let strPostData = JSON.stringify(element)
            let url = apiBaseURL + "api/ResearchDetails/AddOrUpdate"

            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: strPostData
            })
                .then(res => res.json())
                .then((res) => {
                    if (res !== true) {
                        alert("Unable to save research data. See log for errors.")
                        console.log('Error:', res)
                    }
                })
        });
    }

    discardClick() {
        this.setState({ discardModal: true })
    }

    discardChanges() {
        this.setState({ discardModal: false })

        let { setEditMode, projectDetails } = this.props
        setEditMode(false)

        //Re-load data - discarding changes
        this.loadData()
    }

    render() {

        const { projectDetails, editMode } = this.props

        return (
            <div>

                <div
                    hidden={!this.props.loading}
                    className="card"
                    style={{ position: "fixed", right: "40%", bottom: "42%", zIndex: "99", background: "white" }}>

                    <div className="card-body" style={{ margin: "30px 80px 30px 80px" }}>
                        <label style={{ fontSize: "x-large", fontWeight: "bold", color: "#4285F4" }}>LOADING</label>
                        <BeatLoader
                            color={'#4285F4'}
                            size={30}
                            loading={this.props.loading}
                        />
                    </div>
                </div>

                <br />
                <div className="row">

                    <div className="col-md-9">
                        <table >
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <Button style={{ width: "100px", marginTop: "3px" }} color="secondary" size="sm" id="btnBackToList" onTouchTap={() => location.hash = "/projects"}>
                                            <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back
                                        </Button>
                                    </td>
                                    <td>
                                        <p style={{ fontSize: "x-large" }}><b>Project Title: </b>{projectDetails.ProjectTitle}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <RangeComponent
                        col="col-md-3"
                        align="center"
                        size="x-large"
                        id="txtYear"
                        label=""
                        inputWidth="75px"
                        valueFrom={projectDetails.StartYear} valueTo={projectDetails.EndYear}
                        setValueFromKey={SET_PROJECT_DETAILS_YEAR_FROM}
                        setValueToKey={SET_PROJECT_DETAILS_YEAR_TO}
                    />
                </div>

                <br />

                <Tabs>
                    <TabList>
                        <Tab><b style={{ color: "steelblue" }}>Project Details</b></Tab>
                        <Tab><b style={{ color: "steelblue" }}>Adaptation Details</b></Tab>
                        <Tab><b style={{ color: "steelblue" }}>Mitigation Details</b></Tab>
                        <Tab><b style={{ color: "steelblue" }}>Mitigation Emissions Data</b></Tab>
                        <Tab><b style={{ color: "steelblue" }}>Research Details</b></Tab>
                    </TabList>

                    <TabPanel>
                        <ProjectDetailsTab />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <AdaptationDetailsTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <MitigationDetailsTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <MitigationEmissionsDataTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <ResearchDetailsTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                </Tabs>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ position: "fixed", right: "14%", bottom: "10px", zIndex: "99" }}>
                                <Button hidden={editMode} style={{ width: "125px" }} color="secondary" className="btn-sm" onTouchTap={this.editClick} >
                                    <i className="fa fa-pencil" aria-hidden="true" />
                                    &nbsp;&nbsp;
                                    Edit
                                </Button>
                                <Button hidden={!editMode} style={{ width: "125px" }} color="secondary" className="btn-sm" onTouchTap={this.saveClick} >
                                    <i className="fa fa-save" aria-hidden="true" />
                                    &nbsp;&nbsp;
                                    Save
                                </Button>
                                <Button hidden={!editMode} style={{ width: "125px" }} color="secondary" className="btn-sm" onTouchTap={this.discardClick} >
                                    <i className="fa fa-trash-o" aria-hidden="true" />
                                    &nbsp;&nbsp;
                                    Discard
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.discardModal}>
                    <ModalHeader toggle={this.toggle}>Confirm Discard</ModalHeader>
                    <ModalBody>
                        Are you want to discard all changes?
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ discardModal: false })} >Cancel</Button>{' '}
                        <Button size="sm" style={{ width: "100px" }} color="primary" onClick={this.discardChanges} >Discard</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.saveModal}>
                    <ModalHeader toggle={this.toggle}>Confirm Save</ModalHeader>
                    <ModalBody>
                        Are you want to save all changes?
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ saveModal: false })} >Cancel</Button>{' '}
                        <Button size="sm" style={{ width: "100px" }} color="warning" onClick={this.saveChanges} >Save</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)