import React, { useEffect, useRef, useState } from "react";

import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";

import "@tomtom-international/web-sdk-maps/dist/maps.css";

import "./RouteMap.css";

const RouteMap = ({ start, destination }) => {
  const mapElement = useRef(null);

  // dummy start and destination iit kharagpur and kolkata
  start = { lat: 22.314, lng: 87.3106 };
  destination = { lat: 22.5726, lng: 88.3639 };

  const key = process.env.REACT_APP_TOMTOM_API_KEY;

  const [map, setMap] = useState(null);

  const addMarker = (position) => {
    position = [position.lng, position.lat];
    new tt.Marker().setLngLat(position).addTo(map);
    console.log("Marker added at ", position);
  };

  const addRoute = (start, end) => {
    addMarker(start);
    addMarker(end);

    const coordinates = [start, end];

    const options = {
      key: key,
      locations: coordinates,
      travelMode: "motorcycle",
    };

    calculateRoute("blue", options);
  };

  const calculateRoute = async (color, options) => {
    const response = await services.calculateRoute(options);
    const geojson = response.toGeoJson();

    map.addLayer({
      id: "route" + color,
      type: "line",
      source: {
        type: "geojson",
        data: geojson,
      },
      paint: {
        "line-color": color,
        "line-width": 6,
      },
    });
  };

  useEffect(() => {
    const getZoomLevel = (start, destination) => {
      const latDiff = Math.abs(start.lat - destination.lat);
      const lngDiff = Math.abs(start.lng - destination.lng);

      const diff = Math.max(latDiff, lngDiff);

      if (diff < 0.001) return 16;
      if (diff < 0.01) return 14;
      if (diff < 0.1) return 12;
      if (diff < 1) return 10;
      if (diff < 10) return 8;
      return 5;
    };

    const options = {
      key: key,
      container: mapElement.current,
      center: [
        (start.lng * 3 + destination.lng * 2) / 5,
        (start.lat * 3 + destination.lat * 2) / 5,
      ],
      zoom: getZoomLevel(start, destination),
    };

    const map = tt.map(options);

    console.log(key);

    setMap(map);

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (map) {
      addRoute(start, destination);
    }
  }, [map, start, destination]);

  return (
    <div
      ref={mapElement}
      className="map-container"
      style={{ height: "500px", width: "500px" }}
    />
  );
};

export default RouteMap;
