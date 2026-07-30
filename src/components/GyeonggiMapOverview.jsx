import React, { useState } from 'react';
import { GYEONGGI_CITIES, BASE_HERITAGE_DATA, FULL_HERITAGE_DATA } from '../services/culturalHeritageService';
import { Navigation, Sparkles, MapPin, Bus, ArrowLeft } from 'lucide-react';

export default function GyeonggiMapOverview({ onSelectCity, onGoHome }) {
  const [hoveredCityId, setHoveredCityId] = useState(null);

  const getHeritageCount = (cityId) => {
    const dataset = FULL_HERITAGE_DATA.length > 0 ? FULL_HERITAGE_DATA : BASE_HERITAGE_DATA;
    if (cityId === 'all') return dataset.length;
    return dataset.filter(h => h.cityId === cityId).length;
  };

  // 'all'을 제외한 시군만 필터링 후 한글 가나다순으로 정렬
  const cities = GYEONGGI_CITIES.filter(c => c.id !== 'all').sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '24px 20px',
      overflowY: 'auto',
      position: 'relative',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' // 배경을 밝은 파스텔톤으로 통일
    }}>

      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
        <button
          onClick={onGoHome}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          <ArrowLeft size={18} /> 🏠 홈으로 돌아가기
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px', maxWidth: '680px' }} className="animate-fade-in">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(251, 194, 235, 0.2)',
          border: '1px solid #fbc2eb',
          padding: '6px 16px',
          borderRadius: '20px',
          color: '#e879f9',
          fontSize: '0.9rem',
          fontWeight: 800,
          marginBottom: '12px'
        }}>
          <Sparkles size={16} /> 경기도 실시간 문화유산 지도 탐방
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#374151', marginBottom: '8px' }}>
          탐방하고 싶은 도시를 선택하세요
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#6b7280' }}>
          국가유산청 실시간 데이터 연동으로 경기도 전체 수백 개 문화재가 표시됩니다.
        </p>
      </div>

      <div style={{ marginBottom: '32px', width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => onSelectCity('all')}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            border: '2px solid #60a5fa',
            borderRadius: '24px',
            padding: '14px 32px',
            color: '#ffffff',
            fontSize: '1.05rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
            transition: 'transform 0.2s ease',
            width: '100%',
            maxWidth: '500px',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Navigation size={22} className="animate-pulse" />
          내 주변 전체 문화재 탐방 (반경 5km)
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '800px',
        paddingBottom: '40px'
      }}>
        {cities.map((city) => {
          const isHovered = hoveredCityId === city.id;
          const heritageCount = getHeritageCount(city.id);

          return (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              onMouseEnter={() => setHoveredCityId(city.id)}
              onMouseLeave={() => setHoveredCityId(null)}
              style={{
                background: isHovered ? 'linear-gradient(135deg, #fbc2eb, #a18cd1)' : '#ffffff',
                border: isHovered ? '2px solid #a18cd1' : '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '16px 12px',
                color: isHovered ? '#ffffff' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 24px rgba(161, 140, 209, 0.4)' : '0 4px 6px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: 800,
                fontSize: '1.05rem'
              }}>
                <MapPin size={18} color={isHovered ? '#ffffff' : '#94a3b8'} />
                {city.name}
              </div>
              
              {heritageCount > 0 ? (
                <div style={{
                  background: isHovered ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                  color: isHovered ? '#ffffff' : '#6366f1',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Bus size={12} />
                  {heritageCount}개 유산
                </div>
              ) : (
                <div style={{ fontSize: '0.75rem', color: isHovered ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
                  등록 유산 없음
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
