import React, { useState } from 'react';
import { X, Key, Check, Info, Map, Sparkles } from 'lucide-react';

export default function ApiKeyModal({ 
  isOpen, 
  onClose, 
  geminiApiKey, setGeminiApiKey,
  kakaoApiKey, setKakaoApiKey
}) {
  const [tempGeminiKey, setTempGeminiKey] = useState(geminiApiKey || '');
  const [tempKakaoKey, setTempKakaoKey] = useState(kakaoApiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setGeminiApiKey(tempGeminiKey);
    setKakaoApiKey(tempKakaoKey);

    localStorage.setItem('GEMINI_API_KEY', tempGeminiKey);
    localStorage.setItem('KAKAO_API_KEY', tempKakaoKey);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '24px',
          border: '1.5px solid var(--primary-yellow)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '1.15rem', fontWeight: 800 }}>
            <Key size={22} /> API 키 설정
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          
          {/* 1. Google Gemini API Key */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              <Sparkles size={16} color="#f59e0b" /> Google Gemini API Key (자연어 AI 및 3문장)
            </label>
            <input
              type="password"
              value={tempGeminiKey}
              onChange={(e) => setTempGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* 2. Kakao Map JavaScript API Key */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              <Map size={16} color="#3b82f6" /> 카카오맵 / 모빌리티 API Key (선택)
            </label>
            <input
              type="password"
              value={tempKakaoKey}
              onChange={(e) => setTempKakaoKey(e.target.value)}
              placeholder="카카오 디벨로퍼스 JavaScript 키"
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '20px',
            fontSize: '0.78rem',
            color: '#93c5fd',
            lineHeight: '1.45'
          }}>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <Info size={14} /> 키 미입력 시 안내
            </div>
            국가문화유산 API는 키 등록 없이도 오픈 연동되며, API 키를 입력하지 않아도 내장 고성능 데이터로 모든 기능이 작동합니다.
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: isSaved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {isSaved ? <><Check size={18} /> 저장 완료!</> : '설정 저장하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
