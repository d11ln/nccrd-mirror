import React from 'react'
import { connect } from 'react-redux'
import { Steps, Progress, Modal, Icon, Popover, Tooltip } from 'antd'
import { Button, Row, Col, Fa } from 'mdbreact'
import buildQuery from 'odata-query'
import { apiBaseURL, vmsBaseURL } from "../../config/serviceURLs.js"
import ProjectDetailsStep from './Steps/ProjectDetailsStep.jsx';
import DAOLinkStep from './Steps/DAOLinkStep.jsx';
import ProjectLocationStep from './Steps/ProjectLocationStep.jsx';
import ProjectManagerStep from './Steps/ProjectManagerStep.jsx';
import AdaptationDetailsStep from './Steps/AdaptationDetailsStep.jsx';
import AdaptationContactStep from './Steps/AdaptationContactStep.jsx';
import AdaptationResearchStep from './Steps/AdaptationResearchStep.jsx';
import FundingDetailsStep from './Steps/FundingDetailsStep.jsx';
import OverallSummaryStep from './Steps/OverallSummaryStep.jsx';
import ActionsOverview from './Steps/ActionsOverview.jsx';
import { UILookup } from "../../config/ui_config.js"

import "./SteppedInputForm.css"

const _gf = require("../../globalFunctions")

const mapStateToProps = (state, props) => {

  let { projectData: { projectDetails } } = state
  let { projectFundersData: { projectFunderDetails } } = state
  let { adaptationData: { adaptationDetails } } = state
  // let { mitigationData: { mitigationDetails } } = state
  // let { emissionsData: { emissionsData } } = state
  let lookupDataLoaded = state.lookupData.loaded

  //Sort Funder on Id
  projectFunderDetails.sort((a, b) => {
    return a.FunderId - b.FunderId;
  })

  //Sort Adaptations on Id
  adaptationDetails.sort((a, b) => {
    return a.AdaptationDetailId - b.AdaptationDetailId;
  })

  return {
    projectDetails, projectFunderDetails, adaptationDetails, //mitigationDetails, emissionsData,
    lookupDataLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    },
    setEditMode: payload => {
      dispatch({ type: "SET_EDIT_MODE", payload })
    },
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
    loadAdaptationPurpose: payload => {
      dispatch({ type: "LOAD_ADAPTATION_PURPOSE", payload })
    },
    loadCarbonCredit: payload => {
      dispatch({ type: "LOAD_CARBON_CREDIT", payload })
    },
    loadCarbonCreditMarket: payload => {
      dispatch({ type: "LOAD_CARBON_CREDIT_MARKET", payload })
    },
    loadCDMMethodology: payload => {
      dispatch({ type: "LOAD_CDM_METHODOLOGY", payload })
    },
    loadCDMStatus: payload => {
      dispatch({ type: "LOAD_CDM_STATUS", payload })
    },
    loadProjectStatus: payload => {
      dispatch({ type: "LOAD_PROJECT_STATUS", payload })
    },
    loadProjectTypes: payload => {
      dispatch({ type: "LOAD_PROJECT_TYPE", payload })
    },
    loadProjectSubTypes: payload => {
      dispatch({ type: "LOAD_PROJECT_SUBTYPE", payload })
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
    loadFundingStatus: payload => {
      dispatch({ type: "LOAD_FUNDINGSTATUS", payload })
    },
    loadUsers: payload => {
      dispatch({ type: "LOAD_USERS", payload })
    },
    loadValidationStatus: payload => {
      dispatch({ type: "LOAD_VALIDATION_STATUS", payload })
    },
    loadVoluntaryGoldStandard: payload => {
      dispatch({ type: "LOAD_VOLUNTARY_GOLD_STANDARD", payload })
    },
    loadVoluntaryMethodology: payload => {
      dispatch({ type: "LOAD_VOLUNTARY_METHODOLOGY", payload })
    },
    loadResearchMaturity: payload => {
      dispatch({ type: "LOAD_RESEARCH_MATURITY", payload })
    },
    loadHazards: payload => {
      dispatch({ type: "LOAD_HAZARDS", payload })
    },
    loadRegions: payload => {
      dispatch({ type: "LOAD_REGION", payload })
    },
    loadSectors: payload => {
      dispatch({ type: "LOAD_SECTOR", payload })
    },
    setLinkedDAOGoalId: payload => {
      dispatch({ type: "SET_PROJECT_LINKED_DAO_GOAL_ID", payload })
    },
    setLookupDataLoaded: payload => {
      dispatch({ type: "SET_LOOKUPS_LOADED", payload })
    }
  }
}

