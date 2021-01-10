function paddedNumber(num) {
  return String(num).padStart(2, "0");
}

function getTime(date) {
  const hours = paddedNumber(date.getHours());
  const minutes = paddedNumber(date.getMinutes());
  const seconds = paddedNumber(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

module.exports = {
  paddedNumber,
  getTime,
};
