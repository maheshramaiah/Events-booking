export function dateParser(date) {
  return new Date(parseInt(date)).toLocaleString('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}