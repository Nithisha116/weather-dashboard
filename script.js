async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = apiKey;

  const loading = document.getElementById("loading");
  const card = document.getElementById("weatherCard");
  const error = document.getElementById("error");

  loading.classList.remove("hidden");
  card.classList.add("hidden");
  error.innerText = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    loading.classList.add("hidden");

    if (res.status !== 200) {
      error.innerText = "❌ " + data.message;
      return;
    }

    // Set data
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText =
      `🌡 ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)`;

    document.getElementById("desc").innerText =
      data.weather[0].description;

    document.getElementById("extra").innerText =
      `💧 Humidity: ${data.main.humidity}% | 🌬 Wind: ${data.wind.speed} m/s`;

    // Icon
    const icon = data.weather[0].icon;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Show card
    card.classList.remove("hidden");

    // Hide search bar
    document.getElementById("searchBox").style.display = "none";

    // Show back button
    document.getElementById("backBtn").classList.remove("hidden");

    // Change background
    changeBackground(data.weather[0].main);

  } catch (err) {
    loading.classList.add("hidden");
    error.innerText = "Something went wrong!";
  }
}

// Show search again
function showSearch() {
  document.getElementById("searchBox").style.display = "block";
  document.getElementById("weatherCard").classList.add("hidden");
  document.getElementById("backBtn").classList.add("hidden");
}

// Background change
function changeBackground(condition) {
  if (condition.includes("Cloud")) {
    document.body.style.background =
      "linear-gradient(to right, #636e72, #2d3436)";
  } else if (condition.includes("Rain")) {
    document.body.style.background =
      "linear-gradient(to right, #4e54c8, #8f94fb)";
  } else if (condition.includes("Clear")) {
    document.body.style.background =
      "url('https://p0.piqsels.com/preview/786/53/82/4k-wallpaper-atmosphere-cloudiness-clouds.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  }
}

// ENTER key support
document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});