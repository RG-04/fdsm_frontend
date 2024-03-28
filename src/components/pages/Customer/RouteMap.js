import React, { createRef } from "react";

import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "./RouteMap.css";

const API_KEY = "BgF3rbSpbLqQcJzK5QrlYAlAADtrGviv";
const SAN_FRANCISCO = [-122.4194, 37.7749];

class RouteMap extends React.Component {
  constructor(props) {
    super(props);

    this.mapElement = createRef();
    
  }

  componentDidMount() {
    this.map = tt.map({
      key: API_KEY,
      container: this.mapElement.current,
      center: SAN_FRANCISCO,
      zoom: 12
    });

    this.route();

  }

  componentWillUnmount() {
    this.map.remove();
  }

  addMarker = (coord) => {

      let loc = [coord.lng, coord.lat];
      new tt.Marker().setLngLat(loc).addTo(this.map);
  };

  route = () => {

    let loc1 = { lat: 37.7749, lng: -122.4194 }
    let loc2 = { lat: 37.7749, lng: -122.4294 }

    this.addMarker(loc1)
    this.addMarker(loc2)
    
    const key = API_KEY;
    const locations = [loc1, loc2]
    console.log(locations);

    this.calculateRoute("blue", {
      key,
      locations,
      travelMode: "car",
    });

  };

  calculateRoute = async (color, routeOptions) => {
    try {
      const response = await services.calculateRoute(routeOptions);
      const geojson = response.toGeoJson();

      this.time = geojson.features[0].properties.summary.travelTimeInSeconds;
        console.log(this.time);

      this.map.addLayer({
        id: color,
        type: "line",
        source: {
          type: "geojson",
          data: geojson
        },
        paint: {
          "line-color": color,
          "line-width": 6
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <div ref={this.mapElement} className="mapDiv">
        <div id="container">
            <div id="text">{this.time}</div>
        </div>
        </div>
      </div>
    );
  }
}

export default RouteMap;
