export default function isTouchScreen() {
  if (typeof window === 'undefined') return false;
  return !!(
    'ontouchstart' in window || // works on most browsers
    navigator.maxTouchPoints
  ); // works on IE10/11 and Surface
}
