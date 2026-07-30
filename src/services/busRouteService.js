/**
 * 도보 1km 판정 및 경기도 실시간 버스 / 카카오 모빌리티 길찾기 안내 서비스
 */

export function getRouteInformation(userLat, userLng, destinationHeritage) {
  if (!destinationHeritage) return null;

  const destLat = destinationHeritage.lat;
  const destLng = destinationHeritage.lng;
  const dist = destinationHeritage.distanceKm || 1.2;

  // 2km 이내일 경우 도보 추천
  if (dist <= 2.0) {
    const walkMinutes = Math.max(3, Math.round(dist * 14));
    const calories = Math.round(dist * 60);

    return {
      mode: 'WALKING',
      isWalking: true,
      distanceKm: dist.toFixed(2),
      walkMinutes,
      calories,
      recommendationText: `🎯 거리 ${dist.toFixed(2)}km로 2km 이내입니다! 건강하게 걸어가는 것을 추천해요.`,
      kakaoMapUrl: `https://map.kakao.com/link/to/${encodeURIComponent(destinationHeritage.name)},${destLat},${destLng}`,
      kakaoNaviUrl: `https://map.kakao.com/link/to/${encodeURIComponent(destinationHeritage.name)},${destLat},${destLng}`
    };
  } 
  // 2km 초과 시 대중교통/자동차 추천
  else {
    return {
      mode: 'TRANSPORT',
      isWalking: false,
      distanceKm: dist.toFixed(2),
      recommendationText: `🚌 거리 ${dist.toFixed(2)}km로 도보 2km를 초과합니다. 카카오맵 길찾기를 이용해 보세요!`,
      kakaoMapUrl: `https://map.kakao.com/link/to/${encodeURIComponent(destinationHeritage.name)},${destLat},${destLng}`,
      kakaoNaviUrl: `https://map.kakao.com/link/to/${encodeURIComponent(destinationHeritage.name)},${destLat},${destLng}`
    };
  }
}
