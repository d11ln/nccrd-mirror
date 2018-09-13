import React from 'react'
import {
  Container, Button, Modal, ModalBody, ModalHeader, ModalFooter,
  Row, Col, TabPane, TabContent, Nav, NavItem, NavLink, Fa
} from 'mdbreact'
import { connect } from 'react-redux'
import EditListModal from './ListEditing/EditListModal.jsx'
import EditTreeModal from './ListEditing/EditTreeModal.jsx'
import { apiBaseURL } from "../../../config/apiBaseURL.cfg"
import ProjectDetailsTab from './ProjectDetailsTab.jsx'
import ProjectFundersTab from './ProjectFundersTab.jsx'
import AdaptationDetailsTab from './AdaptationDetailsTab.jsx'
import MitigationDetailsTab from './MitigationDetailsTab.jsx'
import MitigationEmissionsDataTab from './MitigationEmissionsDataTab.jsx'
import ResearchDetailsTab from './ResearchDetailsTab.jsx'
import RangeComponent from '../../Shared/RangeComponent.jsx'
import TextComponent from '../../Shared/TextComponent.jsx'
import ReactTooltip from 'react-tooltip'
import { UILookup } from '../../../config/ui_config.js'
import classnames from 'classnames';
import { DEAGreen, DEAGreenDark } from '../../../config/colours.cfg'

const _gf = require("../../../globalFunctions")
const o = require("odata")
const _ = require("lodash")

