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
import CustomCard from "./CustomCard";

function MapComponent(props) {
  // Defining courier and customer location states
  const [courierLocation, setCourierLocation] = useState(props.courierLocation);
  const [customerLocation, setCustomerLocation] = useState(props.customerLocation);
  const [isFollowing, setIsFollowing] = useState(true);
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

  // Defining the order object
  const order = {
    price: "",
    time: "12:30",
    esttime: "15 dk",
  };

  // For testing purposes this function is used to update the courier location
  const [index, setIndex] = useState(0);
  const path = [
    [39.96697195133853, 32.793047525513884],
    [39.9664, 32.7925], 
    [39.9661, 32.7921],
    [39.9658, 32.7917],
    [39.9655, 32.7913],
    [39.9652, 32.7909],
    [39.9649, 32.7905],
    [39.9646, 32.7901],
    [39.9643, 32.7897],
    [39.9640, 32.7893],
    [39.9637, 32.7889],
    [39.9634, 32.7885],
    [39.9631, 32.7881],
    [39.9628, 32.7877],
    [39.9625, 32.7873],
    [39.9623, 32.7868],
  ];
  function UpdateCourierLocation() {
    var newLocation = path[index];
    setCourierLocation(newLocation);
    console.log("Location updated");
    console.log(newLocation)
    setIndex((index + 1) % path.length);
  }

  // Call the updateCourierLocation function every 1 seconds
  useEffect(() => {
    const interval = setInterval(UpdateCourierLocation, 1000);
    return () => clearInterval(interval);
  }, );

  // Updating courier and customer location states
  useEffect(() => {
    setCourierLocation(props.courierLocation);
    setCustomerLocation(props.customerLocation);
  }, [props.courierLocation, props.customerLocation]);


  function UpdateCourier() {
    const map = useMapEvents({
      click() {
        setIsFollowing(true);
      },
      drag() {
        setIsFollowing(false);
      },
    });
    if (isFollowing) {
      map.flyTo(courierLocation, map.getZoom());
    }
  }

  // Adding click event for user location
  function ClickForLocation() {
    const map = useMapEvents({
      /*  
      Eger kullanici konumunu istemek istiyorsak bu fonksiyonu kullanabiliriz. 
      Ama tahminmince bu componente gelen propslardan biri olarak konum bilgisi gelecek o yuzden bu fonksiyonu kullanmayacagiz.
      
        click() {
          map.locate();
        }, 
        locationfound(e) {
          map.flyTo(e.latlng, map.getZoom());
        },
      */
      click() {
        map.flyTo(courierLocation, map.getZoom());
      },
    });
  }

  // Rendering the map component
  return (
    <>
      <MapContainer
        className="map"
        center={customerLocation}
        zoom={25}
        style={{ height: "100vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={customerLocation} icon={iconMarker}></Marker>
        <Marker position={courierLocation} icon={courierIcon}></Marker>
        <ClickForLocation />
        <UpdateCourier />
      </MapContainer>
      <CustomCard
        price={order.price}
        time={order.time}
        esttime={order.esttime}
      />
    </>
  );
}

// Exporting the map component as default
export default MapComponent;
