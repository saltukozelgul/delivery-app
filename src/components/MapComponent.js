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
  const [title, setTitle] = useState("Siparişiniz yolda!");
  const [subtitle, setSubtitle] = useState("");
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

  // Call the updateCourierLocation function every 2 seconds
  useEffect(() => {
    const interval = setInterval(UpdateCourierLocation, 2000);
    return () => clearInterval(interval);
  }, );

  // Updating courier and customer location states
  useEffect(() => {
    setCourierLocation(props.courierLocation);
    setCustomerLocation(props.customerLocation);
  }, [props.courierLocation, props.customerLocation]);


  // This function is used to update the courier location
  function UpdateCourier() {
    const map = useMapEvents({
      click() {
        map.flyTo(courierLocation, map.getZoom());
        setIsFollowing(true);
      },
      drag() {
        setIsFollowing(false);
      },
    });
    if (isFollowing) {
      map.flyTo(courierLocation, map.getZoom());
    }
    // If the courier is near the customer, change the title
    if (Math.abs(courierLocation[0] - customerLocation[0]) < 0.0001 && Math.abs(courierLocation[1] - customerLocation[1]) < 0.0001) {
      setTitle("Kuryemiz kapıda");
      setSubtitle("Siparişiniz birazdan teslim edilecektir.");
    }
    else {
      setTitle("Siparişiniz yolda!");
      setSubtitle("");
    }
  }

  // Eğer kullanıcıdan konumu alıp kullancıyı orada başlatırsak
  // bu fonksiyonu kullanabiliriz ancak bize zaten konumun verilecegini
  // dusunuerek bu fonksiyonu kullanmadım
  
  /* function ClickForLocation() {
    const map = useMapEvents({

        click() {
          map.locate();
        }, 
        locationfound(e) {
          map.flyTo(e.latlng, map.getZoom());
        },
    });
  } */

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
        <UpdateCourier />
      </MapContainer>
      <CustomCard
        title={title}
        subtitle={subtitle}
        price={props.price}
        time={props.time}
        esttime={props.esttime}
      />
    </>
  );
}

// Exporting the map component as default
export default MapComponent;
