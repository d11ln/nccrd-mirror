'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import { LOAD_PROJECT_DETAILS, SET_LOADING } from "../constants/action-types"
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
    let { loadingData: { loading } } = state
    return { projectDetails, loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjectDetails: payload => {
            dispatch({ type: LOAD_PROJECT_DETAILS, payload })
        },
        setLoading: payload => {
            dispatch({ type: SET_LOADING, payload })
        }
    }
}

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props)

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

    render() {

        const { projectDetails } = this.props

        return (
            <div>

                <div
                    hidden={!this.props.loading}
                    className="card"
                    style={{ position: "fixed", right: "40%", bottom: "42%", zIndex: "999", background: "#5499c7" }}>

                    <div className="card-body" style={{ margin: "30px 80px 30px 80px" }}>
                        <label style={{ fontSize: "x-large", fontWeight: "bold", color: "#f8f9f9" }}>LOADING</label>
                        <BeatLoader
                            color={' #a9cce3 '}
                            size={30}
                            loading={this.props.loading}
                        />
                    </div>
                </div>

                <br />
                <div className="row">

                    <div className="col-md-9">
                        <table style={{ marginTop: "-10px" }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Button color="secondary" size="sm" id="btnBackToList" onTouchTap={() => location.hash = "/projects"}>
                                            <i className="fa fa-chevron-circle-left" aria-hidden="true"></i><br />Back
                                        </Button>
                                    </td>
                                    <td>
                                        <label style={{ display: "inline", fontSize: "x-large" }}><b>Project Title: </b>{projectDetails.ProjectTitle}</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <RangeComponent col="col-md-3" align="center" size="x-large" readOnly="true" id="txtYear" label="" inputWidth="75px" valueFrom={projectDetails.StartYear} valueTo={projectDetails.EndYear} />
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

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)