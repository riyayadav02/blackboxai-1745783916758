document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (!city) return;

        weatherResult.innerHTML = '<p class="text-yellow-300">Loading...</p>';

        try {
            const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            if (data.error) {
                weatherResult.innerHTML = `<p class="text-red-400">${data.error}</p>`;
                return;
            }

            weatherResult.innerHTML = `
                <h2 class="text-2xl font-bold">${data.city}</h2>
                <div class="flex justify-center items-center space-x-4">
                    <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}" />
                    <p class="text-4xl font-semibold">${data.temperature}°C</p>
                </div>
                <p class="capitalize">${data.description}</p>
                <p>Humidity: ${data.humidity}%</p>
                <p>Wind Speed: ${data.wind_speed} m/s</p>
            `;
        } catch (error) {
            weatherResult.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
        }
    });
});
