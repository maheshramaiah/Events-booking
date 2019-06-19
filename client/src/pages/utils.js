export function dateParser(date) {
  return new Date(parseInt(date)).toLocaleString('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

export function debounce(fn, time) {
  let timeout;

  return (...args) => {
    timeout && clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.apply(null, args);
    }, time);
  }
}

export function getTimezoneOffset() {
  return new Date().getTimezoneOffset();
}