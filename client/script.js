async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/weather?city=${city}`);
        const data = await res.json();

        displayWeather(data);

    } catch (error) {
        console.error(error);
        alert("Error fetching weather");
    }
}

function displayWeather(days) {
    const container = document.getElementById("weatherContainer");
    container.innerHTML = "";

    days.forEach(day => {
        const date = new Date(day.Date).toDateString();

        const icon = day.Day.Icon;
        const iconUrl = `https://developer.accuweather.com/sites/default/files/${String(icon).padStart(2, '0')}-s.png`;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${date}</h3>
            <img src="${iconUrl}" />
            <p>🌡️ Min: ${day.Temperature.Minimum.Value}°C</p>
            <p>🌡️ Max: ${day.Temperature.Maximum.Value}°C</p>
            <p>☀️ Day: ${day.Day.IconPhrase}</p>
            <p>🌙 Night: ${day.Night.IconPhrase}</p>
        `;

        container.appendChild(card);
    });
}