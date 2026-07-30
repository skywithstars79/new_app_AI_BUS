import React, { useState, useEffect } from 'react';
import { X, Volume2, Bus, MapPin, Sparkles, Compass, ExternalLink } from 'lucide-react';
import { fetchHeritageDetail } from '../services/culturalHeritageService';

export default function HeritagePopupCard({ heritage, onClose, onStartRoute }) {
  const [isPlayingTts, setIsPlayingTts] = useState(false);
  const [detailedAddress, setDetailedAddress] = useState(null);
  const [detailedImage, setDetailedImage] = useState(null);

  useEffect(() => {
    if (heritage && heritage.kdcd && heritage.asno) {
      // 팝업 열릴 때 상세 주소 및 이미지 실시간으로 가져오기
      fetchHeritageDetail(heritage.kdcd, heritage.asno, heritage.ctcd).then(detail => {
        if (detail.address) {
          const addr = detail.address.includes('경기') ? detail.address : `경기도 ${heritage.cityName} ${detail.address}`;
          setDetailedAddress(addr);
        }
        if (detail.imageUrl) {
          setDetailedImage(detail.imageUrl);
        }
      });
    }
  }, [heritage]);

  if (!heritage) return null;

  // 음성 듣기 (TTS)
  const handleTtsRead = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingTts) {
        window.speechSynthesis.cancel();
        setIsPlayingTts(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(heritage.summary);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingTts(false);
      utterance.onerror = () => setIsPlayingTts(false);

      setIsPlayingTts(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('사용하시는 브라우저는 음성 재생을 지원하지 않습니다.');
    }
  };

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        position: 'absolute',
        top: '80px',
        right: '20px',
        width: 'calc(100% - 40px)',
        maxWidth: '380px',
        zIndex: 20,
        overflow: 'hidden',
        border: '1.5px solid rgba(245, 158, 11, 0.5)'
      }}
    >
      {/* Header Image with Gradient Overlay */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img 
          src={detailedImage || heritage.image} 
          alt={heritage.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.95), transparent)'
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            color: '#1e293b',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <X size={18} />
        </button>

        {/* Badges */}
        <div style={{ position: 'absolute', bottom: '10px', left: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className="glass-badge" style={{ background: '#fff', color: '#d97706', borderColor: '#fcd34d' }}>{heritage.era}</span>
          <span className="glass-badge" style={{ background: '#fff', borderColor: '#93c5fd', color: '#2563eb' }}>
            {heritage.cityName}
          </span>
          {heritage.distanceKm && (
            <span className="glass-badge" style={{ background: '#fff', borderColor: '#5eead4', color: '#0d9488' }}>
              내 위치서 {heritage.distanceKm.toFixed(1)}km
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', background: 'rgba(255,255,255,0.95)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e293b', margin: 0 }}>
            {heritage.name}
          </h2>
          <button
            onClick={handleTtsRead}
            style={{
              background: isPlayingTts ? '#fee2e2' : '#fef3c7',
              border: isPlayingTts ? '1px solid #f87171' : '1px solid #fcd34d',
              color: isPlayingTts ? '#ef4444' : '#d97706',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0
            }}
          >
            <Volume2 size={14} /> {isPlayingTts ? '소리 정지' : '음성 읽기'}
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
          <MapPin size={14} color="#f59e0b" /> {detailedAddress || heritage.address}
        </p>

        {/* AI 3-Sentence Summary Box */}
        <div style={{
          background: '#fffbeb',
          borderLeft: '4px solid #f59e0b',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#d97706', fontWeight: 800, marginBottom: '6px' }}>
            <Sparkles size={14} /> AI 초등학생 3문장 핵심 요약
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#334155', fontWeight: 500 }}>
            {heritage.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Route Action Button */}
          <button
            onClick={() => onStartRoute(heritage)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              color: '#ffffff',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Bus size={18} /> AI BUS 실시간 길찾기 시작
          </button>

          {/* External Link Button */}
          <a
            href={`https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaKdcd=${heritage.kdcd}&ccbaAsno=${heritage.asno}&ccbaCtcd=${heritage.ctcd}&pageNo=1_1_0_0`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px',
              color: '#475569',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
          >
            <ExternalLink size={18} color="#64748b" /> 국가문화유산포털 상세 정보 보기
          </a>
        </div>
      </div>
    </div>
  );
}
