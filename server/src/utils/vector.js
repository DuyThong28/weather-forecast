function convertKphToMps(kphValue) {
  const mps = (kphValue * 5) / 18;
  return mps.toFixed(2);
}

module.exports = {
  convertKphToMps,
};
