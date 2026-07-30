import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Landmark, User, Navigation } from 'lucide-react';

// Leaflet 커스텀 아이콘 생성자
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker-wrapper',
    html: `
      <div class="custom-user-marker">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  });
};

const createHeritageIcon = (isSelected) => {
  return L.divIcon({
    className: 'custom-heritage-marker-wrapper',
    html: `
      <div class="custom-heritage-marker" style="${isSelected ? 'transform: scale(1.3); background: linear-gradient(135deg, #e11d48, #be123c); border-color: #fbbf24; box-shadow: 0 0 20px #e11d48;' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="22" x2="21" y2="22"></line>
          <line x1="6" y1="18" x2="6" y2="11"></line>
          <line x1="10" y1="18" x2="10" y2="11"></line>
          <line x1="14" y1="18" x2="14" y2="11"></line>
          <line x1="18" y1="18" x2="18" y2="11"></line>
          <polygon points="12 2 20 7 4 7 12 2"></polygon>
        </svg>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

// Haversine 공식을 이용한 두 위경도 간 거리(km) 계산
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구 반경 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 지도 중심 자동 이동 보조 컴포넌트
function MapCenterController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ userLocation, heritageList, selectedHeritage, onSelectHeritage, mapCenter, zoomLevel, showRadius }) {
  const userIcon = createUserIcon();

  // showRadius 모드일 때는 5km 이내의 유산만 필터링합니다.
  const displayHeritages = showRadius 
    ? heritageList.filter(item => calculateDistance(userLocation.lat, userLocation.lng, item.lat, item.lng) <= 5)
    : heritageList;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1 }}>
      <MapContainer 
        center={mapCenter || [userLocation.lat, userLocation.lng]} 
        zoom={zoomLevel || 13} 
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <MapCenterController center={mapCenter} zoom={zoomLevel} />
        
        {/* Dark Theme Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* 사용자 위치 마커 */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div style={{ padding: '4px', textAlign: 'center' }}>
              <strong style={{ color: '#3b82f6' }}>📍 내 현재 위치</strong>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>탐방 출발 지점</p>
            </div>
          </Popup>
        </Marker>

        {/* 5km 반경 표시 (내 주변 5km 모드일 때) */}
        {showRadius && (
          <Circle 
            center={[userLocation.lat, userLocation.lng]} 
            radius={5000} 
            pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.08, dashArray: '6, 6' }} 
          />
        )}

        {/* Cultural Heritage Markers */}
        {displayHeritages.map((item) => {
          const isSelected = selectedHeritage?.id === item.id;
          const heritageIcon = createHeritageIcon(isSelected);

          return (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={heritageIcon}
              eventHandlers={{
                click: () => onSelectHeritage(item)
              }}
            >
              <Popup>
                <div style={{ textAlign: 'center', padding: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>{item.era}</span>
                  <h4 style={{ margin: '2px 0 4px 0', fontSize: '0.9rem', color: '#0f172a' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0 0 6px 0' }}>{item.address}</p>
                  <button
                    onClick={() => onSelectHeritage(item)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    AI 3문장 카드 보기
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
