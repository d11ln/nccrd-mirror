import React from 'react'
import { connect } from 'react-redux'
import { Steps, Progress, Modal } from 'antd'
import { Button, Row, Col, Fa } from 'mdbreact'
import buildQuery from 'odata-query'
import { apiBaseURL, vmsBaseURL } from "../../config/serviceURLs.js"

import "./SteppedInputForm.css"
import ProjectDetailsStep from './Steps/ProjectDetailsStep.jsx';
import DAOLinkStep from './Steps/DAOLinkStep.jsx';
import ProjectLocationStep from './Steps/ProjectLocationStep.jsx';
import ProjectManagerStep from './Steps/ProjectManagerStep.jsx';
import AdaptationDetailsStep from './Steps/AdaptationDetailsStep.jsx';
import AdaptationContactStep from './Steps/AdaptationContactStep.jsx';
import AdaptationResearchStep from './Steps/AdaptationResearchStep.jsx';
import AdaptationAddStep from './Steps/AdaptationAddStep.jsx';
import FundingDetailsStep from './Steps/FundingDetailsStep.jsx';
import FundingAddStep from './Steps/FundingAddStep.jsx';
import MitigationAddStep from './Steps/MitigationAddStep.jsx';
import OverallSummaryStep from './Steps/OverallSummaryStep.jsx';

const _gf = require("../../globalFunctions")

const mapStateToProps = (state, props) => {

  let { projectData: { projectDetails } } = state
  let { projectFundersData: { projectFunderDetails } } = state
  let { adaptationData: { adaptationDetails } } = state
  // let { mitigationData: { mitigationDetails } } = state
  // let { emissionsData: { emissionsData } } = state
  let lookupDataLoaded = state.lookupData.loaded
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
    },
    addProjectFunderDetails: payload => {
      dispatch({ type: "ADD_PROJECTFUNDER_DETAILS", payload })
    },
    addAdaptationDetails: payload => {
      dispatch({ type: "ADD_ADAPTATION_DETAILS", payload })
    },
    // addMitigationDetails: payload => {
    //   dispatch({ type: "ADD_MITIGATION_DETAILS", payload })
    // },
    // addMitigationEmissions: payload => {
    //   dispatch({ type: "ADD_MITIGATION_EMISSIONS", payload })
    // },
    setAdaptationDetailsResearchDetails: payload => {
      dispatch({ type: "SET_ADAPTATION_DETAILS_RESEARCH_DETAILS", payload })
    },
    addAdaptationDetailsResearchDetails: payload => {
      dispatch({ type: "ADD_ADAPTATION_DETAILS_RESEARCH_DETAILS", payload })
    }
  }
}

const Step = Steps.Step
const confirm = Modal.confirm


class SteppedInputForm extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.addAdaptationAction = this.addAdaptationAction.bind(this);
    this.removeAdaptationAction = this.removeAdaptationAction.bind(this);
    this.addFundingDetails = this.addFundingDetails.bind(this);

    this.state = {
      mode: "edit", //add|edit
      winWidth: 0,
      winHeight: 0,
      currentStep: 0,
      progressCompleteOverride: false,
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

  addAdaptationAction(asResearch, withFunding) {

    let { projectDetails, addAdaptationDetails } = this.props

    let _addAdaptationDetails = () => new Promise((resolve, reject) => {
      addAdaptationDetails(projectDetails.ProjectId);
      resolve()
    })

    _addAdaptationDetails().then(() => {

      let { adaptationDetails, addAdaptationDetailsResearchDetails } = this.props

      // ADD RESEARCH //
      if (asResearch === true) {
        let details = adaptationDetails[adaptationDetails.length - 1]
        addAdaptationDetailsResearchDetails({
          id: details.AdaptationDetailId,
          state: 'modified'
        })
      }

      // ADD FUNDING //
      if (withFunding === true) {
        // ...
      }

    })
  }

  addFundingDetails() {
    let { projectDetails, addProjectFunderDetails } = this.props
    addProjectFunderDetails(projectDetails.ProjectId)
  }

  removeAdaptationAction(index) {
    // ...
  }

  getSteps() {

    let { projectDetails, adaptationDetails, projectFunderDetails, setLinkedDAOGoalId } = this.props
    let steps = []

    //Project
    let title = "Project Details"
    steps.push({
      title: title,
      content: <ProjectDetailsStep />
    })
    steps.push({
      title: 'Project - DAO Link',
      optional: true,
      content: <DAOLinkStep
        ProjectDAOs={projectDetails.ProjectDAOs}
        linkCallback={(id, action) => { setLinkedDAOGoalId({ value: id, action, state: 'modified' }) }}
      />
    })
    steps.push({
      title: 'Project - Location',
      content: <ProjectLocationStep />
    })
    steps.push({
      title: 'Project - Manager',
      content: <ProjectManagerStep />
    })

    //Funding
    projectFunderDetails.map(funder => {
      let index = projectFunderDetails.indexOf(funder) + 1

      steps.push({
        title: `Funding #${index} - Details`,
        content: <FundingDetailsStep details={funder} />
      })
    })

    steps.push({
      title: 'Funding - Add',
      optional: true,
      content: <FundingAddStep onAddClick={this.addFundingDetails} />
    })

    //Adaptation
    adaptationDetails.map(action => {

      let index = adaptationDetails.indexOf(action) + 1

      steps.push({
        title: `Adaptation #${index} - Details`,
        content: <AdaptationDetailsStep details={action} />
      })
      steps.push({
        title: `Adaptation #${index} - Contact`,
        content: <AdaptationContactStep details={action} />
      })

      // Optionally add Research
      if (action.ResearchDetail !== null) {
        steps.push({
          title: `Adaptation #${index} - Research`,
          content: <AdaptationResearchStep details={action} />
        })
      }

      // Optionally add Funding
      // ...

    })

    steps.push({
      title: 'Adaptation - Add',
      optional: true,
      content: <AdaptationAddStep onAddClick={this.addAdaptationAction} />
    })

    //Mitigation
    steps.push({
      title: 'Mitigation - Add',
      optional: true,
      content: <MitigationAddStep /*onAddClick={this.addMitigationAction}*/ />
    })

    //Summary
    steps.push({
      title: 'Summary',
      content: <OverallSummaryStep
        projectDetails={projectDetails}
        adaptationDetails={adaptationDetails} 
        funderDetails={projectFunderDetails}
      />
    })

    return steps
  }

  render() {

    let { winHeight, currentStep, progressCompleteOverride, mode } = this.state

    let steps = this.getSteps()

    return (
      <div style={{ height: "93vh", overflowY: "hidden", overflowX: 'hidden' }}>
        <Row>
          <Col md="3">
            <div style={{ height: (winHeight - 200), maxHeight: (winHeight - 200), overflowY: "auto", overflowX: 'hidden' }}>
              <Steps direction="vertical" current={currentStep}>
                {steps.map(item => {
                  if (mode === "add") {
                    return < Step key={item.title} title={item.title} />
                  }
                  else {
                    return <Step
                      key={item.title}
                      title={<a href="#">{item.title}</a>}
                      onClick={() => {
                        this.setState({ currentStep: steps.indexOf(item) })
                      }}
                    />
                  }
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
                  <br />
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
                    currentStep === steps.length - 1 &&
                    <Button
                      size="sm"
                      color="warning"
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