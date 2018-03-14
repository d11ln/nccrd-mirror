'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import { LOAD_PROJECT_DETAILS } from "../constants/action-types"
import { apiBaseURL } from "../constants/apiBaseURL"
import ProjectDetailsTab from './ProjectDetailsTab.jsx'
import AdaptationDetailsTab from './AdaptationDetailsTab.jsx'
import RangeComponent from './RangeComponent.jsx'

//react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const mapStateToProps = (state, props) => {
    let { projectData: { projectDetails } } = state
    return { projectDetails }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjectDetails: payload => {
            dispatch({ type: LOAD_PROJECT_DETAILS, payload })
        }
    }
}

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props)

        let projectId = this.props.match.params.id
        this.state = {...this.state, projectId}
    }

    componentDidMount() {
  
        //Load ProjectType
        let { loadProjectDetails } = this.props

        fetch(apiBaseURL + 'api/Projects/GetById/' + this.state.projectId, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectDetails(res)
        })

    }

    render() {

        const { projectDetails } = this.props

        return (
            <div>
                <br />
                <div className="row">

                    <div className="col-md-9">
                        <table style={{marginTop: "-10px"}}>
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
                    </TabPanel>
                    <TabPanel>
                        <AdaptationDetailsTab projectId={this.state.projectId} />
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 3</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 4</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 5</h2>
                    </TabPanel>
                </Tabs>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)