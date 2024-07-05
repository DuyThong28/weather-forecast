export async function getForecastData({ city, latitude, longitude, days }) {
  let response;
  if (city) {
    response = await fetch(
      `https://weather-forecast-server-lhvp.onrender.com/api/v1/forecast?q="${city}"&days=${days}`
    );
  } else if (latitude && longitude) {
    response = await fetch(
      `https://weather-forecast-server-lhvp.onrender.com/api/v1/forecast?q=${latitude},${longitude}&days=${days}`
    );
  }

  if (!response.ok) {
    throw new Error("An error occur");
  }
  const resData = await response.json();
  const currentCity = resData.todayData.location;
  localStorage.setItem("city", currentCity);
  return { data: resData };
}

export async function getCityData({ name }) {
  const response = await fetch(
    `https://weather-forecast-server-lhvp.onrender.com/api/v1/forecast/search?q="${name}"`
  );

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();

  return {
    data: resData.cityData,
  };
}
