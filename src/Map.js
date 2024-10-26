import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({position,setShowMap}) => {
  // Specify the latitude and longitude for the map center
 // const position = [37.7749, -122.4194]; // Example coordinates (San Francisco)
  console.log("hello");
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <button className="text-center bg-red-600 px-6 " onClick={()=>setShowMap(false)}>Back</button>
    </div>
  );
};

export default LeafletMap;
