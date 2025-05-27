import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Marker ikonu düzeltme
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng); // Seçilen konumu üst componente gönder
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📍 Harita Sayfası</h2>
      <p className="mb-4 text-sm text-gray-600">Haritadan bir nokta seçmek için tıklayın.</p>

      <div className="h-[650px] w-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={[39.9208, 32.8541]} zoom={6} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <LocationMarker onSelect={setSelectedLocation} />
        </MapContainer>
      </div>

      {selectedLocation && (
        <div className="mt-4 text-sm text-gray-800">
          <strong>Seçilen Konum:</strong> <br />
          Enlem: {selectedLocation.lat} <br />
          Boylam: {selectedLocation.lng}
        </div>
      )}
    </div>
  );
}