const mapStateToProps = (state, props) => {

  let { projectData: { projectDetails } } = state
  let { projectFundersData: { projectFunderDetails } } = state
  let { adaptationData: { adaptationDetails } } = state
  let { mitigationData: { mitigationDetails } } = state
  let { emissionsData: { emissionsData } } = state
  let { researchData: { researchDetails } } = state
  let { globalData: { loading, editMode } } = state
  let editListModalType = state.editListModalData.type
  let editListModalShow = state.editListModalData.show
  let user = state.oidc.user

  return {
    projectDetails, projectFunderDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails, editMode, loading,
    editListModalType, editListModalShow, user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProjectDetails: payload => {
      dispatch({ type: "LOAD_PROJECT_DETAILS", payload })
    },
    loadProjectFunderDetails: payload => {
      dispatch({ type: "LOAD_PROJECTFUNDER_DETAILS", payload })
    },
    loadAdaptationDetails: payload => {
      dispatch({ type: "LOAD_ADAPTATION_DETAILS", payload })
    },
    loadMitigationDetails: payload => {
      dispatch({ type: "LOAD_MITIGATION_DETAILS", payload })
    },
    loadMitigationEmissions: payload => {
      dispatch({ type: "LOAD_MITIGATION_EMISSIONS", payload })
    },
    loadResearchDetails: payload => {
      dispatch({ type: "LOAD_RESEARCH_DETAILS", payload })
    },
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    },
    setEditMode: payload => {
      dispatch({ type: "SET_EDIT_MODE", payload })
    },
    loadFunders: payload => {
      dispatch({ type: "LOAD_FUNDERS", payload })
    },
    loadFundingStatus: payload => {
      dispatch({ type: "LOAD_FUNDINGSTATUS", payload })
    },
    loadProjectTypes: payload => {
      dispatch({ type: "LOAD_PROJECT_TYPE", payload })
    },
    loadProjectSubTypes: payload => {
      dispatch({ type: "LOAD_PROJECT_SUBTYPE", payload })
    },
    loadProjectStatus: payload => {
      dispatch({ type: "LOAD_PROJECT_STATUS", payload })
    },
    loadUsers: payload => {
      dispatch({ type: "LOAD_USERS", payload })
    },
    loadValidationStatus: payload => {
      dispatch({ type: "LOAD_VALIDATION_STATUS", payload })
    },
    loadAdaptationPurpose: payload => {
      dispatch({ type: "LOAD_ADAPTATION_PURPOSE", payload })
    },
    loadSectors: payload => {
      dispatch({ type: "LOAD_SECTOR", payload })
    },
    loadRegions: payload => {
      dispatch({ type: "LOAD_REGION", payload })
    },
    loadSectorType: payload => {
      dispatch({ type: "LOAD_SECTOR_TYPE", payload })
    },
    loadSectorTree: payload => {
      dispatch({ type: "LOAD_SECTOR_TREE", payload })
    },
    loadCarbonCredit: payload => {
      dispatch({ type: "LOAD_CARBON_CREDIT", payload })
    },
    loadCarbonCreditMarket: payload => {
      dispatch({ type: "LOAD_CARBON_CREDIT_MARKET", payload })
    },
    loadCDMStatus: payload => {
      dispatch({ type: "LOAD_CDM_STATUS", payload })
    },
    loadCDMMethodology: payload => {
      dispatch({ type: "LOAD_CDM_METHODOLOGY", payload })
    },
    loadVoluntaryMethodology: payload => {
      dispatch({ type: "LOAD_VOLUNTARY_METHODOLOGY", payload })
    },
    loadVoluntaryGoldStandard: payload => {
      dispatch({ type: "LOAD_VOLUNTARY_GOLD_STANDARD", payload })
    },
    loadResearchType: payload => {
      dispatch({ type: "LOAD_RESEARCH_TYPE", payload })
    },
    loadTargetAudience: payload => {
      dispatch({ type: "LOAD_TARGET_AUDIENCE", payload })
    },
    loadTypology: payload => {
      dispatch({ type: "LOAD_TYPOLOGY", payload })
    },
    resetProjectState: payload => {
      dispatch({ type: "RESET_PROJECT_STATE", payload })
    },
    resetAdaptationState: payload => {
      dispatch({ type: "RESET_ADAPTATION_STATE", payload })
    },
    resetMitigationState: payload => {
      dispatch({ type: "RESET_MITIGATION_STATE", payload })
    },
    resetEmissionState: payload => {
      dispatch({ type: "RESET_EMISSION_STATE", payload })
    },
    resetResearchState: payload => {
      dispatch({ type: "RESET_RESEARCH_STATE", payload })
    },
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    addProjectFunderDetails: payload => {
      dispatch({ type: "ADD_PROJECTFUNDER_DETAILS", payload })
    },
    addAdaptationDetails: payload => {
      dispatch({ type: "ADD_ADAPTATION_DETAILS", payload })
    },
    addMitigationDetails: payload => {
      dispatch({ type: "ADD_MITIGATION_DETAILS", payload })
    },
    addMitigationEmissions: payload => {
      dispatch({ type: "ADD_MITIGATION_EMISSIONS", payload })
    },
    addResearchDetails: payload => {
      dispatch({ type: "ADD_RESEARCH_DETAILS", payload })
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

  loadData(detailsOnly) {

    let { setLoading, setEditMode, projectDetails, loadProjectTypes, loadProjectSubTypes, loadProjectStatus, loadUsers, loadValidationStatus,
      loadProjectDetails, loadProjectFunderDetails, loadAdaptationDetails, loadMitigationDetails, loadSectorType, loadTypology,
      loadMitigationEmissions, loadResearchDetails, loadAdaptationPurpose, loadRegions, loadSectors, loadSectorTree, loadCarbonCredit,
      loadCarbonCreditMarket, loadCDMStatus, loadCDMMethodology, loadVoluntaryMethodology, loadVoluntaryGoldStandard,
      loadResearchType, loadTargetAudience, user, loadFunders, loadFundingStatus } = this.props

    let { projectId } = this.state

    setLoading(true)
    setEditMode(false)

    //Redirect back to /Projects if un-authenticated
    let userState = (!user || user.expired)
    if (userState && !_gf.isLocalhost() && this.state.projectId === 'add') {
      location.hash = "/projects"
    }

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

      setLoading(false)
      setEditMode(true)
      loadProjectDetails(newProject)
    }
    else {

      let oHandler = o(apiBaseURL + "ProjectDetails")
        .find(projectId)
        .expand("Project($expand=ProjectRegions),Funders,AdaptationDetails,MitigationDetails,MitigationEmissionsData,ResearchDetails")

      if (!detailsOnly) {
        oHandler.expand("Lookups($expand=AdaptationPurpose,CarbonCredit,CarbonCreditMarket,CDMMethodology,CDMStatus," +
          "ProjectStatus,ProjectType,ProjectSubType,ResearchType,Region,Sector,SectorType,TargetAudience,Typology,Person," +
          "ValidationStatus,VoluntaryGoldStandard,VoluntaryMethodology,FundingStatus)")
      }

      oHandler.get()
        .then(
          (oHandler) => {
            //Success
            setLoading(false)

            //console.log("DATA", oHandler.data)

            //Dispatch results
            loadProjectDetails(oHandler.data.Project)
            loadProjectFunderDetails(oHandler.data.Funders)
            loadAdaptationDetails(oHandler.data.AdaptationDetails)
            loadMitigationDetails(oHandler.data.MitigationDetails)
            loadMitigationEmissions(oHandler.data.MitigationEmissionsData)
            loadResearchDetails(oHandler.data.ResearchDetails)
    
            if (!detailsOnly) {
              loadAdaptationPurpose(oHandler.data.Lookups.AdaptationPurpose)
              loadCarbonCredit(oHandler.data.Lookups.CarbonCredit)
              loadCarbonCreditMarket(oHandler.data.Lookups.CarbonCreditMarket)
              loadCDMMethodology(oHandler.data.Lookups.CDMMethodology)
              loadCDMStatus(oHandler.data.Lookups.CDMStatus)
              loadProjectStatus(oHandler.data.Lookups.ProjectStatus)
              loadProjectTypes(oHandler.data.Lookups.ProjectType)
              loadProjectSubTypes(oHandler.data.Lookups.ProjectSubType)
              loadResearchType(oHandler.data.Lookups.ResearchType)
              loadSectors(oHandler.data.Lookups.Sector)
              loadRegions(oHandler.data.Lookups.Region)
              loadSectorType(oHandler.data.Lookups.SectorType)
              loadTargetAudience(oHandler.data.Lookups.TargetAudience)
              loadTypology(oHandler.data.Lookups.Typology)
              loadFundingStatus(oHandler.data.Lookups.FundingStatus)

              // loadUsers(oHandler.data.Lookups.Person.map(x => {
              //   x.Value = (x.FirstName + " " + x.Surname + " (" + x.EmailAddress + ")")
              //   return x
              // }))
              loadUsers(oHandler.data.Lookups.Person)

              loadValidationStatus(oHandler.data.Lookups.ValidationStatus)
              loadVoluntaryGoldStandard(oHandler.data.Lookups.VoluntaryGoldStandard)
              loadVoluntaryMethodology(oHandler.data.Lookups.VoluntaryMethodology)
            }
          },
          (ex) => {
            //Failed
            setLoading(false)
            this.showMessage("An error occurred", "An error occurred while trying to fetch data from the server.\nPlease try again later.\n(See log for error details)")
            console.error("An error occurred while trying to fetch data from the server", ex)
          }
        )
    }
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
      loadMitigationEmissions, loadResearchDetails, projectDetails, projectFunderDetails, adaptationDetails,
      mitigationDetails, emissionsData, researchDetails, resetProjectState, resetAdaptationState,
      resetMitigationState, resetEmissionState, resetResearchState } = this.props

    let { projectId } = this.state

    //Close modal
    this.setState({ saveModal: false })

    //Show loading
    setLoading(true)

    let modified = false
    let dataObj = { Id: projectId }

    //Add Project
    if (projectDetails.state === 'modified') {
      let projectData = _.clone(projectDetails)
      delete projectData.state //OData can only bind to the original object spec which does not contain 'state'
      dataObj.Project = projectData
      modified = true
    }

    //Add AdaptationDetails
    if (adaptationDetails.filter(x => x.state === 'modified').length > 0) {
      let adaptationData = []
      adaptationDetails.filter(x => x.state === 'modified').forEach(item => {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project  
        adaptationData.push(item)
      })
      dataObj.AdaptationDetails = adaptationData
      modified = true
    }

    //Add MitigationDetails
    if (mitigationDetails.filter(x => x.state === 'modified').length > 0) {
      let mitigationData = []
      mitigationDetails.filter(x => x.state === 'modified').forEach(item => {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project  
        mitigationData.push(item)
      })
      dataObj.MitigationDetails = mitigationData
      modified = true
    }

    //Add MitigationEmissionsData
    if (emissionsData.filter(x => x.state === 'modified').length > 0) {
      let mitigationEmissionsData = []
      emissionsData.filter(x => x.state === 'modified').forEach(item => {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project  
        mitigationEmissionsData.push(item)
      })
      dataObj.MitigationEmissionsData = mitigationEmissionsData
      modified = true
    }

    //Add ResearchDetails
    if (researchDetails.filter(x => x.state === 'modified').length > 0) {
      let researchData = []
      researchDetails.filter(x => x.state === 'modified').forEach(item => {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        item.ProjectId = projectId //Asociate with current project  
        researchData.push(item)
      })
      dataObj.ResearchDetails = researchData
      modified = true
    }

    //Add Funding
    if (projectFunderDetails.filter(x => x.state === 'modified').length > 0) {
      let funderData = []
      projectFunderDetails.filter(x => x.state === 'modified').forEach(item => {
        delete item.state //OData can only bind to the original object spec which does not contain 'state'
        delete item.key //OData can only bind to the original object spec which does not contain 'key'
        funderData.push(item)
      })
      dataObj.Funders = funderData
      modified = true
    }

    const successCallback = (data) => {

      this.showMessage("Success", "Changes saved successfully.")
      setEditMode(false)
      o().config({ error: null }) //Reset error config

      //Refresh data to get ID's from DB
      this.loadData(true)
    }

    const errorCallback = (status) => {

      o().config({ error: null }) //Reset error config
      setLoading(false)
    }

    if (modified) {

      //Handle error messages with error-config in order 
      //to get error message back and not just code
      o().config({
        error: (code, error) => {
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

      o(apiBaseURL + "ProjectDetails")
        .post(dataObj)
        .save(
          (data) => {
            //Success
            successCallback(data)
          },
          (status) => {
            //Failed
            errorCallback(status)
          }
        )
    }
    else {
      successCallback()
    }
  }

  discardClick() {
    this.setState({ discardModal: true })
  }

  discardChanges() {

    let { setEditMode, projectDetails } = this.props

    this.setState({ discardModal: false })
    setEditMode(false)

    if (this.state.navBack === true || this.state.projectId === 'add') {
      this.navBack()
    }
    else {
      //Re-load data - discarding changes
      this.loadData(true)
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

      case "6":
        this.props.addProjectFunderDetails(projectId)
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
                  <NavLink to="#" style={{ backgroundColor: (activeTabId === "1" ? DEAGreen : ""), color: "black" }} onClick={() => { this.toggleTabs('1'); }}>
                    Project
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink to="#" style={{ backgroundColor: (activeTabId === "6" ? DEAGreen : ""), color: "black" }} onClick={() => { this.toggleTabs('6'); }}>
                    Funding
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" style={{ backgroundColor: (activeTabId === "2" ? DEAGreen : ""), color: "black" }} onClick={() => { this.toggleTabs('2'); }}>
                    Adaptation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" style={{ backgroundColor: (activeTabId === "3" ? DEAGreen : ""), color: "black" }} onClick={() => { this.toggleTabs('3'); }}>
                    Mitigation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" style={{ backgroundColor: (activeTabId === "4" ? DEAGreen : ""), color: "black" }} onClick={() => { this.toggleTabs('4'); }}>
                    Emissions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" style={{ backgroundColor: (activeTabId === "5" ? DEAGreen : ""), color: "black" }} onClick={() => { this.toggleTabs('5'); }}>
                    Research
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeItem={activeTabId}>
                <TabPane tabId="1">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="grey" size="sm" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <ProjectDetailsTab />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="6">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="grey" size="sm" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <ProjectFundersTab />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="2">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="grey" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <AdaptationDetailsTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="3">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="grey" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <MitigationDetailsTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="4">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="grey" size="sm" id="btnBackToList" onClick={this.backToList}>
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back to list
                  </Button>
                  <MitigationEmissionsDataTab projectId={projectDetails.ProjectId} />
                  <br />
                  <br />
                  <br />
                </TabPane>
                <TabPane tabId="5">
                  <Button style={{ margin: "0px 0px 20px -2px" }} color="grey" size="sm" id="btnBackToList" onClick={this.backToList}>
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
          ((user && !user.expired) /*|| _gf.isLocalhost()*/) &&
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div style={{ position: "fixed", right: "30px", bottom: "15px", zIndex: "99" }}>

                  {!editMode &&
                    <div>
                      <Button data-tip="Edit" size="sm" floating color="" onClick={this.editClick} style={{ backgroundColor: DEAGreen }}>
                        <Fa icon="pencil" />
                      </Button>
                      <br />
                    </div>}

                  {(activeTabId !== "1" && editMode) &&
                    <div>
                      <Button data-tip="Add Adaptation Details" size="sm" floating color="" onClick={this.addClick}
                        style={{ backgroundColor: DEAGreen }}>
                        <Fa icon="plus" />
                      </Button>
                    </div>
                  }

                  {editMode &&
                    <div>
                      <Button data-tip="Discard changes" size="sm" floating color="" onClick={this.discardClick} style={{ backgroundColor: "grey" }}>
                        <Fa icon="trash" />
                      </Button>
                      <br />
                      <Button data-tip="Save changes" size="sm" floating color="" onClick={this.saveClick} style={{ backgroundColor: DEAGreen }}>
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
              <Button size="sm" style={{ width: "100px" }} color="" onClick={() => this.setState({ discardModal: false })} style={{ backgroundColor: "grey" }} >Cancel</Button>
              <Button size="sm" style={{ width: "100px" }} color="" onClick={this.discardChanges} style={{ backgroundColor: DEAGreen }} >Discard</Button>
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
              <Button size="sm" style={{ width: "100px" }} color="" onClick={() => this.setState({ saveModal: false })} style={{ backgroundColor: "grey" }} >Cancel</Button>
              <Button size="sm" style={{ width: "100px" }} color="" onClick={this.saveChanges} style={{ backgroundColor: DEAGreen }} >Save</Button>
            </ModalFooter>
          </Modal>
        </Container>

        <Container>
          <Modal fade={false} isOpen={this.state.messageModal} toggle={this.toggle} centered>
            <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
            <ModalBody>
              <div className="col-md-12" style={{ overflowY: "auto", maxHeight: "65vh" }}>
                {_gf.StringToHTML(this.state.message)}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" style={{ width: "100px" }} color="" onClick={() => this.setState({ messageModal: false })} style={{ backgroundColor: DEAGreen }} >Close</Button>
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