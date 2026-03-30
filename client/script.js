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
