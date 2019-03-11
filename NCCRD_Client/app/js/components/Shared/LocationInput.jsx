import React from 'react'
import { Row, Col, Button, Input, Fa, /*Modal, ModalBody, ModalHeader, ModalFooter*/ } from 'mdbreact'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { DEAGreen, DEAGreenDark } from '../../config/colours.js'

//Import Leaflet CSS an fix icon issues
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { rejects } from 'assert';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const mapStateToProps = (state, props) => {
  return { }
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

    this.handleMapClick = this.handleMapClick.bind(this)
    this.onMapViewportChanged = this.onMapViewportChanged.bind(this)
    this.handleMapLocationFound = this.handleMapLocationFound.bind(this)
    this.findMyLocationClick = this.findMyLocationClick.bind(this)
    this.saveSelectedLocation = this.saveSelectedLocation.bind(this)
  }

  componentDidMount(){

    let { data } = this.props
    this.handleMapClick({
      latlng: {
        lat: parseFloat(data.Location.LatCalculated),
        lng: parseFloat(data.Location.LonCalculated)
      }
    })
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
    this.saveSelectedLocation(e.latlng)
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

  saveSelectedLocation(marker) {
    this.props.setProjectLocation({
      id: this.props.data.ProjectLocationId,
      value: `${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}`,
      state: "modified"
    })
  }

  render() {

    let { data } = this.props
    let { viewport, marker, hasLocation } = this.state

    //Conditional Marker
    const markerJSX = hasLocation ? (
      <Marker position={marker}>
        <Popup>
          {marker.lat}, {marker.lng}
        </Popup>
      </Marker>
    ) : null

    return (

      <div>
        <h5><b>Select location from map:</b></h5>
        <Map
          style={{ height: 450 }}
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationInput)