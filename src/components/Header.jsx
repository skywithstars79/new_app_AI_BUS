import React from 'react';
import { Bus, Key, Home, Sparkles } from 'lucide-react';
import CitySelector from './CitySelector';

export default function Header({ onSearch, onOpenApiKeyModal, isAiSearching, onGoHome, onOpenAiPanel, selectedCityId, onSelectCity, is500Loaded }) {
  return (
    <header className="glass-panel" style={{
      margin: '8px 12px 4px 12px', // 여백 최소화
      padding: '8px 12px', // 패딩 최소화
      zIndex: 10,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'stretch',
      flexWrap: 'wrap', 
      gap: '8px' // 16px에서 8px로 간격 대폭 축소
    }}>

      {/* 1. LEFT COLUMN: Brand (HTML 텍스트 로고 원복) */}
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(234, 88, 12, 0.25)',
          flexShrink: 0
        }}>
          <Bus size={24} color="#ffffff" strokeWidth={2.5} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ 
            fontSize: '1.2rem', // 모바일을 위해 크기 축소
            fontWeight: 900, 
            color: '#1e293b', 
            margin: 0, 
            letterSpacing: '-0.5px'
          }}>
            AI 문화재 탐방버스
          </h1>
        </div>
      </div>

      {/* 2. CENTER COLUMN: City Selector (가변 너비, 가로 스크롤 허용) */}
      <div style={{
        flex: '1 1 auto', // 남는 가로 공간을 100% 흡수하여 PC에서 스크롤 없이 다 보이게 함
        minWidth: 0, // Flex 자식 요소가 부모 너비를 넘어가는 버그 방지
        overflow: 'hidden', // 스크롤바가 부모를 뚫지 못하게 컷팅
        background: 'rgba(241, 245, 249, 0.6)', 
        borderRadius: '20px',
        padding: '4px', // 모바일 공간 절약을 위해 패딩 극한 축소
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <CitySelector
          selectedCityId={selectedCityId}
          onSelectCity={onSelectCity}
        />
      </div>

      {/* 3. RIGHT COLUMN: Main AI Action & Home Button (폭 대폭 축소) */}
      <div style={{ flex: '0 0 140px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'stretch' }}>
        
        {/* Home Button (축소) */}
        <button
          onClick={onGoHome}
          title="첫 화면으로 돌아가기"
          style={{
            flex: '0 0 48px', // 폭 대폭 축소
            background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', 
            border: 'none',
            color: '#ffffff',
            borderRadius: '16px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 4px 8px rgba(249, 115, 22, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(249, 115, 22, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(249, 115, 22, 0.2)';
          }}
        >
          <Home size={22} strokeWidth={2.5} />
        </button>

        {/* AI Action Button (폰트 및 여백 축소) */}
        <button
          className="animate-pulse-slow"
          onClick={onOpenAiPanel}
          style={{
            flex: 1, 
            background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)', 
            border: 'none',
            borderRadius: '16px',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px', 
            padding: '8px 12px',
            boxShadow: '0 8px 20px rgba(244, 63, 94, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(244, 63, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(244, 63, 94, 0.3)';
          }}
        >
          <span style={{ textAlign: 'center', lineHeight: 1.2, fontSize: '0.9rem', fontWeight: 800 }}>AI 탐방</span>
        </button>
      </div>

    </header>
  );
}
