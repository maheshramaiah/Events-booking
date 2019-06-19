function getTimeStampFromTimezoneOffset(offset) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

  console.log(`Server Date : ${now}`);
  console.log(`Server timezoneoffset : ${now.getTimezoneOffset()}`);
  console.log(`UTC timestamp : ${utc}`);

  return (utc - (offset * 60000));
}

module.exports = {
  getTimeStampFromTimezoneOffset
};