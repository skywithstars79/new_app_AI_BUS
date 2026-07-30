// 경기도 31개 시/군 정보 및 좌표
export const GYEONGGI_CITIES = [
  { id: 'all', name: '내 주변 전체 (5km)', lat: 37.2636, lng: 127.0286, isDefault: true },
  { id: 'gapyeong', name: '가평군', lat: 37.8315, lng: 127.5095 },
  { id: 'goyang', name: '고양시', lat: 37.6584, lng: 126.8320 },
  { id: 'gwacheon', name: '과천시', lat: 37.4292, lng: 126.9877 },
  { id: 'gwangmyeong', name: '광명시', lat: 37.4786, lng: 126.8647 },
  { id: 'gwangju', name: '광주시', lat: 37.4087, lng: 127.2583 },
  { id: 'guri', name: '구리시', lat: 37.5943, lng: 127.1296 },
  { id: 'gunpo', name: '군포시', lat: 37.3614, lng: 126.9352 },
  { id: 'gimpo', name: '김포시', lat: 37.6153, lng: 126.7156 },
  { id: 'namyangju', name: '남양주시', lat: 37.6360, lng: 127.2165 },
  { id: 'dongducheon', name: '동두천시', lat: 37.9036, lng: 127.0607 },
  { id: 'bucheon', name: '부천시', lat: 37.5034, lng: 126.7660 },
  { id: 'seongnam', name: '성남시', lat: 37.4200, lng: 127.1265 },
  { id: 'suwon', name: '수원시', lat: 37.2636, lng: 127.0286 },
  { id: 'siheung', name: '시흥시', lat: 37.3802, lng: 126.8029 },
  { id: 'ansan', name: '안산시', lat: 37.3219, lng: 126.8309 },
  { id: 'anseong', name: '안성시', lat: 37.0080, lng: 127.2797 },
  { id: 'anyang', name: '안양시', lat: 37.3943, lng: 126.9568 },
  { id: 'yangju', name: '양주시', lat: 37.7853, lng: 127.0458 },
  { id: 'yangpyeong', name: '양평군', lat: 37.4917, lng: 127.4875 },
  { id: 'yeoju', name: '여주시', lat: 37.2983, lng: 127.6370 },
  { id: 'yeoncheon', name: '연천군', lat: 38.0964, lng: 127.0750 },
  { id: 'osan', name: '오산시', lat: 37.1498, lng: 127.0772 },
  { id: 'yongin', name: '용인시', lat: 37.2410, lng: 127.1775 },
  { id: 'uiwang', name: '의왕시', lat: 37.3448, lng: 126.9682 },
  { id: 'uijeongbu', name: '의정부시', lat: 37.7381, lng: 127.0337 },
  { id: 'icheon', name: '이천시', lat: 37.2723, lng: 127.4432 },
  { id: 'paju', name: '파주시', lat: 37.7600, lng: 126.7800 },
  { id: 'pyeongtaek', name: '평택시', lat: 36.9921, lng: 127.0851 },
  { id: 'pocheon', name: '포천시', lat: 37.8949, lng: 127.2003 },
  { id: 'hanam', name: '하남시', lat: 37.5393, lng: 127.2148 },
  { id: 'hwaseong', name: '화성시', lat: 37.1995, lng: 126.8313 }
];

// 시/군 매칭 헬퍼 함수
export function matchCityId(cityNameStr) {
  if (!cityNameStr) return 'suwon';
  if (cityNameStr.includes('수원')) return 'suwon';
  if (cityNameStr.includes('용인')) return 'yongin';
  if (cityNameStr.includes('고양')) return 'goyang';
  if (cityNameStr.includes('성남')) return 'seongnam';
  if (cityNameStr.includes('화성')) return 'hwaseong';
  if (cityNameStr.includes('부천')) return 'bucheon';
  if (cityNameStr.includes('남양주')) return 'namyangju';
  if (cityNameStr.includes('안산')) return 'ansan';
  if (cityNameStr.includes('평택')) return 'pyeongtaek';
  if (cityNameStr.includes('안양')) return 'anyang';
  if (cityNameStr.includes('시흥')) return 'siheung';
  if (cityNameStr.includes('파주')) return 'paju';
  if (cityNameStr.includes('김포')) return 'gimpo';
  if (cityNameStr.includes('의정부')) return 'uijeongbu';
  if (cityNameStr.includes('광주')) return 'gwangju';
  if (cityNameStr.includes('하남')) return 'hanam';
  if (cityNameStr.includes('양주')) return 'yangju';
  if (cityNameStr.includes('광명')) return 'gwangmyeong';
  if (cityNameStr.includes('군포')) return 'gunpo';
  if (cityNameStr.includes('과천')) return 'gwacheon';
  if (cityNameStr.includes('가평')) return 'gapyeong';
  if (cityNameStr.includes('양평')) return 'yangpyeong';
  if (cityNameStr.includes('여주')) return 'yeoju';
  if (cityNameStr.includes('연천')) return 'yeoncheon';
  if (cityNameStr.includes('동두천')) return 'dongducheon';
  if (cityNameStr.includes('포천')) return 'pocheon';
  if (cityNameStr.includes('오산')) return 'osan';
  if (cityNameStr.includes('이천')) return 'icheon';
  if (cityNameStr.includes('안성')) return 'anseong';
  if (cityNameStr.includes('의왕')) return 'uiwang';
  if (cityNameStr.includes('구리')) return 'guri';
  return 'suwon';
}

