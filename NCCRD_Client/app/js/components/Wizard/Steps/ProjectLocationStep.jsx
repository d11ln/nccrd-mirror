import React from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Fa } from 'mdbreact'
import { DEAGreen } from '../../../config/colours.js'
import TreeSelectMultiple from '../../Shared/TreeSelectMultiple.jsx';
import LocationInput from '../../Shared/LocationInput.jsx'
import { Collapse, Icon } from 'antd'
const Panel = Collapse.Panel;

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  let { lookupData: { region } } = state
  let { projectData: { projectDetails } } = state
  return { region, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectRegions: payload => {
      dispatch({ type: "SET_PROJECT_DETAILS_REGIONS", payload })
    },
    setProjectLocation: (payload) => {
      dispatch({ type: "SET_PROJECT_LOCATION", payload })
    }
  }
}

let locationDeleted = false

class ProjectLocationStep extends React.Component {

  constructor(props) {
    super(props);

    this.regionsChanged = this.regionsChanged.bind(this)
    this.renderLocations = this.renderLocations.bind(this)
    this.mapExpanded = this.mapExpanded.bind(this)
    this.removeLocation = this.removeLocation.bind(this)
    this.addLocation = this.addLocation.bind(this)

    this.state = {
      mapKey: undefined
    }
  }

  getProjectRegionsValue() {

    let { projectDetails, region } = this.props
    let value = []

    if (projectDetails.ProjectRegions) {
      projectDetails.ProjectRegions.forEach(pr => {

        let searchRegion = region.filter(x => x.Id == pr.RegionId)

        if (searchRegion.length > 0) {
          value.push(searchRegion[0].Text)
        }
      })
    }

    return value
  }

  regionsChanged(value) {
    let { projectDetails, region, setProjectRegions } = this.props
    let projectRegions = []

    value.sort((a, b) => parseInt(a) - parseInt(b))
      .forEach(r => {
        let searchRegion = region.filter(x => x.Text === r)

        if (searchRegion.length > 0) {
          projectRegions.push({
            ProjectRegionId: 0,
            ProjectId: projectDetails.ProjectId,
            RegionId: parseInt(searchRegion[0].Id)
          })
        }
      })

    setProjectRegions({ value: projectRegions, state: "modified" })
  }

  addLocation(){
    let dispatch = () => new Promise((resolve, reject) => {
      this.props.setProjectLocation({
        id: 0,
        value: "-30.5595, 22.9375",
        state: "modified"
      })
      resolve()
    })

    dispatch().then(() => {
      this.mapExpanded(this.props.projectDetails.ProjectLocations.length.toString())
    })
  }

  removeLocation(ProjectLocationId) {

    this.props.setProjectLocation({
      id: ProjectLocationId,
      value: null,
      state: "modified"
    })

    locationDeleted = true
  }

  mapExpanded(key) {

    setTimeout(() => {
      
      if (locationDeleted === true) {
        key = undefined // override key to 'undefined'    
        locationDeleted = false // reset locationDeleted
      }

      //Update state
      this.setState({ mapKey: key })

      if (key) {
        //Scroll map into view
        setTimeout(() => {
          let element = document.getElementById(`mapView${key}`);
          element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }, 200);
      }
    }, 100);
  }

  renderLocations(projectLocations) {

    if (projectLocations && projectLocations.length > 0) {
      return (
        <Collapse accordion activeKey={this.state.mapKey} style={{ width: "100%" }} onChange={this.mapExpanded} >
          {
            projectLocations.sort((a, b) => parseInt(a.ProjectLocationId) - parseInt(b.ProjectLocationId)).map(pl => {

              let value = ""
              if (pl && pl.Location) {
                value = `${pl.Location.LatCalculated}, ${pl.Location.LonCalculated}`
              }

              let key = (projectLocations.indexOf(pl) + 1).toString()

              return (
                <Panel
                  id={`mapView${key}`}
                  key={key}
                  showArrow={false}
                  header={
                    <span style={{ paddingTop: 0, paddingLeft: 10 }}>
                      <b>
                        Location:
                        <span style={{ marginLeft: 8 }}><i>{value}</i></span>
                        <span style={{ marginLeft: 15, marginRight: 15 }}>-</span>
                        <span style={{ color: "#0F83FF" }}>Click to expand/collapse map</span>
                      </b>
                    </span>}
                  extra={
                    <Fa className="red-text" size="lg" icon="trash"
                      style={{ marginTop: -5, padding: 7, border: "1px solid grey", borderRadius: 15 }}
                      onClick={() => this.removeLocation(pl.ProjectLocationId)} />
                  }
                >
                  <LocationInput
                    data={pl}
                  />
                </Panel>
              )
            })
          }
        </Collapse>
      )
    }
    else {
      return (
        <p style={{ marginTop: 10 }} key="no_locations">
          <i>
            No locations found.
          </i>
        </p>
      )
    }
  }

  render() {

    let { projectDetails, region, editMode } = this.props

    return (
      <>
        <Row>
          <TreeSelectMultiple
            col="col-md-12"
            label="Regions:"
            selectedValue={this.getProjectRegionsValue()}
            data={region}
            callback={this.regionsChanged}
          />
        </Row>

        <br />

        <Row>
          <Col md="12">
            <label style={{ fontWeight: "bold", marginBottom: "0px" }} >Locations:</label>
            <br />
            {
              editMode &&
              <Button
                size="sm"
                color="primary"
                style={{
                  marginLeft: 0
                }}
                onClick={this.addLocation} >
                <Fa icon="plus" style={{ marginRight: 15 }} />
                Add Location
              </Button>
            }
            {this.renderLocations(projectDetails.ProjectLocations)}
          </Col>
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectLocationStep)