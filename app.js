const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
const POST = 3000;

app.use(bodyparser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/search', (req, res) => {
    try {
        let city = req.body.city;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=318219d149d1b97e874d45262de06778&units=metric`;
        https.get(url, (response) => {
            response.on("data", (data) => {
                const weatherdata = JSON.parse(data);
                const imageURL = "https://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + "@2x.png";
                res.status(200).json({ message: 'Success', temp: weatherdata.main.temp, description: weatherdata.weather[0].description, imageURL: imageURL, lon: weatherdata.coord.lon, lat: weatherdata.coord.lat, feelsLike: weatherdata.main.feels_like, pressure: weatherdata.main.pressure, humidity: weatherdata.main.humidity, windSpeed: weatherdata.wind.speed, city: weatherdata.name });
            });
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/get14days', (req, res) => {
    try {
        let city = req.body.city;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=c47da161487447fc815193920242201&q=${city}&days=14&aqi=no&alerts=no`;

        https.get(url, (response) => {
            let dataBuffer = Buffer.from([]);

            response.on("data", (chunk) => {
                dataBuffer = Buffer.concat([dataBuffer, chunk]);
            });

            response.on("end", () => {
                const dataString = dataBuffer.toString();
                res.json(JSON.parse(dataString));
            });
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(POST, () => {
    console.log("server is started");
});