// 50개 기본 추천 내장 데이터셋
export const BASE_HERITAGE_DATA = [
  {
    id: 'h1',
    name: '수원 화성 (팔달문 & 화서문)',
    cityId: 'suwon',
    cityName: '수원시',
    era: '조선시대',
    category: '사적 / 유네스코 세계유산',
    lat: 37.2856,
    lng: 127.0142,
    address: '경기도 수원시 팔달구 정조로 825',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
    summary: '정조대왕이 효심을 담아 지은 세계적인 성곽 유적지입니다.',
    tags: ['조선시대', '성곽', '유네스코']
  },
  {
    id: 'h2',
    name: '수원 화성행궁',
    cityId: 'suwon',
    cityName: '수원시',
    era: '조선시대',
    category: '사적',
    lat: 37.2837,
    lng: 127.0135,
    address: '경기도 수원시 팔달구 신풍로 23',
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80',
    summary: '임금님이 쉬어가시던 우리나라에서 가장 크고 아름다운 행궁이에요.',
    tags: ['조선시대', '궁궐', '체험']
  },
  {
    id: 'h3',
    name: '화성 융건릉 (융릉과 건릉)',
    cityId: 'hwaseong',
    cityName: '화성시',
    era: '조선시대',
    category: '사적 / 유네스코 세계유산',
    lat: 37.2081,
    lng: 126.9822,
    address: '경기도 화성시 효행로 481',
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    summary: '사도세자와 정조대왕이 잠드신 소나무 숲속 아름다운 왕릉입니다.',
    tags: ['조선시대', '왕릉', '유네스코']
  },
  {
    id: 'h5',
    name: '남한산성',
    cityId: 'seongnam',
    cityName: '성남시',
    era: '조선시대/삼국시대',
    category: '사적 / 유네스코 세계유산',
    lat: 37.4789,
    lng: 127.1834,
    address: '경기도 성남시 수정구 산성대로 1024',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=800&q=80',
    summary: '삼국시대부터 나라를 지켜온 수려한 자연 경관의 세계유산 산성입니다.',
    tags: ['삼국시대', '산성', '유네스코']
  },
  {
    id: 'h6',
    name: '행주산성',
    cityId: 'goyang',
    cityName: '고양시',
    era: '조선시대',
    category: '사적',
    lat: 37.5954,
    lng: 126.8182,
    address: '경기도 고양시 덕양구 행주로15번길 89',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    summary: '권율 장군과 백성들이 하나 되어 임진왜란을 승리로 이끈 승전 유적지입니다.',
    tags: ['조선시대', '임진왜란', '산성']
  },
  {
    id: 'h9',
    name: '남양주 다산유적지 (정약용 생가)',
    cityId: 'namyangju',
    cityName: '남양주시',
    era: '조선시대',
    category: '기념물',
    lat: 37.5255,
    lng: 127.3168,
    address: '경기도 남양주시 조안면 다산로747번길 11',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    summary: '실학자 정약용 선생님의 학문과 삶의 지혜가 고스란히 살아 숨 쉬는 한강변 마을이에요.',
    tags: ['조선시대', '정약용', '실학']
  },
  {
    id: 'h10',
    name: '여주 영릉 (세종대왕陵)',
    cityId: 'yeoju',
    cityName: '여주시',
    era: '조선시대',
    category: '사적 / 유네스코 세계유산',
    lat: 37.3188,
    lng: 127.6042,
    address: '경기도 여주시 세종대왕면 영릉로 269',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    summary: '훈민정음을 창제하신 세종대왕님이 잠드신 성스러운 유적지예요.',
    tags: ['조선시대', '세종대왕', '한글']
  },
  {
    id: 'h11',
    name: '연천 전곡리 구석기 유적',
    cityId: 'yeoncheon',
    cityName: '연천군',
    era: '선사시대',
    category: '사적',
    lat: 38.0645,
    lng: 127.0583,
    address: '경기도 연천군 전곡읍 양연로 1510',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    summary: '동아시아 최초 아슐리안 주먹도끼가 발굴된 구석기 시대 유적 장소예요.',
    tags: ['선사시대', '주먹도끼', '구석기']
  },
  {
    id: 'natural_1',
    name: '양평 용문사 은행나무 (천연기념물)',
    cityId: 'yangpyeong',
    cityName: '양평군',
    era: '신라시대',
    category: '천연기념물',
    lat: 37.5023,
    lng: 127.5812,
    address: '경기도 양평군 용문면 용문산로 656',
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    summary: '수령 1,100년이 넘는 동양 최대 높이 42m의 신비로운 천연기념물 은행나무예요!',
    tags: ['천연기념물', '은행나무', '용문사']
  },
  {
    id: 'intangible_1',
    name: '안성 남사당놀이 (국가무형문화재)',
    cityId: 'anseong',
    cityName: '안성시',
    era: '조선시대 ~ 현대',
    category: '국가무형문화재 / 유네스코 인류무형문화유산',
    lat: 37.0125,
    lng: 127.2912,
    address: '경기도 안성시 보개면 남사당바우덕이로 82',
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80',
    summary: '줄타기, 버나 돌리기, 풍물놀이가 신나게 어우러진 유네스코 무형문화유산이에요!',
    tags: ['무형문화재', '남사당놀이', '유네스코']
  }
];

// 전역 500개 수집 전체 데이터 저장소
export let FULL_HERITAGE_DATA = [...BASE_HERITAGE_DATA];

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 국가유산청(khs.go.kr) 오픈 API에서 경기도(ccbaCtcd=31) 전체 500개 수백 개 문화유산 실시간 자동 수집
 */
export async function fetchGyeonggiAllHeritageXmlData() {
  try {
    // pageUnit을 3000으로 넉넉하게 주어 경기도 전체 문화유산(약 1000여 개) 누락 없이 호출
    const url = `https://www.khs.go.kr/cha/SearchKindOpenapiList.do?pageUnit=3000&ccbaCncl=N&ccbaCtcd=31`;
    const res = await fetch(url);
    const xmlText = await res.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');

    const resultList = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const name = item.getElementsByTagName('ccbaMnm1')[0]?.textContent || '문화유산';
      const adminName = item.getElementsByTagName('ccbaAdmin')[0]?.textContent || '경기도';
      // ccbaLcad 내부의 CDATA 섹션까지 확실하게 읽기 위한 처리
      const lcadNode = item.getElementsByTagName('ccbaLcad')[0];
      let lcad = '';
      if (lcadNode) {
        // childNodes를 순회하여 CDATASection 또는 TextNode의 값을 결합
        for (let j = 0; j < lcadNode.childNodes.length; j++) {
          lcad += lcadNode.childNodes[j].nodeValue || '';
        }
        lcad = lcad.trim();
      }
      // 그래도 없다면 textContent 사용
      if (!lcad && lcadNode) lcad = lcadNode.textContent || '';
      
      // 이름, 주소, 관리자 중 '***'가 포함되어 있으면 필터링 (완전 제외)
      if (name.includes('***') || adminName.includes('***') || lcad.includes('***')) {
        continue;
      }

      let lat = parseFloat(item.getElementsByTagName('latitude')[0]?.textContent || 0);
      let lng = parseFloat(item.getElementsByTagName('longitude')[0]?.textContent || 0);
      const era = item.getElementsByTagName('ccceName')[0]?.textContent || '시대정보';
      const categoryName = item.getElementsByTagName('ccbaKdcdNm')[0]?.textContent || '문화재';
      const ccsiName = item.getElementsByTagName('ccsiName')[0]?.textContent || '';
      
      const kdcd = item.getElementsByTagName('ccbaKdcd')[0]?.textContent || '';
      const asno = item.getElementsByTagName('ccbaAsno')[0]?.textContent || '';
      const ctcd = item.getElementsByTagName('ccbaCtcd')[0]?.textContent || '31';

      // ccsiName(시군구명)과 adminName을 합쳐서 정확한 시/군/구(id) 매칭
      const cityId = matchCityId(ccsiName + ' ' + adminName);

      if (lat === 0 || lng === 0) {
        // 위경도 데이터가 없는 경우 해당 도시의 기본 좌표 주변으로 랜덤 배치
        const cityObj = GYEONGGI_CITIES.find(c => c.id === cityId) || GYEONGGI_CITIES[1];
        // 대략 반경 3km 내외로 랜덤 분산 (위도/경도 1도는 대략 111km)
        lat = cityObj.lat + (Math.random() - 0.5) * 0.05;
        lng = cityObj.lng + (Math.random() - 0.5) * 0.05;
      }

      const safeLcad = String(lcad || '').trim();
      const generatedAddress = safeLcad 
        ? (safeLcad.includes('경기') ? safeLcad : `경기도 ${ccsiName || adminName} ${safeLcad}`) 
        : `경기도 ${ccsiName || adminName}`;

      resultList.push({
        id: `khs_full_3000_${i}`,
        name,
        cityName: adminName,
        cityId,
        era,
        category: categoryName,
        lat,
        lng,
        kdcd,
        asno,
        ctcd,
        address: generatedAddress,
        image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
        summary: `${name}은(는) 경기도 ${adminName}에 위치한 자랑스러운 ${categoryName} (${era}) 문화재입니다.`,
        tags: [categoryName, era]
      });
    }

    if (resultList.length > 0) {
      FULL_HERITAGE_DATA = [...resultList]; // 중복 방지: Base 데이터 없이 API 데이터만으로 채움
      return FULL_HERITAGE_DATA;
    }
  } catch (err) {
    console.warn('Realtime 3000+ heritage API fetch failed, fallback to base dataset:', err);
  }
  return FULL_HERITAGE_DATA;
}

