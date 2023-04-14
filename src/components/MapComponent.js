// Importing necessary packages and modules
import React, { useEffect, useState } from "react";
import { icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import IconCourier from "../assets/courier.png";
import ShadowCourier from "../assets/courier_shadow.png";

function MapComponent(props) {
  // Defining courier and customer location states
  const [courierLocation, setCourierLocation] = useState(props.courierLocation);
  const [customerLocation, setCustomerLocation] = useState(
    props.customerLocation
  );

  // Defining icon marker for the map
  const iconMarker = icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    popupAnchor: [0, -35],
  });

  // Defining the courier icon
  const courierIcon = icon({
    iconUrl: IconCourier,
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    shadowUrl: ShadowCourier,
    shadowSize: [64, 64],
    shadowAnchor: [32, 30],
    popupAnchor: [0, -35],
  });


  // Updating courier and customer location states
  useEffect(() => {
    setCourierLocation(props.courierLocation);
    setCustomerLocation(props.customerLocation);
  }, [props.courierLocation, props.customerLocation]);

  // Adding click event for user location
  function ClickForLocation() {
    const [position, setPosition] = useState(customerLocation);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    // Returning the marker for the user location

/*     return position === null ? null : (
      <Marker position={position} icon={iconMarker}>
        <Popup>Sen buradasın</Popup>
      </Marker>
    ); */
  }

  // Rendering the map component
  return (
    <MapContainer
      className="map"
      center={customerLocation}
      zoom={25}
      style={{ height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={customerLocation} icon={iconMarker}>
      </Marker>
      <Marker position={courierLocation} icon={courierIcon}>    
      </Marker>
      <ClickForLocation />
    </MapContainer>
  );
}

// Exporting the map component as default
export default MapComponent;
