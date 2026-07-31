/**
 * Google Gemini API를 활용한 자연어 검색 의도 파악 및 초등학생 맞춤 3문장 요약 카드 서비스
 */

export async function processNaturalLanguageSearch(query, heritageList) {
  if (!query || query.trim() === '') return heritageList;
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  let results = [];

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
        results = heritageList.filter(h => matchedIds.includes(h.id));
      }
    } catch (err) {
      console.warn('Gemini API Fetch failed, fallback to local NLP rule:', err);
    }
  }

  // Gemini가 결과를 못 찾았거나 실패한 경우 Fallback 스마트 로컬 자연어 필터링
  if (results.length === 0) {
    const q = query.toLowerCase();
    const keywords = q.split(/\s+/).filter(w => w.length > 1); // 2글자 이상 단어 추출

    const scoredList = heritageList.map(h => {
      const tagsStr = h.tags ? h.tags.join(' ') : '';
      const textToMatch = `${h.name} ${h.era} ${h.category} ${h.summary} ${tagsStr}`.toLowerCase();
      
      let score = 0;
      
      // 1. 키워드 매칭 (많이 일치할수록 높은 점수)
      keywords.forEach(kw => {
        if (textToMatch.includes(kw)) score += 1;
      });

      // 2. 특정 테마 룰 기반 매칭 (가중치 부여)
      if (q.includes('조선') && textToMatch.includes('조선')) score += 1;
      if (q.includes('고려') && textToMatch.includes('고려')) score += 1;
      if (q.includes('삼국') && textToMatch.includes('삼국')) score += 1;
      
      // 선사시대/공룡/화석/고인돌 테마 확장
      if ((q.includes('선사') || q.includes('오래된') || q.includes('구석기') || q.includes('신석기') || q.includes('청동기') || q.includes('공룡')) && (textToMatch.includes('선사') || textToMatch.includes('구석기') || textToMatch.includes('신석기') || textToMatch.includes('청동기') || textToMatch.includes('고인돌') || textToMatch.includes('화석') || textToMatch.includes('공룡') || textToMatch.includes('주먹도끼'))) score += 3;
      
      if ((q.includes('성') || q.includes('성곽')) && textToMatch.includes('성')) score += 2;
      if ((q.includes('능') || q.includes('무덤') || q.includes('묘')) && (textToMatch.includes('왕릉') || textToMatch.includes('묘') || textToMatch.includes('릉'))) score += 3;
      if ((q.includes('절') || q.includes('사찰') || q.includes('불교') || q.includes('사지')) && (textToMatch.includes('사찰') || textToMatch.includes('사지') || textToMatch.includes('암'))) score += 2;
      if (q.includes('탑') && textToMatch.includes('탑')) score += 2;
      
      // 독립운동 및 근대사 테마 추가
      if ((q.includes('독립') || q.includes('항일') || q.includes('광복') || q.includes('만세') || q.includes('3.1')) && (textToMatch.includes('독립') || textToMatch.includes('항일') || textToMatch.includes('광복') || textToMatch.includes('순국') || textToMatch.includes('의병') || textToMatch.includes('의사'))) score += 3;
      
      // '산책'이라는 단어가 '산'으로 오인되는 것을 방지
      if ((q.includes('산') || q.includes('등산')) && !q.includes('산책') && (textToMatch.includes('산') || textToMatch.includes('봉수') || textToMatch.includes('산성'))) score += 1;
      
      // 자연/경치/풍경 테마 추가
      if ((q.includes('자연') || q.includes('경치') || q.includes('풍경') || q.includes('힐링')) && (textToMatch.includes('산') || textToMatch.includes('바다') || textToMatch.includes('강') || textToMatch.includes('나무') || textToMatch.includes('숲') || textToMatch.includes('계곡') || textToMatch.includes('자연') || textToMatch.includes('경치') || textToMatch.includes('명승') || textToMatch.includes('천연기념물'))) score += 3;

      // 아이/가족/체험/나들이 테마 확장
      if ((q.includes('아이') || q.includes('체험') || q.includes('가족') || q.includes('나들이')) && (textToMatch.includes('박물관') || textToMatch.includes('체험') || textToMatch.includes('학교') || textToMatch.includes('공원') || textToMatch.includes('수장고') || textToMatch.includes('전시관') || textToMatch.includes('관람') || textToMatch.includes('산책') || textToMatch.includes('자연') || textToMatch.includes('교육'))) score += 3;

      // 3. 도보/거리 조건
      if (q.includes('걸어가') || q.includes('도보') || q.includes('가까운')) {
        if (h.distanceKm <= 2.5) score += 2;
        else score -= 10;
      }

      // 동점자(score가 같은 항목) 발생 시 매번 똑같은 항목만 추천되는 것을 막기 위해 미세한 랜덤 소수점(Jitter) 추가
      if (score > 0) {
        score += Math.random() * 0.1;
      }

      return { ...h, matchScore: score };
    });

    // 1점 이상(0점 초과)인 항목들만 점수 내림차순으로 정렬
    results = scoredList.filter(h => h.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);
  }

  // 단순 불용어 매칭(1~2점)을 걸러내고, 의미 있는 매칭(3점 이상)이거나 Gemini API가 찾은 결과(score 없음)만 진짜 매칭으로 인정
  const meaningfulResults = results.filter(h => h.matchScore === undefined || h.matchScore >= 3);
  const exactMatchCount = Math.min(meaningfulResults.length, 3);
  results = results.slice(0, 3);

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
      const existingIds = new Set(results.map(r => r.id));
      const remainingList = sourceList.filter(h => !existingIds.has(h.id));
      
      // Fisher-Yates 셔플 알고리즘으로 무작위성 완벽 보장 (기존의 sort 기반 셔플은 편향이 발생함)
      for (let i = remainingList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingList[i], remainingList[j]] = [remainingList[j], remainingList[i]];
      }
      
      results = [...results, ...remainingList.slice(0, 3 - results.length)];
    }
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

  results.exactMatchCount = exactMatchCount;
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
