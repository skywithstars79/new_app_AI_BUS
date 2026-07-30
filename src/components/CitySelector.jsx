import React from 'react';
import { GYEONGGI_CITIES } from '../services/culturalHeritageService';
import { MapPin, Navigation } from 'lucide-react';

export default function CitySelector({ selectedCityId, onSelectCity }) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        width: '100%',
        justifyContent: 'flex-start',
        overflowX: 'auto',
        padding: '4px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#ea580c', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0, paddingRight: '12px', borderRight: '2px solid rgba(234, 88, 12, 0.2)' }}>
        <MapPin size={20} />
        <span>탐방지 선택</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        {/* 특별 버튼: 내 주변 (5km) */}
        {GYEONGGI_CITIES.filter(c => c.id === 'all').map((city) => {
          const isSelected = selectedCityId === city.id;
          return (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, #10b981, #059669)' 
                  : '#ecfdf5',
                border: isSelected 
                  ? 'none' 
                  : '1.5px solid #a7f3d0',
                color: isSelected ? '#ffffff' : '#047857',
                borderRadius: '20px',
                width: '64px', // 너비 축소
                height: '108px', // 50*2 + 8
                fontSize: '0.75rem', 
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.35)' : '0 2px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.background = '#d1fae5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#ecfdf5';
                }
              }}
            >
              <Navigation size={18} color={isSelected ? '#fff' : '#059669'} />
              <span style={{ textAlign: 'center', lineHeight: 1.2 }}>내 주변<br/>(5km)</span>
            </button>
          );
        })}

        {/* 나머지 지역: 2줄 바둑판(그리드) 배치 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateRows: 'repeat(2, 1fr)', 
          gridAutoFlow: 'column', 
          gap: '8px',
          alignItems: 'center'
        }}>
          {GYEONGGI_CITIES.filter(c => c.id !== 'all').map((city) => {
            const isSelected = selectedCityId === city.id;
            return (
              <button
                key={city.id}
                onClick={() => onSelectCity(city.id)}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                    : '#ffffff',
                  border: isSelected 
                    ? 'none' 
                    : '1.5px solid #e2e8f0',
                  color: isSelected ? '#ffffff' : '#475569',
                  borderRadius: '16px',
                  width: '50px', // 가로 50px 축소
                  height: '50px', // 세로 50px 축소
                  fontSize: '0.7rem', // 폰트 축소
                  fontWeight: isSelected ? 800 : 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxShadow: isSelected ? '0 4px 10px rgba(245, 158, 11, 0.35)' : '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }
                }}
              >
                <MapPin size={14} color={isSelected ? '#fff' : '#94a3b8'} />
                <span>{city.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
