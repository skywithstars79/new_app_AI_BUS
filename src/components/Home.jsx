import React, { useState } from 'react';
import { Sparkles, Map, Bus, Search } from 'lucide-react';
import AiSearchPanel from './AiSearchPanel';

export default function Home({ onSelectAiSearch, onSelectRegionSearch, onSelectAiResult, isAiSearching }) {
  const [showAiPanel, setShowAiPanel] = useState(false);

  const handleAiSearchSubmit = async (query) => {
    return await onSelectAiSearch(query);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', // 파스텔톤 배경 기본
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflowY: 'auto', // 세로 스크롤 허용하여 어떤 기기에서도 잘림 방지
      padding: '20px 0' // 위아래 최소 여백
    }}>
      {/* 부드러운 장식용 파스텔 덩어리들 */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: '#fce4ec', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: '#e3f2fd', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '250px', height: '250px', background: '#fff9c4', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.7 }} />

      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px', width: '100%', maxWidth: '800px' }} className="animate-fade-in">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fff',
          border: '1px solid #ffb7b2',
          padding: '6px 18px',
          borderRadius: '30px',
          color: '#ff8a80',
          fontSize: '0.95rem',
          fontWeight: 800,
          marginBottom: '16px',
          boxShadow: '0 4px 10px rgba(255, 138, 128, 0.2)'
        }}>
          <Sparkles size={16} /> 신나는 경기도 문화유산 AI 탐방 버스
        </div>

        {/* 사용자 커스텀 로고 큼지막하게 추가 (세로 높이 제한으로 다이어트) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '12px' }} className="animate-fade-in">
          <img 
            src="/user_custom_logo.png" 
            alt="AI 문화재 탐방버스 로고" 
            style={{ 
              width: '100%',
              maxWidth: '800px', // 가로는 넓게 유지
              maxHeight: '220px', // 세로 폭발 방지 (350px -> 220px 대폭 축소)
              objectFit: 'contain',
              mixBlendMode: 'multiply', // 다시 multiply로
              filter: 'contrast(1.1) brightness(1.05)' // 이미지 자체의 칙칙한 하얀 노이즈를 완전 흰색으로 만들어 투명화가 100% 되도록 강제함
            }} 
          />
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#374151', marginBottom: '12px', letterSpacing: '-0.5px' }}>
          어떤 방식으로 여행을 떠나볼까요?
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#6b7280', marginBottom: '24px', fontWeight: 500 }}>
          원하는 취향대로 AI에게 물어보거나, 지도에서 직접 동네를 골라 탐험해 보세요!
        </p>

        <div style={{ display: 'flex', gap: '24px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* AI 모드 버튼 */}
          <button
            onClick={() => setShowAiPanel(true)}
            style={{
              flex: '1 1 300px',
              maxWidth: '380px',
              background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
              border: 'none',
              borderRadius: '24px',
              padding: '24px 20px', // 거대한 패딩(40px) 깎기
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 15px 35px rgba(161, 140, 209, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(161, 140, 209, 0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(161, 140, 209, 0.4)'; }}
          >
            {/* 호랑이 마스코트는 사용자 요청으로 삭제됨 */}
            
            <div style={{ background: 'rgba(255,255,255,0.25)', padding: '16px', borderRadius: '50%', zIndex: 2 }}>
              <Search size={36} color="#fff" />
            </div>
            <div style={{ zIndex: 2 }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>AI의 도움을 받아 탐방하기</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.4 }}>
                "가을에 걷기 좋은 사찰 추천해줘"<br/>원하는 조건을 말하면 AI가 맞춤 추천해드려요!
              </div>
            </div>
          </button>

          {/* 지역별 모드 버튼 */}
          <button
            onClick={onSelectRegionSearch}
            style={{
              flex: '1 1 300px',
              maxWidth: '380px',
              background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
              border: 'none',
              borderRadius: '24px',
              padding: '24px 20px', // 거대한 패딩(32px) 깎기
              color: '#1e293b',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 15px 35px rgba(132, 250, 176, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(132, 250, 176, 0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(132, 250, 176, 0.4)'; }}
          >
            <div style={{ background: 'rgba(255,255,255,0.35)', padding: '16px', borderRadius: '50%' }}>
              <Map size={36} color="#0f172a" />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>지역별 문화유산 탐방하기</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.4 }}>
                경기도의 31개 시·군을 한눈에 보고<br/>원하는 동네를 직접 선택해서 탐험해 보세요!
              </div>
            </div>
          </button>
        </div>
      </div>

      {showAiPanel && (
        <AiSearchPanel 
          onClose={() => setShowAiPanel(false)} 
          onSubmit={handleAiSearchSubmit} 
          onSelectResult={onSelectAiResult}
          isSearching={isAiSearching} 
        />
      )}
    </div>
  );
}
