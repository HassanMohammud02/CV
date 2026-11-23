export function calculateReadingTime(text = '') {
  const clean = String(text).trim();
  if (!clean) return '1 min read';
  const words = clean.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
