import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CitySelector from './components/CitySelector';
import MapView from './components/MapView';
import HeritagePopupCard from './components/HeritagePopupCard';
import RoutePanel from './components/RoutePanel';
import Home from './components/Home';
import AiSearchPanel from './components/AiSearchPanel';
import GyeonggiMapOverview from './components/GyeonggiMapOverview';

import { 
  GYEONGGI_CITIES, 
  filterHeritages,
  fetchGyeonggiAllHeritageXmlData 
} from './services/culturalHeritageService';
import { processNaturalLanguageSearch } from './services/geminiService';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('HOME');

  const [userLocation, setUserLocation] = useState({ lat: 37.2636, lng: 127.0286 });
  const [selectedCityId, setSelectedCityId] = useState('all');
  const [heritageList, setHeritageList] = useState([]);
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [activeRouteHeritage, setActiveRouteHeritage] = useState(null);

  const [mapCenter, setMapCenter] = useState([37.2636, 127.0286]);
  const [zoomLevel, setZoomLevel] = useState(13);

  const [isAiSearching, setIsAiSearching] = useState(false);
  const [is500Loaded, setIs500Loaded] = useState(false);

  const [showAiPanel, setShowAiPanel] = useState(false);

  // 1. 사용자 GPS 및 경기도 500개 수백 개 문화재 실시간 자동 로드
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const uLat = position.coords.latitude;
          const uLng = position.coords.longitude;
          setUserLocation({ lat: uLat, lng: uLng });
        },
        (err) => console.log('Location default Suwon')
      );
    }

    // 국가유산청 경기도 500개 수백 개 전체 데이터 실시간 비동기 로드
    fetchGyeonggiAllHeritageXmlData().then((fullList) => {
      setIs500Loaded(true);
      const filtered = filterHeritages({
        cityId: selectedCityId,
        userLat: userLocation.lat,
        userLng: userLocation.lng
      });
      setHeritageList(filtered);
    });
  }, []);

  // 도시 선택 및 필터링 업데이트
  const handleSelectCity = (cityId) => {
    // 이미 선택된 도시를 다시 누르면 토글 해제 (전체 보기)
    const newCityId = (selectedCityId === cityId && cityId !== 'all') ? 'all' : cityId;
    setSelectedCityId(newCityId);
    setSelectedHeritage(null);
    setActiveRouteHeritage(null);
    setViewMode('DETAIL');

    const filtered = filterHeritages({
      cityId: newCityId,
      userLat: userLocation.lat,
      userLng: userLocation.lng
    });
    setHeritageList(filtered);

    if (newCityId === 'all') {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setZoomLevel(12);
    } else {
      const cityObj = GYEONGGI_CITIES.find(c => c.id === newCityId);
      if (cityObj) {
        setMapCenter([cityObj.lat, cityObj.lng]);
        setZoomLevel(12.8);
      }
    }
  };

  // AI 자연어 검색 처리 (결과만 반환)
  const handleNaturalLanguageSearch = async (query) => {
    if (!query || query.trim() === '') return [];

    setIsAiSearching(true);

    try {
      const currentList = filterHeritages({
        cityId: selectedCityId,
        userLat: userLocation.lat,
        userLng: userLocation.lng
      });

      const matchedList = await processNaturalLanguageSearch(query, currentList);
      return matchedList;
    } catch (error) {
      console.error('AI search error:', error);
      return [];
    } finally {
      setIsAiSearching(false);
    }
  };

  // AI 추천 결과에서 특정 유산을 선택했을 때의 처리
  const handleSelectAiResult = (heritage) => {
    setSelectedHeritage(heritage);
    setActiveRouteHeritage(null);
    setMapCenter([heritage.lat, heritage.lng]);
    setZoomLevel(14.5);
    setViewMode('DETAIL');

    // 선택된 문화유산의 지역(City)으로 CitySelector(필터) 자동 변경
    if (heritage.cityName) {
      const cityObj = GYEONGGI_CITIES.find(c => c.name === heritage.cityName);
      if (cityObj) {
        setSelectedCityId(cityObj.id);
        const filtered = filterHeritages({
          cityId: cityObj.id,
          userLat: userLocation.lat,
          userLng: userLocation.lng
        });
        setHeritageList(filtered);
      }
    }
  };

  const handleSelectHeritage = (heritage) => {
    setSelectedHeritage(heritage);
    setActiveRouteHeritage(null);
    setMapCenter([heritage.lat, heritage.lng]);
    setZoomLevel(14.5);
  };

  const handleStartRoute = (heritage) => {
    setActiveRouteHeritage(heritage);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      
      {viewMode === 'DETAIL' && (
        <Header 
          onSearch={handleNaturalLanguageSearch}
          isAiSearching={isAiSearching}
          onGoHome={() => setViewMode('HOME')}
          onOpenAiPanel={() => setShowAiPanel(true)}
          selectedCityId={selectedCityId}
          onSelectCity={handleSelectCity}
          is500Loaded={is500Loaded}
        />
      )}

      <main style={{ flex: 1, position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {viewMode === 'HOME' ? (
          <Home 
            onSelectAiSearch={handleNaturalLanguageSearch}
            onSelectAiResult={handleSelectAiResult}
            onSelectRegionSearch={() => setViewMode('OVERVIEW')}
            isAiSearching={isAiSearching}
          />
        ) : viewMode === 'OVERVIEW' ? (
          <GyeonggiMapOverview 
            onSelectCity={handleSelectCity}
            onGoHome={() => setViewMode('HOME')}
          />
        ) : (
          <MapView 
            userLocation={userLocation}
            heritageList={heritageList}
            selectedHeritage={selectedHeritage}
            onSelectHeritage={handleSelectHeritage}
            mapCenter={mapCenter}
            zoomLevel={zoomLevel}
            showRadius={selectedCityId === 'all'}
          />
        )}

        {viewMode === 'DETAIL' && selectedHeritage && (
          <HeritagePopupCard 
            heritage={selectedHeritage}
            onClose={() => setSelectedHeritage(null)}
            onStartRoute={handleStartRoute}
          />
        )}

        {viewMode === 'DETAIL' && activeRouteHeritage && (
          <RoutePanel 
            heritage={activeRouteHeritage}
            userLocation={userLocation}
            onClose={() => setActiveRouteHeritage(null)}
          />
        )}
      </main>

      {showAiPanel && (
        <AiSearchPanel 
          onClose={() => setShowAiPanel(false)}
          onSubmit={async (query) => {
             const results = await handleNaturalLanguageSearch(query);
             // 팝업 내부에서 결과를 보여줘야 하므로 여기서 강제로 닫지 않음.
             return results;
          }}
          onSelectResult={handleSelectAiResult}
          isSearching={isAiSearching}
        />
      )}
    </div>
  );
}
