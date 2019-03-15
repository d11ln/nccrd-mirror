import React from 'react'
import { Row, Col, Button, Input, Fa, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { DEAGreen, DEAGreenDark } from '../../config/colours.js'

//Import Leaflet CSS an fix icon issues
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  return { editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectLocation: (payload) => {
      dispatch({ type: "SET_PROJECT_LOCATION", payload })
    }
  }
}

const DEFAULT_VIEWPORT = {
  center: [-30.5595, 22.9375],
  zoom: 6,
}

class LocationInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapModal: false,
      hasLocation: false,
      viewport: {
        center: [DEFAULT_VIEWPORT.center[0], DEFAULT_VIEWPORT.center[1]],
        zoom: DEFAULT_VIEWPORT.zoom,
      },
      marker: {
        lat: DEFAULT_VIEWPORT.center[0],
        lng: DEFAULT_VIEWPORT.center[1]
      }
    }

    this.mapRef = React.createRef();

    this.removeButtonClick = this.removeButtonClick.bind(this)
    this.mapButtonClick = this.mapButtonClick.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.onMapViewportChanged = this.onMapViewportChanged.bind(this)
    this.handleMapLocationFound = this.handleMapLocationFound.bind(this)
    this.findMyLocationClick = this.findMyLocationClick.bind(this)
    this.closeMapModal = this.closeMapModal.bind(this)
  }

  componentDidMount() {

  }

  removeButtonClick() {
    this.props.setProjectLocation({
      id: this.props.data.ProjectLocationId,
      value: null,
      state: "modified"
    })
  }

  mapButtonClick() {
    this.setState({ mapModal: true })

    let { data } = this.props
    if (data) {
      this.handleMapLocationFound({
        latlng: {
          lat: data.Location.LatCalculated,
          lng: data.Location.LonCalculated
        }
      })
    }
  }

  handleMapLocationFound(e) {
    let { viewport } = this.state
    viewport.center = [e.latlng.lat, e.latlng.lng]

    viewport.zoom = (e.latlng.lat == DEFAULT_VIEWPORT.center[0] && e.latlng.lng == DEFAULT_VIEWPORT.center[1]) ? 6 : 10
    this.setState({
      viewport,
      marker: e.latlng,
      hasLocation: true
    })
  }

  handleMapClick(e) {
    this.setState({ marker: e.latlng, hasLocation: true })
  }

  onMapViewportChanged(viewport) {
    this.setState({ viewport })
  }

  findMyLocationClick() {
    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate()
    }
  }

  closeMapModal(save) {
    if (save) {
      let { marker } = this.state
      this.props.setProjectLocation({
        id: this.props.data.ProjectLocationId,
        value: `${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}`,
        state: "modified"
      })
    }
    else {
      let { data } = this.props
      if (data) {
        this.handleMapLocationFound({
          latlng: {
            lat: data.Location.LatCalculated,
            lng: data.Location.LonCalculated
          }
        })
      }
    }

    this.setState({ mapModal: false })
  }

  render() {

    let { data, editMode } = this.props
    let { viewport, marker, hasLocation, mapModal } = this.state

    let value = ""
    if (data && data.Location) {
      value = `${data.Location.LatCalculated}, ${data.Location.LonCalculated}`
    }

    //Conditional Marker
    const markerJSX = hasLocation ? (
      <Marker position={marker}>
        <Popup>
          {marker.lat}, {marker.lng}
        </Popup>
      </Marker>
    ) : null

    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>
                <Input
                  value={value}
                  style={{
                    height: "21px",
                    marginTop: "-15px",
                    marginBottom: "-20px",
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    padding: "5px"
                  }}
                  readOnly
                />
              </td>
              {
                editMode &&
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    style={{
                      width: "35px",
                      padding: "5px 0px 5px 0px",
                      marginTop: "10px",
                      marginLeft: "15px"
                    }}
                    onClick={this.removeButtonClick}>
                    <Fa size="2x" icon="trash" />
                  </Button>
                </td>
              }
              {
                editMode &&
                <td>
                  <Button
                    size="sm"
                    color="grey"
                    style={{
                      width: "35px",
                      padding: "5px 0px 5px 0px",
                      marginTop: "10px",
                      marginLeft: "-4px",
                    }}
                    onClick={this.mapButtonClick}>
                    <Fa size="2x" icon="globe" />
                  </Button>
                </td>
              }
            </tr>
          </tbody>
        </table>

        <Modal isOpen={mapModal} size="fluid" centered>
          <ModalHeader>
            Select location from map
            <Button
              size="sm"
              onClick={this.findMyLocationClick}
              style={{ marginTop: "3px", marginLeft: "15px" }}
            >
              Find my location
            </Button>
          </ModalHeader>
          <ModalBody>
            <Map
              style={{ height: "65vh" }}
              onClick={this.handleMapClick}
              onMapViewportChanged={this.onMapViewportChanged}
              onLocationfound={this.handleMapLocationFound}
              center={viewport.center}
              zoom={viewport.zoom}
              ref={this.mapRef}
            >
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markerJSX}
            </Map>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              style={{ margin: "0px, 10px 0px 0px" }}
              onClick={() => this.closeMapModal(true)}>
              Ok
            </Button>
            <Button
              color="grey"
              size="sm"
              style={{ margin: "0px, 0px 0px 0px" }}
              onClick={() => this.closeMapModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationInput)