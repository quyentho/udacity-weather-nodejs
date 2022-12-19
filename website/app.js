/* Global Variables */
const apiKey = "1e635b0bfc1a0aad9801ecb4ce130810&units=imperial";
const weatherApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIkey}";
const geoApiUrl =
  "http://api.openweathermap.org/geo/1.0/zip?zip={zipcode}&appid={APIkey}";
const submitBtn = document.getElementById("generate");
const userResponseInput = document.getElementById("feelings");
const zipInput = document.getElementById("zip");
const dateDiv = document.getElementById("date");
const temperatureDiv = document.getElementById("temp");
const userResponseDiv = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const retrieveData = async () => {
  const request = await fetch("/get");
  try {
    const allData = await request.json();
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log(error);
  }
};
const postAsync = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
submitBtn.addEventListener("click", async () => {
  const zip = zipInput.value;
  const geoUrl = geoApiUrl
    .replace("{zipcode}", zip)
    .replace("{APIkey}", apiKey);

  const geoResponse = await fetch(geoUrl).then((response) => response.json());

  const weatherUrl = weatherApiUrl
    .replace("{lat}", geoResponse.lat)
    .replace("{lon}", geoResponse.lon)
    .replace("{APIkey}", apiKey);
  const weatherResponse = await fetch(weatherUrl).then((response) =>
    response.json()
  );
  const temp = weatherResponse.main.temp;
  await postAsync("/post", {
    temperature: temp,
    date: newDate,
    userResponse: userResponseInput.value,
  });

  const recentEntry = await fetch("/get").then((response) => response.json());
  dateDiv.innerText = recentEntry.date;
  temperatureDiv.innerText = recentEntry.temperature;
  userResponseDiv.innerText = recentEntry.userResponse;
});
