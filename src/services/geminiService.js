/**
 * Google Gemini API를 활용한 자연어 검색 의도 파악 및 초등학생 맞춤 3문장 요약 카드 서비스
 */

export async function processNaturalLanguageSearch(query, heritageList) {
  if (!query || query.trim() === '') return heritageList;
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  // Gemini API Key가 입력되었을 경우 실제 API 호출
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const promptText = `
다음은 학생들이 검색한 질문입니다: "${query}"
아래 문화유산 목록 중 질문의 의도(시대, 유형, 특징, 걸어갈 거리 등)에 가장 적합한 문화유산의 ID 목록을 JSON 배열로만 응답해주세요.
예시: ["h1", "h2"]

문화유산 목록:
${JSON.stringify(heritageList.map(h => ({ id: h.id, name: h.name, era: h.era, tags: h.tags, distanceKm: h.distanceKm.toFixed(1) })))}
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      const jsonMatch = responseText.match(/\[.*\]/s);
      if (jsonMatch) {
        const matchedIds = JSON.parse(jsonMatch[0]);
        const filtered = heritageList.filter(h => matchedIds.includes(h.id));
        if (filtered.length > 0) return filtered;
      }
    } catch (err) {
      console.warn('Gemini API Fetch failed, fallback to local NLP rule:', err);
    }
  }

  // Fallback 스마트 로컬 자연어 필터링
  const q = query.toLowerCase();
  const keywords = q.split(/\s+/).filter(w => w.length > 1); // 2글자 이상 단어 추출

  let results = heritageList.filter(h => {
    const tagsStr = h.tags ? h.tags.join(' ') : '';
    const textToMatch = `${h.name} ${h.era} ${h.category} ${h.summary} ${tagsStr}`.toLowerCase();
    
    // 1. 키워드 매칭
    const hasKeyword = keywords.some(kw => textToMatch.includes(kw));

    // 2. 특정 테마 룰 기반 매칭
    let hasRule = false;
    if (q.includes('조선') && textToMatch.includes('조선')) hasRule = true;
    if (q.includes('삼국') && textToMatch.includes('삼국')) hasRule = true;
    if (q.includes('선사') && textToMatch.includes('선사')) hasRule = true;
    if ((q.includes('성') || q.includes('성곽')) && textToMatch.includes('성')) hasRule = true;
    if ((q.includes('능') || q.includes('무덤')) && textToMatch.includes('왕릉')) hasRule = true;
    if ((q.includes('절') || q.includes('사찰')) && textToMatch.includes('사찰')) hasRule = true;

    if (q.includes('산') && (textToMatch.includes('산') || textToMatch.includes('봉수') || textToMatch.includes('산성'))) hasRule = true;
    if ((q.includes('아이') || q.includes('체험') || q.includes('가족')) && (textToMatch.includes('박물관') || textToMatch.includes('체험') || textToMatch.includes('학교') || textToMatch.includes('공원'))) hasRule = true;

    // 3. 도보/거리 조건
    let isDistanceOk = true;
    if (q.includes('걸어가') || q.includes('도보') || q.includes('가까운')) {
      if (h.distanceKm > 2.5) isDistanceOk = false;
    }

    return (hasKeyword || hasRule) && isDistanceOk;
  });

  // 검색 결과가 부족하면 무작위로 섞어서 추천 (매번 똑같은 것 방지)
  if (results.length < 3) {
    let sourceList = heritageList;
    
    // 만약 현재 지역/반경에 문화재가 아예 없으면 전체 데이터를 동적으로 불러옴
    if (sourceList.length === 0) {
      try {
        const { FULL_HERITAGE_DATA, BASE_HERITAGE_DATA } = await import('./culturalHeritageService.js');
        sourceList = FULL_HERITAGE_DATA.length > 0 ? FULL_HERITAGE_DATA : BASE_HERITAGE_DATA;
      } catch (e) {
        console.warn('Failed to load global heritage data for fallback');
      }
    }

    if (sourceList.length > 0) {
      // 섞을 때 결과를 덮어쓰기 위해 중복 제거
      const shuffled = [...sourceList].sort(() => 0.5 - Math.random());
      results = shuffled.slice(0, 3);
    }
  } else {
    // 결과가 3개 이상이면 무작위 3개 추출 (또는 상위 3개)
    const shuffledResults = [...results].sort(() => 0.5 - Math.random());
    results = shuffledResults.slice(0, 3);
  }

  // 동적 모듈 임포트: culturalHeritageService에서 상세 이미지 및 주소 가져오기
  try {
    const { fetchHeritageDetail } = await import('./culturalHeritageService.js');
    await Promise.all(results.map(async (h) => {
      // kdcd, asno, ctcd가 있을 때만 상세 호출
      if (h.kdcd && h.asno && h.ctcd) {
        const detail = await fetchHeritageDetail(h.kdcd, h.asno, h.ctcd);
        if (detail.imageUrl) {
          h.image = detail.imageUrl;
        }
        if (detail.address) {
          // 상세 주소가 파주시 등으로 시작하지 않으면 합쳐주거나 교체
          h.address = detail.address.includes('경기') ? detail.address : `경기도 ${h.cityName} ${detail.address}`;
        }
      }
    }));
  } catch (err) {
    console.warn('Failed to load detail images in NLP service', err);
  }

  return results;
}

/**
 * 초등학생 눈높이에 맞춘 3문장 요약 및 흥미 요소 생성
 */
export async function generateElementarySummary(heritage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const promptText = `
문화유산 이름: ${heritage.name}
설명: ${heritage.summary}

위 문화유산에 대해 초등학생이 읽었을 때 이해하기 쉽고 재미있도록 '정확히 3문장 이내'로 이모지와 함께 요약해 주세요.
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text.trim();
    } catch (e) {
      console.warn('Gemini Summary failed, using fallback summary');
    }
  }

  // Fallback 3문장 초등학생 요약
  return heritage.summary;
}
