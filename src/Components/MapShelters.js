import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // ייבוא לניווט חזרה
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import '../Style/CssPages/MapShelters.css';
import { GetItems } from "../Service";

const mapContainerStyle = {
  width: "100%",
  height: "100vh"
};

const defaultCenter = { lat: 31.3147, lng: 34.6203 }; // אופקים

// פונקציה לחישוב מרחק אווירי בין שתי נקודות ציון (קואורדינטות)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // רדיוס כדור הארץ בקילומטרים
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distanceKm = R * c;
  
  // אם המרחק קטן מקילומטר, נחזיר במטרים, אחרת בקילומטרים
  if (distanceKm < 1) {
    return { value: distanceKm, text: `${Math.round(distanceKm * 1000)} מטרים` };
  }
  return { value: distanceKm, text: `${distanceKm.toFixed(1)} ק"מ` };
};

function MapShelters() {
  const navigate = useNavigate(); // הוק לניווט
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [closestShelters, setClosestShelters] = useState([]); // שמירת 5 המיגוניות הקרובות

  // 1. טעינת כל המיגוניות
  async function loadShelters() {
    try {
      const data = await GetItems("shelters");
      setShelters(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadShelters();
  }, []);

  // 2. קבלת מיקום משתמש
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.error("לא ניתן לקבל מיקום."),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  // 3. חישוב 5 המיגוניות הקרובות (מופעל אוטומטית כשיש מיקום ומיגוניות)
  useEffect(() => {
    if (userLocation && shelters.length > 0) {
      const sheltersWithDistance = shelters.map(shelter => {
        const distanceData = calculateDistance(
          userLocation.lat, userLocation.lng, 
          shelter.latitude, shelter.longitude
        );
        return {
          ...shelter,
          distanceValue: distanceData.value, // לטובת המיון (מספר)
          distanceText: distanceData.text    // לטובת התצוגה למשתמש (מחרוזת)
        };
      });

      // מיון מהקרוב לרחוק ולקיחת ה-5 הראשונים
      const sorted = sheltersWithDistance
        .sort((a, b) => a.distanceValue - b.distanceValue)
        .slice(0, 5);
        
      setClosestShelters(sorted);
    } else {
      // אם אין מיקום, פשוט נציג 5 מיגוניות כלשהן או את כולן
      setClosestShelters(shelters.slice(0, 5));
    }
  }, [userLocation, shelters]);

  // 4. פונקציית החזרה לדשבורד
  const handleBackToDashboard = () => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole"); // נניח שזה "admin" או "user"

    if (!userId) {
      navigate("/"); // אם אין משתמש מחובר נזרוק לדף הבית
      return;
    }

    if (userRole === "admin") {
      navigate(`/admin-dashboard/${userId}`);
    } else {
      navigate(`/dashboard/${userId}`);
    }
  };

  // 5. ניתוב מסלול
  const calculateRoute = useCallback((shelter) => {
    if (!userLocation) {
      alert("אנא אשר הרשאת מיקום כדי לחשב מסלול");
      return;
    }
    
    // 1. איפוס המסלול הקודם כדי למנוע כפילויות או תקיעות
    setDirectionsResponse(null); 
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
          // 2. השמת המסלול החדש
          setDirectionsResponse(result);
        } else {
          console.error("שגיאה בחישוב מסלול:", status);
          alert("לא נמצא מסלול הליכה פנוי למיגונית זו.");
        }
      }
    );
  }, [userLocation]);

  // הגדרת אייקונים אישיים (שימי כאן קישורים לתמונות שתרצי או ייבוא מקומי)
  const userIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // אייקון כחול למשתמש
  const shelterIcon = "http://maps.google.com/mapfiles/ms/icons/red-pushpin.png"; // אייקון נעץ אדום למיגונית

  if (!isLoaded) return <div className="loading-screen">טוען מפה...</div>;

  return (
    <div className="map-page-container">
      
      {/* צד ימין: רשימת המיגוניות */}
      <div className="sidebar">
        {/* כפתור חזרה */}
        <button className="back-btn" onClick={handleBackToDashboard}>
          ➔ חזרה לאזור האישי
        </button>

        <h2 className="sidebar-title">5 המיגוניות הקרובות אלייך</h2>
        
        {closestShelters.map((shelter) => (
          <div 
            key={shelter.shelterId}
            onClick={() => calculateRoute(shelter)}
            className={`shelter-card ${selectedShelter?.shelterId === shelter.shelterId ? 'selected' : ''}`}
          >
            <h3 className="shelter-name">{shelter.shelterName}</h3>
            <p className="shelter-address">כתובת: {shelter.address}</p>
            {/* הצגת המרחק המחושב */}
            <p className="shelter-distance">מרחק: {shelter.distanceText || "לא ידוע"}</p>
          </div>
        ))}
      </div>

      {/* צד שמאל: המפה */}
      <div className="map-view">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={userLocation ? 16 : 14} // זום קרוב יותר אם יש מיקום
          center={userLocation || defaultCenter}
        >
          {userLocation && (
            <MarkerF 
              position={userLocation} 
              icon={{ url: userIcon }} // אייקון משתמש
            />
          )}

          {closestShelters.map(shelter => (
            <MarkerF
              key={shelter.shelterId}
              position={{ lat: shelter.latitude, lng: shelter.longitude }}
              onClick={() => calculateRoute(shelter)}
              icon={{ url: shelterIcon }} // אייקון מיגונית
            />
          ))}

          {directionsResponse && selectedShelter && (
            <DirectionsRenderer 
              key={selectedShelter.shelterId} // המפתח מכריח ציור מחדש בכל בחירה
              options={{ 
                directions: directionsResponse,
                suppressMarkers: true 
              }} 
            />
          )}
        </GoogleMap>
      </div>

    </div>
  );
}

export default MapShelters;