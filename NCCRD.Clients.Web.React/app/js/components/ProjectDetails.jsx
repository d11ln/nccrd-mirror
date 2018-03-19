'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'

import 
{ 
    LOAD_PROJECT_DETAILS, 
    SET_LOADING, 
    SET_EDIT_MODE, 
    SET_PROJECT_DETAILS_YEAR_FROM, 
    SET_PROJECT_DETAILS_YEAR_TO 
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
    let { projectData: { projectDetails, editMode } } = state
    let { loadingData: { loading } } = state
    return { projectDetails, editMode, loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjectDetails: payload => {
            dispatch({ type: LOAD_PROJECT_DETAILS, payload })
        },
        setLoading: payload => {
            dispatch({ type: SET_LOADING, payload })
        },
        setEditMode: payload => {
            dispatch({ type: SET_EDIT_MODE, payload })
        }
    }
}

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props)

        this.editClick = this.editClick.bind(this)
        this.saveClick = this.saveClick.bind(this)
        this.discardClick = this.discardClick.bind(this)

        let projectId = this.props.match.params.id
        this.state = { ...this.state, projectId }
    }

    componentDidMount() {

        //Load ProjectType
        let { loadProjectDetails, setLoading } = this.props

        setLoading(true)

        fetch(apiBaseURL + 'api/Projects/GetById/' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectDetails(res)
            setLoading(false)
        })

    }

    editClick() {

        let { setEditMode } = this.props
        setEditMode(true)
    }

    saveClick() {

        let { setEditMode } = this.props
        setEditMode(false)
    }

    discardClick() {

        let { setEditMode } = this.props
        setEditMode(false)
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
                        <AdaptationDetailsTab projectId={this.state.projectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <MitigationDetailsTab projectId={this.state.projectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <MitigationEmissionsDataTab projectId={this.state.projectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <ResearchDetailsTab projectId={this.state.projectId} />
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

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)