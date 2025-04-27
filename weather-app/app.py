from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual OpenWeatherMap API key
API_KEY = "your_openweathermap_api_key"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is required'}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get weather data'}), response.status_code

    data = response.json()
    weather = {
        'city': data.get('name'),
        'temperature': data['main']['temp'],
        'description': data['weather'][0]['description'],
        'icon': data['weather'][0]['icon'],
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind']['speed']
    }
    return jsonify(weather)

if __name__ == '__main__':
    app.run(debug=True)
