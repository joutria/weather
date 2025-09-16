// Utility to get bottom linear gradient from weather code and is_day
import weatherColors from './weatherColors.json';

export function getWeatherLinearGradient(code, is_day, darkMode) {
  const entry = weatherColors.find(e => e.code === code);
  let main;
  if (entry) {
    main = is_day ? entry.day : entry.night;
  } else {
    main = darkMode ? '#232526' : '#a8edea';
  }
  const bg = darkMode ? '#181818' : '#fff';
  // Linear gradient: bg at top 50%, main color at bottom 50%
  return `linear-gradient(to bottom, ${bg} 0%, ${main} 100%)`;
}
