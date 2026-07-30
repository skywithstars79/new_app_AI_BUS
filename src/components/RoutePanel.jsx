import React from 'react';
import { X, Bus, Footprints, Clock, Flame, Car } from 'lucide-react';
import { getRouteInformation } from '../services/busRouteService';

export default function RoutePanel({ heritage, userLocation, onClose }) {
  const routeData = heritage ? getRouteInformation(userLocation.lat, userLocation.lng, heritage) : null;
  const isWalking = routeData ? routeData.isWalking : false;

  if (!heritage || !routeData) return null;

  return (
    <div
      className="glass-panel animate-slide-up"
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: '680px',
        margin: '0 auto',
        zIndex: 25,
        padding: '18px 20px',
        border: '1.5px solid #f59e0b',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.5)'
      }}
    >
      {/* Panel Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span 
            style={{
              background: isWalking ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isWalking ? <Footprints size={16} /> : <Bus size={16} />}
            {isWalking ? '도보 2km 이내 추천' : '카카오 길찾기 안내'}
          </span>
          <span style={{ fontSize: '0.85rem', color: '#475569' }}>
            직선 거리: <strong style={{ color: '#1e293b' }}>{routeData.distanceKm}km</strong>
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(51, 65, 85, 0.6)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Content Info */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        
        {/* Destination Title */}
        <div style={{ flex: '1 1 200px' }}>
          <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>목적지</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: '2px 0 4px 0' }}>
            {heritage.name}
          </h3>
          <p style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500, marginBottom: '8px' }}>
            {routeData.recommendationText}
          </p>
        </div>

        {/* Dynamic Route Panel Details */}
        <div style={{ flex: '1 1 300px', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {isWalking ? (
            /* WALKING MODE */
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="#10b981" /> 예상 소요 시간
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
                  약 {routeData.walkMinutes}분
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Flame size={14} color="#f43f5e" /> 운동 소비 칼로리
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fb7185' }}>
                  약 {routeData.calories} kcal
                </div>
              </div>
            </div>
          ) : (
            /* TRANSPORT MODE */
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <a 
                href={routeData.kakaoMapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#fcd34d', color: '#92400e', textDecoration: 'none', padding: '10px',
                  borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem'
                }}
              >
                <Bus size={18} /> 카카오맵 대중교통 길찾기
              </a>
              <a 
                href={routeData.kakaoNaviUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#38bdf8', color: '#0369a1', textDecoration: 'none', padding: '10px',
                  borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem'
                }}
              >
                <Car size={18} /> 카카오내비 자동차 길찾기
              </a>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
