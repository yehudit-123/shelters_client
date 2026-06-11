import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import '../Style/CssPages/MapShelters.css'; // ייבוא קובץ העיצוב החדש
import { GetItems } from "../Service";

// הספרייה של גוגל דורשת אובייקט JS עבור גודל המפה עצמה
const mapContainerStyle = {
  width: "100%",
  height: "100%"
};

const defaultCenter = { lat: 31.3147, lng: 34.6203 }; // אופקים

function MapShelters() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const [shelters, setShelters] = useState([]);
  async function loadShelters() {
    try {
      const data = await GetItems("shelters");
              console.log(data);

      setShelters(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    loadShelters();
  }, []);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
           console.log(position.coords.latitude);
    console.log(position.coords.longitude);

          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.error("לא ניתן לקבל מיקום."),
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
      );
    }
  }, []);

  const calculateRoute = useCallback((shelter) => {
    if (!userLocation) {
      alert("אנא אשר הרשאת מיקום כדי לחשב מסלול");
      return;
    }
    
    setSelectedShelter(shelter);
    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: shelter.latitude, lng: shelter.longitude },
        travelMode: window.google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        }
      }
    );
  }, [userLocation]);

  if (!isLoaded) return <div className="loading-screen">טוען מפה...</div>;

  return (
    <div className="map-page-container">
      
      {/* צד ימין: רשימת המיגוניות */}
      <div className="sidebar">
        <h2 className="sidebar-title">מיגוניות באזורך</h2>
        
        {shelters.map((shelter) => (
          <div 
           key={shelter.shelterId}
            onClick={() => calculateRoute(shelter)}
            // הוספת מחלקה selected אם המיגונית נבחרה
            className={`shelter-card ${selectedShelter?.shelterId === shelter.shelterId ? 'selected' : ''}`}
          >
            <h3 className="shelter-name">{shelter.shelterName}</h3>
            <p className="shelter-address">כתובת: {shelter.address}</p>
            <p className="shelter-distance">מרחק: {shelter.distance}</p>
          </div>
        ))}
      </div>

      {/* צד שמאל: המפה */}
      <div className="map-view">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={userLocation || defaultCenter}
        >
          {userLocation && (
            <MarkerF position={userLocation} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
          )}

          {shelters.map(shelter => (
            <MarkerF
           key={shelter.shelterId}
              position={{ lat: shelter.latitude, lng: shelter.longitude }}
              onClick={() => calculateRoute(shelter)}
            />
          ))}

          {directionsResponse && (
            <DirectionsRenderer options={{ directions: directionsResponse }} />
          )}
        </GoogleMap>
      </div>

    </div>
  );
}

export default MapShelters;