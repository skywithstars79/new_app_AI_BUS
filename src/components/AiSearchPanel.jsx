import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, MapPin, Navigation, RefreshCw } from 'lucide-react';

const RECOMMEND_QUERIES = [
  "조선시대 왕릉을 보고 싶어",
  "아이들과 함께 체험하기 좋은 곳 추천해줘",
  "경치가 좋은 자연 속 문화유산은?",
  "산책하기 좋은 조용한 절이 있을까?",
  "가족과 함께 주말 나들이 갈 만한 곳",
  "사진 찍기 좋은 예쁜 문화유산",
  "교통이 편리한 도심 속 문화재",
  "역사 공부에 도움이 되는 유적지",
  "가을 단풍이 아름다운 문화유산",
  "저녁 야경이 멋진 문화유산",
  "조선시대 임금님과 관련된 장소",
  "독립운동의 역사가 숨쉬는 곳",
  "가장 오래된 선사시대 유적은?"
];

export default function AiSearchPanel({ onClose, onSubmit, onSelectResult, isSearching }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [visibleQueries, setVisibleQueries] = useState([]);

  // 추천 검색어 무작위 5개 섞기
  const shuffleQueries = () => {
    const shuffled = [...RECOMMEND_QUERIES].sort(() => 0.5 - Math.random());
    setVisibleQueries(shuffled.slice(0, 5));
  };

  useEffect(() => {
    shuffleQueries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      const res = await onSubmit(query);
      if (res && res.length > 0) {
        setResults(res);
      } else {
        alert('조건에 맞는 문화유산을 찾지 못했습니다. 다른 조건으로 검색해 보세요!');
      }
    }
  };

  const handleSelect = (heritage) => {
    onSelectResult(heritage);
    onClose(); // 모달 닫고 지도 화면으로 전환
  };

  const handleQueryClick = (q) => {
    setQuery(q);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }} className="animate-fade-in">
      
      <div style={{
        background: '#ffffff',
        width: '90%',
        maxWidth: results ? '900px' : '700px',
        borderRadius: '32px',
        boxShadow: '0 20px 50px rgba(161, 140, 209, 0.3)',
        padding: '40px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '3px solid #fbc2eb',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}>
        
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9ca3af',
          zIndex: 10
        }}>
          <X size={24} />
        </button>

        {!results ? (
          <>
            <div style={{ background: '#fbc2eb', borderRadius: '50%', padding: '16px', marginBottom: '16px' }}>
              <Sparkles size={36} color="#fff" />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#374151', marginBottom: '8px' }}>
              어떤 문화유산을 찾으시나요?
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '1rem', lineHeight: 1.4 }}>
              자연스럽게 말씀해 주시면 AI가 딱 맞는 3곳을 찾아드릴게요!
            </p>

            <form onSubmit={handleSubmit} style={{ width: '100%', position: 'relative', marginBottom: '24px' }}>
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="원하시는 조건을 자유롭게 입력해 보세요!"
                disabled={isSearching}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  paddingRight: '60px',
                  fontSize: '1.1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '24px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: '#f9fafb',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.borderColor = '#a18cd1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                autoFocus
              />
              <button 
                type="submit" 
                disabled={!query.trim() || isSearching}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: query.trim() && !isSearching ? 'pointer' : 'not-allowed',
                  opacity: query.trim() && !isSearching ? 1 : 0.5
                }}
              >
                {isSearching ? <span className="animate-pulse">...</span> : <Search size={20} />}
              </button>
            </form>

            {/* 추천 질문 칩 영역 */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {visibleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQueryClick(q)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    color: '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#1e293b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#475569'; }}
                >
                  {q}
                </button>
              ))}
              
              <button
                onClick={shuffleQueries}
                title="다른 추천 질문 보기"
                style={{
                  background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(166, 193, 238, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(30deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {isSearching && (
              <div style={{ marginTop: '24px', color: '#a18cd1', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} className="animate-spin" />
                AI가 경기도의 수천 개 유산 중 딱 맞는 곳을 찾고 있어요...
              </div>
            )}
          </>
        ) : (
          <div style={{ width: '100%', animation: 'fade-in 0.4s ease-out' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a18cd1', fontWeight: 800, marginBottom: '8px' }}>
              <Sparkles size={20} /> AI 추천 결과
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#374151', marginBottom: '24px' }}>
              조건에 딱 맞는 3곳을 찾았어요!
            </h2>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {results.map((heritage, idx) => (
                <div 
                  key={heritage.id || idx}
                  onClick={() => handleSelect(heritage)}
                  style={{
                    flex: '1 1 250px',
                    maxWidth: '280px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '20px',
                    padding: '20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#fbc2eb'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(251, 194, 235, 0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {heritage.image && (
                    <div style={{ width: '100%', height: '140px', marginBottom: '12px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={heritage.image} alt={heritage.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px', lineHeight: 1.3 }}>
                    {heritage.name}
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: '#e0e7ff', color: '#4f46e5', fontWeight: 600 }}>{heritage.era || '시대 미상'}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: '#fee2e2', color: '#ef4444', fontWeight: 600 }}>{heritage.category || '기타'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
                    <MapPin size={14} /> {heritage.address || '주소 정보 없음'}
                  </div>

                  {/* AI의 간단한 추천 이유 (gemini API가 heritage 객체에 aiReason 등을 넣었을 경우, 없으면 기본 정보) */}
                  <div style={{ background: '#ffffff', borderRadius: '12px', padding: '12px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, border: '1px solid #f1f5f9' }}>
                    {heritage.aiSummary || (heritage.summary ? heritage.summary.slice(0, 80) + '...' : '아름다운 역사적 가치를 지닌 곳입니다.')}
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: '#a18cd1', fontSize: '0.85rem', fontWeight: 700, gap: '4px' }}>
                    탐방하기 <Navigation size={14} />
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setResults(null)}
              style={{
                marginTop: '24px',
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              다시 검색하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
