import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css';

const locations = [
  { id: '1', lat: 0.3476, lng: 32.5825, label: 'Kampala' },
  { id: '2', lat: 0.3130, lng: 32.5811, label: 'Kibuli' },
];

const Map = () => {
  const [center] = useState({ lat: 0.3476, lng: 32.5825 });
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  return (
    <div className="map-page">
      <h1>Map</h1>
      <div className="map-frame">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={{ height: '500px', width: '100%' }} center={center} zoom={12}>
            {locations.map((location) => (
              <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }} label={location.label} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;
