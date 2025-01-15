/**
 * 숫자를 한글 단위로 변환하여 포맷합니다.
 * @param num 변환할 숫자
 * @returns 문자열 (예: 25.6만 / 3천)
 * @example const test = formatKoreanUnit(256000); // "25.6만"
 */
export function formatKoreanUnit(num: number): string {
  if (!num) {
    // num이 null일 때
    return '0'
  }
  if (num >= 10_000) {
    return (num / 10_000).toFixed(1) + '만'
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + '천'
  } else {
    return num.toString()
  }
}
