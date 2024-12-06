import React, { useEffect, useState } from "react";
import "@/index.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import axios from "axios";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

const iconsByType = {
  hospital: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3176/3176361.png",
    iconSize: [30, 30],
  }),
  shop: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1076/1076885.png",
    iconSize: [30, 30],
  }),
  bus_station: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  }),
  railway_station: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684913.png",
    iconSize: [30, 30],
  }),
  medical: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913640.png",
    iconSize: [30, 30],
  }),
};

const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const NearbyMarkers = ({ position }) => {
  const map = useMap();
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchNearbyLocations = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=hospital,shop,bus_station,railway_station,medical&lat=${position[0]}&lon=${position[1]}&limit=5`
        );
        setNearbyLocations(response.data);
        map.flyTo(position, 14);
      } catch (error) {
        console.error("Error fetching nearby locations", error);
      }
    };

    const fetchRoutes = async (destinations) => {
      try {
        const routePromises = destinations.map((location) =>
          axios.get(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248b11a55be69974f1696fb01c36465042c&start=${position[1]},${position[0]}&end=${location.lon},${location.lat}`
          )
        );

        const routeResponses = await Promise.all(routePromises);
        const routesData = routeResponses.map((response) => response.data.features[0].geometry.coordinates);
        setRoutes(routesData);
      } catch (error) {
        console.error("Error fetching routes", error);
      }
    };

    fetchNearbyLocations().then(() => fetchRoutes(nearbyLocations));
  }, [position, map]);

  return (
    <>
      {nearbyLocations.map((location, index) => (
        <Marker
          key={index}
          position={[parseFloat(location.lat), parseFloat(location.lon)]}
          icon={iconsByType[location.type] || customIcon}
        >
          <Popup>{location.display_name}</Popup>
        </Marker>
      ))}
      {routes.map((route, index) => (
        <Polyline key={index} positions={route.map(([lon, lat]) => [lat, lon])} color="blue" />
      ))}
    </>
  );
};

const Map = ({ markers }) => {
  const { geocode, popUp } = markers[0];
  if (!geocode?.[0] || !geocode?.[1]) return null;

  return (
    <MapContainer center={geocode} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} key={index} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <NearbyMarkers position={geocode} />
    </MapContainer>
  );
};

export default Map;
