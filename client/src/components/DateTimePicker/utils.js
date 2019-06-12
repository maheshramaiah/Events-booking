export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const hours = new Array(24).fill().map((item, index) => index);

export const minutes = new Array(12).fill().map((item, index) => (index * 5));

export function getYearsFromRange(start, end) {
  return new Array(end - start + 1).fill().map((item, index) => +`${start + index}`);
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month);

  return new Array(daysInMonth).fill().map((item, index) => index + 1);
}