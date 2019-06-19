function getTimeFromTimezoneOffset(offset) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  return new Date(utc - offset * 60000);
}

module.exports = {
  getTimeFromTimezoneOffset
};