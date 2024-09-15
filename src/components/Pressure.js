import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';
import pressure from '../Images/pressurelegend.png'
const Pressure = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const location1 = params.get('location1');

  // Define your OpenWeatherMap API key
  const apiKey = '9cc5f3fb9866c047c6c27c443f91f6d4';

  // Define your OpenCage API key
  const openCageApiKey = '373b270f57204c478ec5960800ace141'; // Replace with your OpenCage API key

  useEffect(() => {
    const mapInstance = L.map('map').setView([20, 0], 2); // Centered on the world

    // Add a base layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(mapInstance);

    // Add OpenWeatherMap temperature layer
    L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
      maxZoom: 19,
      attribution: '© OpenWeatherMap',
    }).addTo(mapInstance);

    // Add OpenWeatherMap radar layer
    L.tileLayer(`https://tile.openweathermap.org/map/radar/{z}/{x}/{y}.png?appid=${apiKey}`, {
      maxZoom: 19,
      attribution: '© OpenWeatherMap',
    }).addTo(mapInstance);

    // Add OpenWeatherMap cities layer
    L.tileLayer(`https://tile.openweathermap.org/map/city/{z}/{x}/{y}.png?appid=${apiKey}`, {
      maxZoom: 19,
      attribution: '© OpenWeatherMap',
    }).addTo(mapInstance);

    // Add a custom legend control
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `<img src=${pressure} alt="Pressure legend">`;
      return div;
    };

    legend.addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup function to remove the map on unmount
    return () => {
      mapInstance.remove();
    };
  }, [apiKey]);

  // Function to get coordinates from location name using OpenCage Geocoding API
  const getCoordinates = async (locationName) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationName)}&key=${openCageApiKey}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry;
    } else {
      alert('Location not found!');
      return null;
    }
  };

  useEffect(() => {
    const handleLocate = async () => {
      const coordinates = await getCoordinates(location1);
      if (coordinates) {
        const { lat, lng } = coordinates;
        if (marker) {
          map.removeLayer(marker);
        }
        const newMarker = L.marker([lat, lng]).addTo(map);
        newMarker.bindPopup(`<b>${location1}</b><br>Latitude: ${lat}, Longitude: ${lng}`).openPopup();
        map.setView([lat, lng], 10);
        setMarker(newMarker);
      }
    };

    if (location1 && map) {
      handleLocate();
    }
  }, [location1, map]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div id="map" style={{ flex: 1 }}></div>
    </div>
  );
};

export default Pressure;
