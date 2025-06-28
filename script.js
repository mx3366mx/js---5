const apiKey = 'b7ed2df270924a0e849150239252806';

function getWeather(cityName = null) {
  const city = cityName || document.getElementById("cityInput").value;
  if (!city) return alert(" إدخال اسم المدينة");

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&lang=ar`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("خطأ:", error);
      alert(" خطأ في جلب بيانات الطقس.");
    });
}

function displayWeather(data) {
  const container = document.getElementById("weatherContainer");
  container.innerHTML = "";

  data.forecast.forecastday.forEach(day => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString('ar-EG', { weekday: 'long' });

    const iconUrl = "https:" + day.day.condition.icon;

    const card = `
      <div class="card">
        <h2>${dayName}</h2>
        <img src="${iconUrl}" alt="${day.day.condition.text}" />
        <h1>${day.day.avgtemp_c}°C</h1>
        <p>${day.day.mintemp_c}° / ${day.day.maxtemp_c}°</p>
        <p>${day.day.condition.text}</p>
        <p>الرطوبة: ${day.day.avghumidity}%</p>
      </div>
    `;
    container.innerHTML += card;
  });
}


