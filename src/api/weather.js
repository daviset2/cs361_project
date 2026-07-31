const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

console.log("API KEY:", API_KEY);


function parseLocation(input) {
  const [city, state, country] = input.split(",").map(s => s.trim()); /* assumes user entering in city,state,country format as we were told we could, then splits it into three separate values for the call*/
  return { city, state, country };
}

export async function getForecast(input, units = 'imperial') {
  const { city, state, country } = parseLocation(input);

  const geoUrl =
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${API_KEY}`;

  const geoRes = await fetch(geoUrl); /* fetches the geolocation stuff */
  const geoData = await geoRes.json();

  if (!geoData.length) throw new Error("City not found");

  const { lat, lon } = geoData[0]; /* gets the latitude and longitude from call response */

  const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

  const forecastRes = await fetch(forecastUrl); /* fetches forecast from the lat and long */
  return await forecastRes.json();
}

export async function getCurrentWeather(input, units = "imperial") {
  const { city, state, country } = parseLocation(input);

  const geoUrl =
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${API_KEY}`;

  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.length) throw new Error("City not found");

  const { lat, lon } = geoData[0];

  const weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

  const weatherRes = await fetch(weatherUrl);

  return await weatherRes.json();
}