/**
 * 문화재 상세 API에서 실시간으로 이미지 URL 및 상세 소재지(지번) 추출
 */
export async function fetchHeritageDetail(kdcd, asno, ctcd) {
  if (!kdcd || !asno || !ctcd) return { imageUrl: null, address: null, content: null };
  try {
    const url = `https://www.khs.go.kr/cha/SearchKindOpenapiDt.do?ccbaKdcd=${kdcd}&ccbaAsno=${asno}&ccbaCtcd=${ctcd}`;
    const res = await fetch(url);
    const xmlText = await res.text();
    
    // 이미지 추출 (멀티라인 대응)
    let imageUrl = null;
    const imgMatch = xmlText.match(/<imageUrl><!\[CDATA\[([\s\S]*?)\]\]><\/imageUrl>/) || xmlText.match(/<imageUrl>([\s\S]*?)<\/imageUrl>/);
    if (imgMatch && imgMatch[1] && imgMatch[1].trim() !== '') {
      let rawImg = imgMatch[1].replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      imageUrl = rawImg.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').trim();
      if (imageUrl.startsWith('http://')) {
         imageUrl = imageUrl.replace('http://', 'https://');
      }
    }

    // 상세 주소 (ccbaLcad) 추출 (멀티라인 대응)
    let address = null;
    const lcadMatch = xmlText.match(/<ccbaLcad><!\[CDATA\[([\s\S]*?)\]\]><\/ccbaLcad>/) || xmlText.match(/<ccbaLcad>([\s\S]*?)<\/ccbaLcad>/);
    if (lcadMatch && lcadMatch[1] && lcadMatch[1].trim() !== '') {
      let rawAddr = lcadMatch[1];
      rawAddr = rawAddr.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      address = rawAddr.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').trim();
    }

    return { imageUrl, address };
  } catch (e) {
    console.warn('Detail fetch failed for', kdcd, asno);
  }
  return { imageUrl: null, address: null };
}

// 도시 필터 또는 반경 5km 검색 함수 (전체 500개 통합 데이터 기준)
export function filterHeritages({ cityId, userLat, userLng }) {
  const currentDataset = FULL_HERITAGE_DATA.length > 0 ? FULL_HERITAGE_DATA : BASE_HERITAGE_DATA;

  if (!cityId || cityId === 'all') {
    return currentDataset.map(item => {
      const dist = calculateDistance(userLat, userLng, item.lat, item.lng);
      return { ...item, distanceKm: dist };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  } else {
    return currentDataset.filter(item => item.cityId === cityId).map(item => {
      const dist = calculateDistance(userLat, userLng, item.lat, item.lng);
      return { ...item, distanceKm: dist };
    });
  }
}