const Step = Steps.Step
const confirm = Modal.confirm

let steps = [] //Make steps globally accessible

class SteppedInputForm extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.stepWizard = this.stepWizard.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.validateInputs = this.validateInputs.bind(this);

    this.state = {
      winWidth: 0,
      winHeight: 0,
      currentStep: 0,
      progressCompleteOverride: false
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.loadData()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ winWidth: window.innerWidth, winHeight: window.innerHeight });
  }

  async loadData() {

    this.props.setLoading(true)
    this.props.setEditMode(true)

    // LOAD PROJECT DATA //
    await this.loadProjectData()

    if (this.props.lookupDataLoaded === false) {

      // LOAD LOOKUP DATA //
      await this.loadLookupsData()
      await this.loadHazardsData()
      await this.loadRegionsData()
      await this.loadSectorsData()

      this.props.setLookupDataLoaded(true)
    }

    this.props.setLoading(false)
  }

  async loadProjectData() {

    let projectDetails = {
      ProjectId: _gf.getRndInteger(1111111, 9999999),
      ProjectTitle: "",
      ProjectDescription: "",
      LeadAgent: "",
      HostPartner: "",
      HostOrganisation: "",
      StartYear: 0,
      EndYear: 0,
      AlternativeContact: "",
      AlternativeContactEmail: "",
      Link: "",
      ValidationComments: "",
      BudgetLower: 0,
      BudgetUpper: 0,
      ProjectTypeId: 0,
      ProjectStatusId: 0,
      ProjectSubTypeId: 0,
      ProjectManagerId: 0,
      ValidationStatusId: 0,
      ProjectDAOs: [],
      ProjectRegions: [],
      ProjectLocations: [],
      state: "modified"
    }

    // let { daoid } = this.props
    // if (daoid && _gf.IsValidGuid(daoid)) {
    //   if (oHandler.data.Project.ProjectDAOs.filter(x => x.DAOId === daoid).length === 0) {
    //     oHandler.data.Project.ProjectDAOs.push({
    //       ProjectDAOId: 0,
    //       ProjectId: oHandler.data.Project.ProjectId,
    //       DAOId: daoid
    //     })
    //   }
    // }

    this.props.loadProjectDetails(projectDetails)
    this.props.loadProjectFunderDetails([])
    this.props.loadAdaptationDetails([])
    this.props.loadMitigationDetails([])
    this.props.loadMitigationEmissions([])
    this.props.loadResearchDetails([])

  }

  async loadLookupsData() {

    const query = buildQuery({
      expand: [
        "AdaptationPurpose",
        "CarbonCredit",
        "CarbonCreditMarket",
        "CDMMethodology",
        "CDMStatus",
        "ProjectStatus",
        "ProjectType",
        "ProjectSubType",
        "ResearchType",
        "TargetAudience",
        "Typology",
        "Person",
        "ValidationStatus",
        "VoluntaryGoldStandard",
        "VoluntaryMethodology",
        "FundingStatus",
        "ResearchMaturity"
      ]
    })

    try {
      let res = await fetch(apiBaseURL + `Lookups${query}`)
      let resBody = await res.json()

      if (res.ok && resBody) {

        //Dispatch results
        this.props.loadAdaptationPurpose(resBody.AdaptationPurpose)
        this.props.loadCarbonCredit(resBody.CarbonCredit)
        this.props.loadCarbonCreditMarket(resBody.CarbonCreditMarket)
        this.props.loadCDMMethodology(resBody.CDMMethodology)
        this.props.loadCDMStatus(resBody.CDMStatus)
        this.props.loadProjectStatus(resBody.ProjectStatus)
        this.props.loadProjectTypes(resBody.ProjectType)
        this.props.loadProjectSubTypes(resBody.ProjectSubType)
        this.props.loadResearchType(resBody.ResearchType)
        this.props.loadTargetAudience(resBody.TargetAudience)
        this.props.loadTypology(resBody.Typology)
        this.props.loadFundingStatus(resBody.FundingStatus)
        this.props.loadUsers(resBody.Person)
        this.props.loadValidationStatus(resBody.ValidationStatus)
        this.props.loadVoluntaryGoldStandard(resBody.VoluntaryGoldStandard)
        this.props.loadVoluntaryMethodology(resBody.VoluntaryMethodology)
        this.props.loadResearchMaturity(resBody.ResearchMaturity)
      }
      else {
        throw new Error(resBody)
      }
    }
    catch (ex) {
      console.error(ex)
    }
  }

  async loadHazardsData() {

    let { loadHazards } = this.props

    //Get (external) Hazards
    fetch(`${vmsBaseURL}hazards/flat`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        loadHazards(res.items)
      })
      .catch(res => {
        console.error("Error details:", res)
      })
  }

  async loadRegionsData() {

    let { loadRegions } = this.props

    //Get (external) Regions
    fetch(`${vmsBaseURL}regions/flat`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        loadRegions(res.items)
      })
      .catch(res => {
        console.error("Error details:", res)
      })
  }

  async loadSectorsData() {

    let { loadSectors } = this.props

    //Get (external) Sectors
    fetch(`${vmsBaseURL}sectors/flat`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        loadSectors(res.items)
      })
      .catch(res => {
        console.error("Error details:", res)
      })
  }

  onClose() {

    //discard changes & reset
    this.setState({ currentStep: 0, progressCompleteOverride: false })
    this.loadData()

    //close form
    this.props.onClose()
  }

  onSubmit() {

    //do submit stuff here//
    //...

    //reset and close form
    this.setState({ progressCompleteOverride: true }, () => {
      setTimeout(() => {
        this.onClose()
      }, 500)
    })
  }

  onNext() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  onPrev() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }

  stepWizard(steps) {
    let { currentStep } = this.state
    this.setState({ currentStep: (currentStep + steps) })
  }

  jumpTo(stepTitle) {

    //let steps = this.getSteps()
    let filteredSteps = steps.filter(s => s.title === stepTitle)

    if (filteredSteps && filteredSteps.length > 0) {
      let index = steps.indexOf(filteredSteps[0])
      this.setState({ currentStep: index })
    }
  }

  showConfirm(title, message, yesText, noText, yesFunction) {
    confirm({
      title: title,
      content: message,
      okText: yesText,
      okType: 'danger',
      cancelText: noText,
      centered: true,
      onOk() {
        setTimeout(() => {
          yesFunction()
        }, 500);
      },
      onCancel() { },
    });
  }

  getSteps() {

    let { projectDetails, adaptationDetails, projectFunderDetails, setLinkedDAOGoalId } = this.props
    steps = []

    //Project
    let title = "Project - Details"
    steps.push({
      title: title,
      content: <ProjectDetailsStep />,
      error: false
    })
    steps.push({
      title: 'Project - DAO Link',
      optional: true,
      content: <DAOLinkStep
        ProjectDAOs={projectDetails.ProjectDAOs}
        linkCallback={(id, action) => { setLinkedDAOGoalId({ value: id, action, state: 'modified' }) }}
      />,
      error: false
    })
    steps.push({
      title: 'Project - Location',
      content: <ProjectLocationStep />,
      error: false
    })
    steps.push({
      title: 'Project - Manager',
      content: <ProjectManagerStep />,
      error: false
    })

    //Actions Overview
    steps.push({
      title: 'Actions - Overview',
      content: <ActionsOverview jumpTo={this.jumpTo} />,
      error: false
    })

    //Funding
    projectFunderDetails.map(funder => {
      let index = projectFunderDetails.indexOf(funder) + 1

      steps.push({
        title: `Funding #${index} - Details`,
        backAction: "Actions - Overview",
        content: <FundingDetailsStep details={funder} />,
        error: false
      })
    })

    //Adaptation
    adaptationDetails.map(action => {
      let index = adaptationDetails.indexOf(action) + 1

      steps.push({
        title: `Adaptation #${index} - Details`,
        backAction: "Actions - Overview",
        content: <AdaptationDetailsStep details={action} />,
        error: false
      })
      steps.push({
        title: `Adaptation #${index} - Contact`,
        content: <AdaptationContactStep details={action} />,
        error: false
      })

      // Optionally add Research
      if (action.ResearchDetail !== null) {
        steps.push({
          title: `Adaptation #${index} - Research`,
          content: <AdaptationResearchStep details={action} stepWizard={this.stepWizard} />,
          error: false
        })
      }

      // Optionally add Funding
      // ...
    })

    //Mitigation
    //...coming soon...

    //Validate inputs before summary
    this.validateInputs()

    //Summary
    steps.push({
      title: 'Summary',
      content: <OverallSummaryStep
        projectDetails={projectDetails}
        adaptationDetails={adaptationDetails}
        funderDetails={projectFunderDetails}
        errors={ steps.filter(s => s.error === true).length > 0 }
      />,
      error: false
    })

    // return steps
  }

  validateInputs() {

    let { projectFunderDetails, projectDetails, adaptationDetails, mitigationDetails } = this.props
    let { currentStep } = this.state

    let uiconf = {}
    let step = {}

    //PROJECT - DETAILS//
    step = this.getStepByTitle("Project - Details")
    if (step && steps.indexOf(step) < currentStep) {
      let stepValidations = []

      stepValidations.push(this.validateRequiredInput("txtProjectTitle", projectDetails, "ProjectTitle"))
      stepValidations.push(this.validateRequiredInput("txtProjectDescription", projectDetails, "ProjectDescription"))
      stepValidations.push(this.validateRequiredInput("txtProjectLink", projectDetails, "Link"))
      stepValidations.push(this.validateRequiredInput("txtProjectYear", projectDetails, "StartYear"))
      stepValidations.push(this.validateRequiredInput("txtProjectYear", projectDetails, "EndYear"))
      stepValidations.push(this.validateRequiredInput("selProjectStatus", projectDetails, "ProjectStatusId"))
      stepValidations.push(this.validateRequiredInput("txtProjectBudget", projectDetails, "BudgetLower"))
      stepValidations.push(this.validateRequiredInput("txtProjectBudget", projectDetails, "BudgetUpper"))

      step.error = stepValidations.includes(false)
    }

    //PROJECT - LOCATION//
    step = this.getStepByTitle("Project - Location")
    if (step && steps.indexOf(step) < currentStep) {
      let stepValidations = []

      stepValidations.push(this.validateRequiredInput("lblRegions", projectDetails, "ProjectRegions"))
      stepValidations.push(this.validateRequiredInput("lblLocations", projectDetails, "ProjectLocations"))

      step.error = stepValidations.includes(false)
    }

    //PROJECT - MANAGER//
    step = this.getStepByTitle("Project - Manager")
    if (step && steps.indexOf(step) < currentStep) {
      let stepValidations = []

      stepValidations.push(this.validateRequiredInput("txtProjectLeadAgent", projectDetails, "LeadAgent"))
      stepValidations.push(this.validateRequiredInput("selProjectManager", projectDetails, "ProjectManagerId"))
      stepValidations.push(this.validateRequiredInput("txtProjectHostOrganisation", projectDetails, "HostOrganisation"))
      stepValidations.push(this.validateRequiredInput("txtProjectHostPartner", projectDetails, "HostPartner"))
      stepValidations.push(this.validateRequiredInput("txtProjectAlternativeContact", projectDetails, "AlternativeContact"))
      stepValidations.push(this.validateRequiredInput("txtProjectAlternativeContactEmail", projectDetails, "AlternativeContactEmail"))

      step.error = stepValidations.includes(false)
    }

    //FUNDING//
    projectFunderDetails.map(pfd => {
      let index = projectFunderDetails.indexOf(pfd) + 1

      //FUNDING #XX - DETAILS//
      step = this.getStepByTitle(`Funding #${index} - Details`)
      if (step && steps.indexOf(step) < currentStep) {
        let stepValidations = []

        stepValidations.push(this.validateRequiredInput("lblGrantProgram", pfd, "GrantProgName"))
        stepValidations.push(this.validateRequiredInput("lblFundingAgency", pfd, "FundingAgency"))
        stepValidations.push(this.validateRequiredInput("lblPartneringDepts", pfd, "PartnerDepsOrgs"))
        stepValidations.push(this.validateRequiredInput("lblProjectCoordinator", pfd, "ProjectCoordinatorId"))
        stepValidations.push(this.validateRequiredInput("lblTotalBudget", pfd, "TotalBudget"))
        stepValidations.push(this.validateRequiredInput("lblAnnualBudget", pfd, "AnnualBudget"))
        stepValidations.push(this.validateRequiredInput("lblFundingStatus", pfd, "FundingStatusId"))

        step.error = stepValidations.includes(false)
      }
    })

    //ADAPTATION//
    adaptationDetails.map(ad => {
      let index = adaptationDetails.indexOf(ad) + 1

      //ADAPTATION #XX - DETAILS//
      step = this.getStepByTitle(`Adaptation #${index} - Details`)
      if (step && steps.indexOf(step) < currentStep) {
        let stepValidations = []

        stepValidations.push(this.validateRequiredInput("txtAdaptationTitle", ad, "Title"))
        stepValidations.push(this.validateRequiredInput("txtAdaptationDescription", ad, "Description"))
        stepValidations.push(this.validateRequiredInput("selAdaptationPurpose", ad, "AdaptationPurposeId"))
        stepValidations.push(this.validateRequiredInput("selAdaptationSector", ad, "SectorId"))
        stepValidations.push(this.validateRequiredInput("selAdaptationHazard", ad, "HazardId"))
        stepValidations.push(this.validateRequiredInput("selAdaptationActionStatus", ad, "ProjectStatusId"))

        step.error = stepValidations.includes(false)
      }

      //ADAPTATION #XX - CONTACT//
      step = this.getStepByTitle(`Adaptation #${index} - Contact`)
      if (step && steps.indexOf(step) < currentStep) {
        let stepValidations = []

        stepValidations.push(this.validateRequiredInput("txtAdaptationContactName", ad, "ContactName"))
        stepValidations.push(this.validateRequiredInput("txtAdaptationContactEmail", ad, "ContactEmail"))

        step.error = stepValidations.includes(false)
      }
    })
  }

  validateRequiredInput(id, data, key) {
    let uiconf = UILookup(id)

    if (uiconf.required === true && (data[key] === "" || data[key] === 0 || data[key].length === 0)) {
      return false
    }
    return true
  }

  getStepByTitle(stepTitle) {
    let filteredSteps = steps.filter(s => s.title === stepTitle)
    if (filteredSteps && filteredSteps.length > 0) {
      return filteredSteps[0]
    }
  }

  render() {

    let { winHeight, currentStep, progressCompleteOverride } = this.state

    this.getSteps()
    // this.validateInputs()

    let errors = steps.filter(s => s.error === true).length > 0

    if (steps.length === 0) {
      return (
        <h6> LOADING... </h6>
      )
    }

    return (
      <div style={{ height: "93vh", overflowY: "hidden", overflowX: 'hidden' }}>
        <Row>
          <Col md="3">
            <div style={{ height: (winHeight - 200), maxHeight: (winHeight - 200), overflowY: "auto", overflowX: 'hidden' }}>
              <Steps direction="vertical" current={currentStep} >
                {steps.map(item => {
                  return <Step
                    key={item.title}
                    title={<a href="#">{item.title}</a>}
                    icon={
                      item.error ?
                        <div style={{ fontSize: '32px', color: "red", marginTop: -8, marginLeft: -1 }}>
                          <Icon type="close-circle" />
                        </div> :
                        undefined
                    }
                    onClick={() => {
                      this.setState({ currentStep: steps.indexOf(item) })
                    }}
                  />
                })}
              </Steps>
            </div>

            <br />

            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={progressCompleteOverride ? 100 : Math.round(100 / steps.length * currentStep)}
                style={{ marginLeft: -10 }}
              />
            </div>
          </Col>

          <Col md="9" style={{
            borderLeft: "1px solid gainsboro",
          }}>

            <Row>
              <Col>
                <div className="steps-content" style={{
                  height: (winHeight - 113),
                  overflowY: "auto",
                  overflowX: 'hidden'
                }}>
                  <h3>
                    <b>{steps[currentStep].title}</b>
                  </h3>
                  {
                    steps[currentStep].optional === true &&
                    <h6>
                      <i>
                        This step is optional, click 'Next' to skip
                    </i>
                    </h6>
                  }
                  {
                    steps[currentStep].backAction &&
                    <h6>
                      <a href="#" onClick={() => this.jumpTo(steps[currentStep].backAction)}>
                        <Fa className="button-icon" icon="chevron-circle-left" />
                        <u>{steps[currentStep].backAction}</u>
                      </a>
                    </h6>
                  }
                  <div className="vertical-spacer" />
                  {steps[currentStep].content}
                </div>
              </Col>
            </Row>

            <Row style={{ borderTop: "1px solid gainsboro", paddingTop: 5 }}>
              <Col>

                <Button size="sm" color="danger" style={{ width: 120 }} onClick={() => {
                  this.showConfirm("Confirm cancel", "Are you sure you want to cancel and discard all unsaved changes?",
                    "Yes", "No", this.onClose)
                }}>
                  <Fa icon="trash" style={{ marginRight: 10 }} />
                  Cancel
                </Button>

                <div className="steps-action" style={{ float: "right" }} >
                  {
                    currentStep > 0 && (
                      <Button
                        size="sm"
                        color="primary"
                        style={{ width: 120, marginRight: 0 }}
                        onClick={() => this.onPrev()}
                      >
                        <Fa icon="chevron-circle-left" style={{ marginRight: 10 }} />
                        Previous
                        </Button>
                    )
                  }

                  {
                    currentStep < steps.length - 1 &&
                    <Button
                      size="sm"
                      color="primary"
                      style={{ width: 120, marginRight: 0 }}
                      onClick={() => this.onNext()}
                    >
                      <Fa icon="chevron-circle-right" style={{ marginRight: 10 }} />
                      Next
                      </Button>
                  }

                  {
                    (currentStep === steps.length - 1) &&
                    <Button
                      disabled={errors}
                      size="sm"
                      color="secondary"
                      onClick={this.onSubmit}
                      style={{ width: 120, marginRight: 0 }}
                    >
                      <Fa icon="save" style={{ marginRight: 10 }} />
                      Submit
                    </Button>
                  }
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SteppedInputForm)