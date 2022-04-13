import "./App.css";
import React from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
class App extends React.Component {
  state = { locations: [] };

  async componentDidMount() {
    let results = await axios.get("/locations");
    this.setState({ locations: results.data });
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
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          scrollWheelZoom={false}
          whenCreated={(map) => {
            map.on("dblclick", async (e) => {
              console.log(e.latlng);
              let location = {
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
              };
              try {
                console.log(
                  "Location: " + location.latitude + " " + location.longitude
                );
                let result = await axios.post("/locations", location);
                console.log("result: " + result.data.id);
                location.id = result.data.id;
                window.location.reload();
              } catch (err) {
                console.log(err);
              }
            });
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      );
    }
  }
}

export default App;
