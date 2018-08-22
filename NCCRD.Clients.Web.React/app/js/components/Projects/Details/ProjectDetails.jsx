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

const _gf = require("../../../globalFunctions")
const o = require("odata")
const _ = require("lodash")

const mapStateToProps = (state, props) => {

  let { projectData: { projectDetails } } = state
  let { adaptationData: { adaptationDetails } } = state
  let { mitigationData: { mitigationDetails } } = state
  let { emissionsData: { emissionsData } } = state
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
    loadUsers: payload => {
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
    this.showMessage = this.showMessage.bind(this)

    let projectId = this.props.match.params.id
    this.state = {
      activeItemTabs: '1',
      projectId,
      discardModal: false,
      saveModal: false,
      messageModal: false,
      navBack: false,
      title: "message",
      message: ""
    }
  }

  showMessage(title, message) {
    this.setState({
      title,
      message,
      messageModal: true
    })
  }

  loadData() {

    let { setLoading, setEditMode, projectDetails, loadProjectTypes, loadProjectSubTypes, loadProjectStatus, loadUsers, loadValidationStatus,
      loadProjectDetails, loadAdaptationDetails, loadMitigationDetails, loadSectorType, loadTypology,
      loadMitigationEmissions, loadResearchDetails, loadAdaptationPurpose, loadSectors, loadSectorTree, loadCarbonCredit,
      loadCarbonCreditMarket, loadCDMStatus, loadCDMMethodology, loadVoluntaryMethodology, loadVoluntaryGoldStandard,
      loadResearchType, loadTargetAudience, user } = this.props

    let { projectId } = this.state

    setLoading(true)
    setEditMode(false)

    if ((!user || user.expired) && this.state.projectId === 'add') {
      location.hash = "/projects"
    }

    Promise.all([
      o(apiBaseURL + "Projects").find(this.state.projectId).get(),
      o(apiBaseURL + "AdaptationDetails").filter("ProjectId eq " + this.state.projectId).orderBy("AdaptationDetailId").get(),
      o(apiBaseURL + "MitigationDetails").filter("ProjectId eq " + this.state.projectId).orderBy("MitigationDetailId").get(),
      o(apiBaseURL + "MitigationEmissionsData").filter("ProjectId eq " + this.state.projectId).orderBy("MitigationEmissionsDataId").get(),
      o(apiBaseURL + "ResearchDetails").filter("ProjectId eq " + this.state.projectId).orderBy("ResearchDetailId").get(),
      o(apiBaseURL + "AdaptationPurpose").orderBy("Value").get(),
      o(apiBaseURL + "CarbonCredit").orderBy("Value").get(),
      o(apiBaseURL + "CarbonCreditMarket").orderBy("Value").get(),
      o(apiBaseURL + "CDMMethodology").orderBy("Value").get(),
      o(apiBaseURL + "CDMStatus").orderBy("Value").get(),
      o(apiBaseURL + "ProjectStatus").orderBy("Value").get(),
      o(apiBaseURL + "ProjectType").orderBy("Value").get(),
      o(apiBaseURL + "ProjectSubType").orderBy("Value").get(),
      o(apiBaseURL + "ResearchType").orderBy("Value").get(),
      o(apiBaseURL + "Sector").orderBy("Value").get(),
      o(apiBaseURL + "SectorType").orderBy("Name").get(),
      o(apiBaseURL + "TargetAudience").orderBy("Value").get(),
      o(apiBaseURL + "Typology").orderBy("Value").get(),
      o(apiBaseURL + "User").select("UserId,Username,FirstName,Surname").orderBy("FirstName,Surname").get(),
      o(apiBaseURL + "ValidationStatus").orderBy("Value").get(),
      o(apiBaseURL + "VoluntaryGoldStandard").orderBy("Value").get(),
      o(apiBaseURL + "VoluntaryMethodology").orderBy("Value").get()
    ])
      .then(function (oHandlerArray) {
        setLoading(false)

        if (projectId === 'add') {
          setEditMode(true)
        }

        //Dispatch results
        loadProjectDetails(oHandlerArray[0].data)
        loadAdaptationDetails(oHandlerArray[1].data)
        loadMitigationDetails(oHandlerArray[2].data)
        loadMitigationEmissions(oHandlerArray[3].data)
        loadResearchDetails(oHandlerArray[4].data)
        loadAdaptationPurpose(oHandlerArray[5].data)
        loadCarbonCredit(oHandlerArray[6].data)
        loadCarbonCreditMarket(oHandlerArray[7].data)
        loadCDMMethodology(oHandlerArray[8].data)
        loadCDMStatus(oHandlerArray[9].data)
        loadProjectStatus(oHandlerArray[10].data)
        loadProjectTypes(oHandlerArray[11].data)
        loadProjectSubTypes(oHandlerArray[12].data)
        loadResearchType(oHandlerArray[13].data)
        loadSectors(oHandlerArray[14].data)
        loadSectorType(oHandlerArray[15].data)
        loadTargetAudience(oHandlerArray[16].data)
        loadTypology(oHandlerArray[17].data)
        loadUsers(oHandlerArray[18].data.map(x => ({ Id: x.UserId, Value: (x.FirstName + " " + x.Surname + " (" + x.Username + ")") })))
        loadValidationStatus(oHandlerArray[19].data)
        loadVoluntaryGoldStandard(oHandlerArray[20].data)
        loadVoluntaryMethodology(oHandlerArray[21].data)
      })
      .catch((ex) => {
        setLoading(false)
        this.showMessage("An error occurred", "An error occurred while trying to fetch data from the server.\nPlease try again later.\n(See log for error details)")
        console.error("An error occurred while trying to fetch data from the server", ex)
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

    let { setEditMode, setLoading, loadProjectDetails, loadAdaptationDetails, loadMitigationDetails,
      loadMitigationEmissions, loadResearchDetails, projectDetails, adaptationDetails,
      mitigationDetails, emissionsData, researchDetails, resetProjectState, resetAdaptationState,
      resetMitigationState, resetEmissionState, resetResearchState } = this.props

    let { projectId } = this.state

    //Close modal
    this.setState({ saveModal: false })

    //Show loading
    setLoading(true)


    //Handle error messages with error-config in order 
    //to get error message back and not just code
    o().config({
      error: (code, error) => {

        //(Re)Enable edit mode
        setEditMode(true)

        //Try to get & parse error message
        let errorJS = JSON.parse(error)
        let message = errorJS.value
        if (typeof message === 'undefined') message = errorJS.error.message
        if (typeof message === 'undefined') message = "(See log for error details)"

        //Log error message & details
        this.showMessage("Unable to save changes", message)
        console.error("Unable to save changes", code, errorJS)
      }
    })

    let promises = []

    //Project
    if (projectDetails.state === 'modified') {
      let data = _.clone(projectDetails)
      delete data.state //OData can only bind to the original object spec which does not contain 'state'
      promises.push(o(apiBaseURL + "Projects").post(data).save(() => { resetProjectState() }))
    }

    adaptationDetails.forEach(item => {
      if (item.state === 'modified') {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project
        promises.push(o(apiBaseURL + "AdaptationDetails").post(item).save(() => { resetAdaptationState() }))
      }
    })

    mitigationDetails.forEach(item => {
      if (item.state === 'modified') {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project
        promises.push(o(apiBaseURL + "MitigationDetails").post(item).save(() => { resetMitigationState() }))
      }
    })

    emissionsData.forEach(item => {
      if (item.state === 'modified') {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project
        promises.push(o(apiBaseURL + "MitigationEmissionsData").post(item).save(() => { resetEmissionState() }))
      }
    })

    researchDetails.forEach(item => {
      if (item.state === 'modified') {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project
        promises.push(o(apiBaseURL + "ResearchDetails").post(item).save(() => { resetResearchState() }))
      }
    })

    Promise.all(promises)
      .then(() => {
        o().config({ error: null }) //Reset error config

        //Hide loading
        setLoading(false)

        //disable editing on success
        setEditMode(false)

        this.showMessage("Success", "Changes saved successfully.")
      })
      .catch((ex) => {
        setLoading(false)
      })

  }

  // SaveProjectChanges() {

  //   let { projectDetails, user } = this.props
  //   let result = true

  //   if (projectDetails.state == "modified") {

  //     //OData can only bind to the original object spec
  //     //which does not contain 'state'
  //     delete projectDetails.state

  //     //Handle error messages with error-config in order 
  //     //to get error message back and not just code
  //     o().config({
  //       error: (code, error) => {
  //         this.showMessage("Unable to save Project changes", JSON.parse(error).value)
  //         console.error("Unable to save Project changes", code, error)
  //       }
  //     })

  //     return Promise.all([
  //       o(apiBaseURL + "Projects")
  //         .post(projectDetails)
  //         .save(
  //           (data) => {
  //             this.showMessage("Success", "Changes saved successfully.")
  //           },
  //           (ex) => {
  //             //This is need so that the error is not logged as 'Uncaught'
  //             result = false
  //           })
  //     ])
  //       .then(() => {
  //         o().config({ error: null }) //Reset error config
  //         return result
  //       })
  //   }
  //   else {
  //     return false
  //   }
  // }

  // SaveAdaptationChanges() {

  //   let { adaptationDetails, resetAdaptationState, user } = this.props
  //   let result = true

  //   return Promise.all(
  //     adaptationDetails.map((adaptation) => {

  //       if (result === true && adaptation.state === "modified") {

  //         let strPostData = JSON.stringify(adaptation)
  //         let url = apiBaseURL + "api/AdaptationDetails/AddOrUpdate"

  //         return fetch(url, {
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             "Authorization": "Bearer " + (user === null ? "" : user.access_token)
  //           },
  //           body: strPostData
  //         })
  //           .then((res) => res.json())
  //           .then((res) => {

  //             if (result === true && res !== true) {
  //               result = res
  //             }
  //             else if (res === true) {
  //               resetAdaptationState(adaptation)
  //             }
  //           })
  //       }
  //     })
  //   ).then(() => {
  //     return result
  //   })
  // }

  // SaveMitigationChanges() {

  //   let { mitigationDetails, resetMitigationState, user } = this.props
  //   let result = true

  //   return Promise.all(
  //     mitigationDetails.map((mitigation) => {

  //       if (result === true && mitigation.state === "modified") {

  //         let strPostData = JSON.stringify(mitigation)
  //         let url = apiBaseURL + "api/MitigationDetails/AddOrUpdate"

  //         return fetch(url, {
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             "Authorization": "Bearer " + (user === null ? "" : user.access_token)
  //           },
  //           body: strPostData
  //         })
  //           .then((res) => res.json())
  //           .then((res) => {

  //             if (result === true && res !== true) {
  //               result = res
  //             }
  //             else if (res === true) {
  //               resetMitigationState(mitigation)
  //             }
  //           })
  //       }
  //     })
  //   ).then(() => {
  //     return result
  //   })
  // }

  // SaveEmissionsChanges() {

  //   let { emissionsData, resetEmissionState, user } = this.props
  //   let result = true

  //   return Promise.all(
  //     emissionsData.map((emissions) => {

  //       if (result === true && emissions.state === "modified") {

  //         let strPostData = JSON.stringify(emissions)
  //         let url = apiBaseURL + "api/MitigationEmissionsData/AddOrUpdate"

  //         return fetch(url, {
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             "Authorization": "Bearer " + (user === null ? "" : user.access_token)
  //           },
  //           body: strPostData
  //         })
  //           .then((res) => res.json())
  //           .then((res) => {

  //             if (result === true && res !== true) {
  //               result = res
  //             }
  //             else if (res === true) {
  //               resetEmissionState(emissions)
  //             }
  //           })
  //       }
  //     })
  //   ).then(() => {
  //     return result
  //   })
  // }

  // SaveResearchChanges() {

  //   let { researchDetails, resetResearchState, user } = this.props
  //   let result = true

  //   return Promise.all(
  //     researchDetails.map((research) => {

  //       if (result === true && research.state === "modified") {

  //         let strPostData = JSON.stringify(research)
  //         let url = apiBaseURL + "api/ResearchDetails/AddOrUpdate"

  //         return fetch(url, {
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             "Authorization": "Bearer " + (user === null ? "" : user.access_token)
  //           },
  //           body: strPostData
  //         })
  //           .then((res) => res.json())
  //           .then((res) => {

  //             if (result === true && res !== true) {
  //               result = res
  //             }
  //             else if (res === true) {
  //               resetResearchState(research)
  //             }
  //           })
  //       }
  //     })
  //   ).then(() => {
  //     return result
  //   })
  // }

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

        {
          ((user && !user.expired) || _gf.isLocalhost()) &&
          <div className="container-fluid">
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
        }

        <Container>
          <Modal fade={false} isOpen={this.state.discardModal} centered>
            <ModalHeader toggle={this.toggle}>Confirm Discard</ModalHeader>
            <ModalBody>
              Are you sure you want to discard all changes?
            </ModalBody>
            <ModalFooter>
              <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ discardModal: false })} >Cancel</Button>
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
              <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ saveModal: false })} >Cancel</Button>
              <Button size="sm" style={{ width: "100px" }} color="warning" onClick={this.saveChanges} >Save</Button>
            </ModalFooter>
          </Modal>
        </Container>

        <Container>
          <Modal fade={false} isOpen={this.state.messageModal} toggle={this.toggle} centered>
            <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
            <ModalBody>
              <div className="col-md-12" style={{ overflowY: "auto", maxHeight: "65vh" }}>
                {/* {this.state.message.split("\n").map(str => <div key={_gf.GetUID()}><label>{str}</label><br /></div>)} */}
                {_gf.StringToHTML(this.state.message)}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" style={{ width: "100px" }} color="default" onClick={() => this.setState({ messageModal: false })} >Close</Button>
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