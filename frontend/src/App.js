/**
 * @author Jussi Pohjolainen
 */

import "./App.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
class App extends React.Component {
  state = { locations: [] };

  async componentDidMount() {
    let hr = await fetch("http://localhost:8080/locations");
    let json = await hr.json();
    this.setState({ locations: json });
  }

  render() {
    if (this.state.locations.length === 0) {
      return (
        <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      );
    } else {
      let markers = this.state.locations.map((loc) => (
        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
          <Popup>
            Location {loc.id}. <br /> lat: {loc.latitude}, lon: {loc.longitude}.
          </Popup>
        </Marker>
      ));

      return (
        <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <>{markers}</>
        </MapContainer>
      );
    }
  }
}

export default App;
