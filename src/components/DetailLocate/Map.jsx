import React from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import {MarkerF} from '@react-google-maps/api'

const containerStyle = {
  width: '500px',
  height: '500px'
};

const center = {
  lat: 10.8231,
  lng: 106.6297
};

const center2 = {
  lat: 10.761485564599026,
  lng: 106.68268548087731
};

const locationIcon = {
  path: 'M9 1c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z',
  fillColor: '#4285F4', // Background color
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 2 // Increase scale for larger background
};

function Map() {
    console.log("check log");
    


  return (
    <LoadScript googleMapsApiKey="AIzaSyCtogOBqVFXxTK6rcqW-RPuNFH1OkcUEUI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{
          zoomControl: false, 
          streetViewControl: false, 
          mapTypeControl: false, 
          fullscreenControl: false,
        }}
      >
        <MarkerF position={center} />
        {/* <MarkerF position={center2} options={locationIcon}/> */}
        <MarkerF position={center2} icon={locationIcon} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
