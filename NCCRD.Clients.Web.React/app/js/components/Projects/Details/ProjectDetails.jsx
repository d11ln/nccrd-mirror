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
  let { globalData: { loading, editMode } } = state
  let editListModalType = state.editListModalData.type
  let editListModalShow = state.editListModalData.show
  let user = state.oidc.user

  return {
    projectDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails, editMode, loading,
    editListModalType, editListModalShow, user
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
    },
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    addAdaptationDetails: payload => {
      dispatch({ type: ACTION_TYPES.ADD_ADAPTATION_DETAILS, payload })
    },
    addMitigationDetails: payload => {
      dispatch({ type: ACTION_TYPES.ADD_MITIGATION_DETAILS, payload })
    },
    addMitigationEmissions: payload => {
      dispatch({ type: ACTION_TYPES.ADD_MITIGATION_EMISSIONS, payload })
    },
    addResearchDetails: payload => {
      dispatch({ type: ACTION_TYPES.ADD_RESEARCH_DETAILS, payload })
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
    this.toggleTabs = this.toggleTabs.bind(this);
    this.addClick = this.addClick.bind(this)

    let projectId = this.props.match.params.id
    this.state = { activeItemTabs: '1', projectId, discardModal: false, saveModal: false, navBack: false }
  }

  loadData() {

    let { setLoading, setEditMode, projectDetails, loadProjectTypes, loadProjectSubTypes, loadProjectStatus, loadProjectManagers, loadValidationStatus,
      loadProjectDetails, loadAdaptationDetails, loadMitigationDetails, loadSectorType, loadTypology,
      loadMitigationEmissions, loadResearchDetails, loadAdaptationPurpose, loadSectors, loadSectorTree, loadCarbonCredit,
      loadCarbonCreditMarket, loadCDMStatus, loadCDMMethodology, loadVoluntaryMethodology, loadVoluntaryGoldStandard,
      loadResearchType, loadTargetAudience, user } = this.props

    setLoading(true)
    setEditMode(false)

    if ((!user || user.expired) && this.state.projectId === 'add') {
      location.hash = "/projects"
    }

    let fetchURL = apiBaseURL + "ProjectDetails(" + this.state.projectId + ")?$expand="
      + "Project"
      + ",AdaptationDetails"
      + ",MitigationDetails"
      + ",MitigationEmissionsData"
      + ",ResearchDetails"
      + ",AdaptationPurposes"
      + ",CarbonCredits"
      + ",CarbonCreditMarkets"
      + ",CDMMethodologies"
      + ",CDMStatuses"
      + ",ProjectStatuses"
      + ",ProjectSubTypes"
      + ",ProjectTypes"
      + ",ResearchTypes"
      + ",Sectors"
      + ",SectorTypes"
      + ",TargetAudiences"
      + ",Typologies"
      + ",Users"
      + ",ValidationStatuses"
      + ",VoluntaryGoldStandards"
      + ",VoluntaryMethodologies"

    return fetch(fetchURL, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(res => {
        setLoading(false)
        if (this.state.projectId === 'add') {
          setEditMode(true)
        }

        //Dispatch results
        loadProjectDetails(res.Project)

        loadAdaptationDetails(res.AdaptationDetails)
        loadMitigationDetails(res.MitigationDetails)
        loadMitigationEmissions(res.MitigationEmissionsData)
        loadResearchDetails(res.ResearchDetails)

        loadAdaptationPurpose(res.AdaptationPurposes)
        loadCarbonCredit(res.CarbonCredits)
        loadCarbonCreditMarket(res.CarbonCreditMarkets)
        loadCDMMethodology(res.CDMMethodologies)
        loadCDMStatus(res.CDMStatuses)
        loadProjectStatus(res.ProjectStatuses)
        loadProjectTypes(res.ProjectTypes)
        loadProjectSubTypes(res.ProjectSubTypes)
        loadResearchType(res.ResearchTypes)
        loadSectors(res.Sectors)
        loadSectorType(res.SectorTypes)
        loadTargetAudience(res.TargetAudiences)
        loadTypology(res.Typologies)
        loadProjectManagers(res.Users)
        loadValidationStatus(res.ValidationStatuses)
        loadVoluntaryGoldStandard(res.VoluntaryGoldStandards)
        loadVoluntaryMethodology(res.VoluntaryMethodologies)
      })
      .catch(res => {
        setLoading(false)
        console.log("Error details:", res)
        alert("An error occurred while trying to fetch data from the server. Please try again later. (See log for error details)")
      })

  }

  componentDidMount() {
    this.props.updateNav(location.hash)
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

      // let alertMsg = ""

      if ((!isNaN(project) && project > 0) && adaptations === true && mitigations === true && emissions === true && research === true) {
        setEditMode(false)
        this.loadProjects(loadProjectDetails)
        this.loadAdaptationDetails(loadAdaptationDetails)
        this.loadMitigationDetails(loadMitigationDetails)
        this.loadMitigationEmissionsData(loadMitigationEmissions)
        this.loadResearchDetails(loadResearchDetails)
      }
      // else if (isNaN(project) || project < 1) {
      //   alertMsg = "Unable to save project data."
      //   if (typeof project.ExceptionMessage !== 'undefined' && project.ExceptionMessage.toString().includes("validation errors")) {
      //     alertMsg += "\n\nError(s):\n\n" + project.ExceptionMessage
      //   }
      // }
      // else if (adaptations !== true) {
      //   alertMsg = "Unable to save adaptations data."
      //   if (typeof adaptations.ExceptionMessage !== 'undefined' && adaptations.ExceptionMessage.toString().includes("validation errors")) {
      //     alertMsg += "\n\nError(s):\n\n" + adaptations.ExceptionMessage
      //   }
      // }
      // else if (mitigations !== true) {
      //   alertMsg = "Unable to save mitigations data."
      //   if (typeof mitigations.ExceptionMessage !== 'undefined' && mitigations.ExceptionMessage.toString().includes("validation errors")) {
      //     alertMsg += "\n\nError(s):\n\n" + mitigations.ExceptionMessage
      //   }
      // }
      // else if (emissions !== true) {
      //   alertMsg = "Unable to save emissions data."
      //   if (typeof emissions.ExceptionMessage !== 'undefined' && emissions.ExceptionMessage.toString().includes("validation errors")) {
      //     alertMsg += "\n\nError(s):\n\n" + emissions.ExceptionMessage
      //   }
      // }
      // else if (research !== true) {
      //   alertMsg = "Unable to save research data."
      //   if (typeof research.ExceptionMessage !== 'undefined' && research.ExceptionMessage.toString().includes("validation errors")) {
      //     alertMsg += "\n\nError(s):\n\n" + research.ExceptionMessage
      //   }
      // }

      // if (alertMsg !== "") {
      //   alert(alertMsg)
      //   console.log(alertMsg)
      // }

      setLoading(false)
    })
  }

  SaveProjectChanges() {

    let { projectDetails, resetProjectState, user } = this.props

    if (projectDetails.state === 'modified') {

      projectDetails["@odata.type"] = "NCCRD.Services.DataV2.DBModels.Project"
      let strPostData = JSON.stringify(projectDetails)
      let url = apiBaseURL + "Projects"

      console.log(projectDetails)

      return fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;odata.metadata=minimal',
          'Accept': 'application/json',
          "Authorization": "Bearer " + (user === null ? "" : user.access_token)
        },
        body: projectDetails
      })
        .then((res) => res.json())
        .then((res) => {

          //console.log(res)

          // if (!isNaN(res) && res > 0) {
          if (res.code === 200) {
            resetProjectState(projectDetails)
            this.setState({ projectId: res })
            location.hash = "/projects/" + res
          }
          else {
            alert("Unable to save Project.\n\n" + res.error.message)
            console.log("Unable to save Project.", res.error)
          }

          return res
        })
    }
    else {
      return 1
    }
  }

  SaveAdaptationChanges() {

    let { adaptationDetails, resetAdaptationState, user } = this.props
    let result = true

    return Promise.all(
      adaptationDetails.map((adaptation) => {

        if (result === true && adaptation.state === "modified") {

          let strPostData = JSON.stringify(adaptation)
          let url = apiBaseURL + "api/AdaptationDetails/AddOrUpdate"

          return fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + (user === null ? "" : user.access_token)
            },
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

    let { mitigationDetails, resetMitigationState, user } = this.props
    let result = true

    return Promise.all(
      mitigationDetails.map((mitigation) => {

        if (result === true && mitigation.state === "modified") {

          let strPostData = JSON.stringify(mitigation)
          let url = apiBaseURL + "api/MitigationDetails/AddOrUpdate"

          return fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + (user === null ? "" : user.access_token)
            },
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

    let { emissionsData, resetEmissionState, user } = this.props
    let result = true

    return Promise.all(
      emissionsData.map((emissions) => {

        if (result === true && emissions.state === "modified") {

          let strPostData = JSON.stringify(emissions)
          let url = apiBaseURL + "api/MitigationEmissionsData/AddOrUpdate"

          return fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + (user === null ? "" : user.access_token)
            },
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

    let { researchDetails, resetResearchState, user } = this.props
    let result = true

    return Promise.all(
      researchDetails.map((research) => {

        if (result === true && research.state === "modified") {

          let strPostData = JSON.stringify(research)
          let url = apiBaseURL + "api/ResearchDetails/AddOrUpdate"

          return fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + (user === null ? "" : user.access_token)
            },
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

    if (projectDetails.state !== 'original' && typeof projectDetails.state !== 'undefined') {
      dataState = projectDetails.state
    }

    let arraySources = [adaptationDetails, mitigationDetails, emissionsData, researchDetails]
    arraySources.map(source => {
      if (dataState === "original") {
        source.map((item) => {
          if (item.state !== 'original' && typeof item.state !== 'undefined') {
            console.log("item.state", item.state)
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

  toggleTabs(tab) {

    if (this.state.activeItemTabs !== tab) {
      this.setState({
        activeItemTabs: tab
      });
    }
  }

  addClick() {
    let projectId = this.props.projectDetails.ProjectId
    let activeTabId = this.state.activeItemTabs

    switch (activeTabId) {
      case "2":
        this.props.addAdaptationDetails(projectId);
        break;

      case "3":
        this.props.addMitigationDetails(projectId)
        break;

      case "4":
        this.props.addMitigationEmissions(projectId)
        break;

      case "5":
        this.props.addResearchDetails(projectId)
        break;
    }
  }

  render() {

    let { projectDetails, editMode, user } = this.props
    let activeTabId = this.state.activeItemTabs

    return (
      <>
        <Container className="mt-2">
          <Row>
            <Col md="12">
              <Nav pills color="default" className="nav-justified" style={{ border: "1px solid gainsboro", backgroundColor: "whitesmoke", marginBottom: "-20px" }}>
                <NavItem >
                  <NavLink to="#" className={classnames({ active: activeTabId === '1' })} onClick={() => { this.toggleTabs('1'); }}>
                    Project
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className={classnames({ active: activeTabId === '2' })} onClick={() => { this.toggleTabs('2'); }}>
                    Adaptation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className={classnames({ active: activeTabId === '3' })} onClick={() => { this.toggleTabs('3'); }}>
                    Mitigation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className={classnames({ active: activeTabId === '4' })} onClick={() => { this.toggleTabs('4'); }}>
                    Emissions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className={classnames({ active: activeTabId === '5' })} onClick={() => { this.toggleTabs('5'); }}>
                    Research
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeItem={activeTabId}>
                <TabPane tabId="1">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="secondary" size="sm" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <ProjectDetailsTab />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="2">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="secondary" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <AdaptationDetailsTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="3">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="secondary" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <MitigationDetailsTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="4">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="secondary" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <MitigationEmissionsDataTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="5">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="secondary" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <ResearchDetailsTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>

        <div className="container-fluid" hidden={!user || user.expired}>
          <div className="row">
            <div className="col-md-12">
              <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>

                {!editMode &&
                  <div>
                    <Button /*data-tip="Edit"*/ size="sm" floating color="default" onClick={this.editClick}>
                      <Fa icon="pencil" />
                    </Button>
                    <br />
                  </div>}

                {(activeTabId !== "1" && editMode) &&
                  <div>
                    <Button /*data-tip="Add Adaptation Details"*/ size="sm" floating color="primary" onClick={this.addClick}>
                      <Fa icon="plus" />
                    </Button>
                  </div>
                }

                {editMode &&
                  <div>
                    <Button /*data-tip="Discard changes"*/ size="sm" floating color="danger" onClick={this.discardClick}>
                      <Fa icon="trash" />
                    </Button>
                    <br />
                    <Button /*data-tip="Save changes"*/ size="sm" floating color="default" onClick={this.saveClick}>
                      <Fa icon="save" />
                    </Button>
                  </div>}
              </div>
            </div>
          </div>
        </div>

        <Container>
          <Modal fade={false} isOpen={this.state.discardModal} centered>
            <ModalHeader toggle={this.toggle}>Confirm Discard</ModalHeader>
            <ModalBody>
              Are you sure you want to discard all changes?
            </ModalBody>
            <ModalFooter>
              <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ discardModal: false })} >Cancel</Button>{' '}
              <Button size="sm" style={{ width: "100px" }} color="default" onClick={this.discardChanges} >Discard</Button>
            </ModalFooter>
          </Modal>
        </Container>

        <Container>
          <Modal fade={false} isOpen={this.state.saveModal} centered>
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