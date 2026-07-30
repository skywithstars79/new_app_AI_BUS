import React from 'react';
import { Bus, Key, Home, Sparkles } from 'lucide-react';
import CitySelector from './CitySelector';

export default function Header({ onSearch, onOpenApiKeyModal, isAiSearching, onGoHome, onOpenAiPanel, selectedCityId, onSelectCity, is500Loaded }) {
  return (
    <header className="glass-panel" style={{
      margin: '12px 20px 8px 20px',
      padding: '10px 16px', // 패딩 축소하여 공간 낭비 방지
      zIndex: 10,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      borderRadius: '28px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'stretch',
      gap: '20px'
    }}>

      {/* 1. LEFT COLUMN: Brand (User Custom Logo Only) */}
      <div style={{ flex: '0 0 320px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>
        <img 
          src="/user_custom_logo.png" 
          alt="AI 문화재 탐방버스" 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply', // 흰색 배경 투명화
            transform: 'scale(1.25)', // 상하좌우 여백을 뚫고 큼지막하게 렌더링
            transformOrigin: 'center center'
          }} 
        />
      </div>

      {/* 2. CENTER COLUMN: City Selector (여백을 활용하는 필터) */}
      <div style={{
        flex: 1,
        background: 'rgba(241, 245, 249, 0.6)', // 은은한 회색 배경으로 영역 분리
        borderRadius: '20px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <CitySelector
          selectedCityId={selectedCityId}
          onSelectCity={onSelectCity}
        />
      </div>

      {/* 3. RIGHT COLUMN: Main AI Action & Home Button (가로 배치로 수직 공간 극대화) */}
      <div style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'stretch' }}>
        
        {/* Home Button */}
        <button
          onClick={onGoHome}
          title="첫 화면으로 돌아가기"
          style={{
            flex: '0 0 64px', // 아이콘 사이즈 증가에 비례하여 버튼 폭 고정 (정사각형 비율)
            background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', 
            border: 'none',
            color: '#ffffff',
            borderRadius: '20px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
            // whiteSpace: 'nowrap' 삭제됨
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(249, 115, 22, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(249, 115, 22, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)';
          }}
        >
          <Home size={32} strokeWidth={2.5} />
        </button>

        {/* AI Action Button (가로 폭 최적화) */}
        <button
          className="animate-pulse-slow"
          onClick={onOpenAiPanel}
          style={{
            flex: 1, 
            background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)', 
            border: 'none',
            borderRadius: '20px',
            color: '#ffffff',
            fontSize: '1.05rem', 
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px', 
            boxShadow: '0 10px 25px rgba(244, 63, 94, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            textShadow: '0 2px 4px rgba(0,0,0,0.15)'
            // whiteSpace: 'nowrap' 삭제됨
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(244, 63, 94, 0.45), inset 0 2px 4px rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)';
          }}
        >
          <span style={{ textAlign: 'center', lineHeight: 1.15, fontSize: '1.7rem' }}>AI의 도움을 받아<br/>탐방하기</span>
        </button>
      </div>

    </header>
  );
}
