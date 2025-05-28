import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker icon düzeltmesi
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Harita tıklama bileşeni
const LocationSelector = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect({ lat, lng });
    },
  });
  return null;
};

// Yıldız bileşeni
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.946a1 1 0 00-.364-1.118l-3.36-2.44c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.946z" />
        </svg>
      ))}
    </div>
  );
};

const MapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markers, setMarkers] = useState([]);
  const [viewMarker, setViewMarker] = useState(null);

  // API'den marker'ları çek
  useEffect(() => {
    fetch("https://localhost:7068/api/MapMaker/GetAll")
      .then((res) => res.json())
      .then((data) => {
        console.log("Gelen veriler:", data);
        if (data.items) {
          const converted = data.items.map((item) => ({
            position: { lat: item.enlem, lng: item.boylam },
            title: item.title,
            description: item.description,
            rating: Math.floor(Math.random() * 5) + 1, // geçici
          }));
          setMarkers(converted);
        }
      })
      .catch((err) => console.error("API Hatası:", err));
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const handleSave = () => {
  if (!selectedLocation || !title || !description) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  const newMarker = {
    title: title,
    description: description,
    enlem: selectedLocation.lat,
    boylam: selectedLocation.lng,
    createByUserId: 1002, // Sabit kullanıcı ID'si
  };

  console.log("API'ye gönderilecek veri:", newMarker);

  fetch("https://localhost:7068/api/MapMaker/Create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMarker),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          console.error("API Hatası:", text);
          throw new Error(text);
        });
      }
      return res.json();
    })
    .then((data) => {
      setMarkers((prev) => [
        ...prev,
        {
          position: {
            lat: newMarker.enlem,
            lng: newMarker.boylam,
          },
          title: newMarker.title,
          description: newMarker.description,
          rating: Math.floor(Math.random() * 5) + 1,
        },
      ]);
      setModalOpen(false);
      setTitle("");
      setDescription("");
      setSelectedLocation(null);
    })
    .catch((err) => {
      console.error("POST sırasında hata:", err);
      alert("Veri kaydedilirken bir hata oluştu.");
    });
};


  const handleMarkerClick = (marker) => {
    setViewMarker(marker);
    setViewModalOpen(true);
  };

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📍 Harita Sayfası</h1>
        <p className="text-gray-500 mt-1">
          Sokak Hayvanlarına Yardım Etmenin Kısa Yolu Pati Nerde İle Sevimli
          Dostlarımıza Ulaşabilirsin.
        </p>
      </div>

      {/* Harita Paneli */}
      <div className="bg-white shadow-lg rounded-xl p-2 h-[70vh] border border-gray-200 overflow-hidden z-0 relative">
        <MapContainer
          center={[39.9208, 32.8541]}
          zoom={6}
          className="h-full w-full rounded-lg z-0"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationSelector onLocationSelect={handleLocationSelect} />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Konum Ekle Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg z-[10000]">
            <h2 className="text-xl font-semibold mb-4">Konum Bilgisi</h2>

            <label className="block text-sm mb-1 font-medium">Başlık</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Başlık girin"
            />

            <label className="block text-sm mb-1 font-medium">Açıklama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              rows={4}
              placeholder="Açıklama girin"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marker Detay Modal */}
      {viewModalOpen && viewMarker && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg z-[10000]">
            <h2 className="text-xl font-semibold mb-2">{viewMarker.title}</h2>
            <p className="text-gray-600 mb-4">{viewMarker.description}</p>
            <StarRating rating={viewMarker.rating} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
