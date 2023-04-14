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

  // For testing purposes this function is used to update the courier location
  function updateCourierLocation() {
    const index = Math.floor(Math.random() * 10);
    const newLocation = [
      props.courierLocation[0] + index / 10000,
      props.courierLocation[1] + index / 10000,
    ];
    setCourierLocation(newLocation);
    console.log("Location updated")
    console.log("Index: " + index)
  }

  // Call the updateCourierLocation function every 5 seconds
  useEffect(() => {
    const interval = setInterval(updateCourierLocation, 1000);
    return () => clearInterval(interval);
  }, []);


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
    const map = useMapEvents({
      /*  
      Eger kullanici konumunu istemek istemiyorsak bu fonksiyonu kullanabiliriz. 
      click() {
        map.locate();
      }, 
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },*/
      click() {
        map.flyTo(customerLocation, map.getZoom());
      },
    });
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
