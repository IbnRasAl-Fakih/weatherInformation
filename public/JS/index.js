window.onload = function() {
    document.getElementById("city").value = "Astana";
    document.getElementById("searchButton").click();
}

let mapInitialized = false;
let map;

function getMap(lat, lon) {
    L.mapquest.key = 'NmIjMCcloJXUcQYEqBHiHEyT9sUyRBkC';

    if (!mapInitialized) {
        map = L.mapquest.map('map', {
            center: [lat, lon],
            layers: L.mapquest.tileLayer('map'),
            zoom: 12
        });

        map.addControl(L.mapquest.control());
        mapInitialized = true;
    } else {
        map.setView([lat, lon], 12);
    }
}

async function search() {
    let city = document.getElementById("city").value;
    document.getElementById("city").value = "";
    get14days(city);

    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city: city}),
        });
        const responseData = await response.json();

        document.getElementById("cityName").innerHTML = responseData.city;
        document.getElementById("info").innerHTML = `
            <div>
                <div class="d-flex justify-content-center" id="icon">
                    <img src="${responseData.imageURL}" alt="" class="icon">
                </div>
                <p class="fs-1 text-capitalize text-center">${responseData.temp} °C</p>
                <p class="fs-3 text-capitalize text-center" id="text">${responseData.description}</p>
            </div>
            <div class="ms-3 fs-6 fw-light">
                <p class="my-2">Feels like: ${responseData.feelsLike}°C</p>
                <p class="my-2">Humidity: ${responseData.humidity}%</p>
                <p class="my-2">Pressure: ${responseData.pressure}mbar</p>
                <p class="my-2">Wind speed: ${responseData.windSpeed}m/sec</p>
            </div>
            <div id="sun"></div>
            `;
        getMap(responseData.lat, responseData.lon);

    } catch (error) {
        console.error('Error: ', error);
    }
}

async function get14days(city) {
    try {
        const response = await fetch('/get14days', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city: city}),
        });
        const responseData = await response.json();

        let data = responseData.forecast.forecastday;
        buildHours(data[0]);
        result = ``;

        for (let day in data) {
            if (day % 2 == 1) continue;
            result += `
                <tr>
                    <td style="width: 10vw">
                        <div>
                            <div class="d-flex justify-content-center">
                                <img src="${data[day].day.condition.icon}">
                            </div>
                            <p class="text-center">${data[day].day.condition.text}</p>
                            <p class="text-center">${data[day].day.avgtemp_c}°C</p>
                            <p class="text-center">${data[day].date}</p>
                        </div>
                    </td>
                    <td style="width: 10vw">
                        <div>
                            <div class="d-flex justify-content-center">
                                <img src="${data[Number(day) + 1].day.condition.icon}">
                            </div>
                            <p class="text-center">${data[Number(day) + 1].day.condition.text}</p>
                            <p class="text-center">${data[Number(day) + 1].day.avgtemp_c}°C</p>
                            <p class="text-center">${data[Number(day) + 1].date}</p>
                        </div>
                    </td>
                </tr>
            `;
        }

        document.getElementById("week").innerHTML = result;
    } catch (error) {
        console.error('Error: ', error);
    }
}

function buildHours(data) {
    console.log(data)
    document.getElementById("icon").innerHTML = `<img src="${data.day.condition.icon}" alt="" class="icon">`;
    document.getElementById("text").innerHTML = data.day.condition.text;
    document.getElementById("sun").innerHTML = `
    <p class="fw-light my-2 ms-3">Sunrise: ${data.astro.sunrise}</p>
    <p class="fw-light my-2 ms-3">Sunset: ${data.astro.sunset}</p>`;


    result = ``;
    for (let hour in data.hour) {
        if (hour % 2 == 1) continue;
        result += `
            <tr>
                <td class="d-flex align-items-center">
                    <div>
                        <p>${data.hour[hour].time.slice(-5)}</p>
                    </div>
                    <div class="mx-3">
                        <div class="d-flex justify-content-center">
                            <img src="${data.hour[hour].condition.icon}">
                        </div>
                        <p class="text-center">${data.hour[hour].condition.text}</p>
                    </div>
                    <div class="mx-3">
                        <p>Temperature: ${data.hour[hour].temp_c}°C</p>
                        <p>Feels like: ${data.hour[hour].feelslike_c}°C</p>
                    </div>
                    <div class="mx-3">
                        <p>Pressure: ${data.hour[hour].pressure_mb}mbar</p>
                        <p>Humidity: ${data.hour[hour].humidity}%</p>
                    </div>
                    <div class="mx-3">
                        <p>Cloud: ${data.hour[hour].cloud}%</p>
                        <p>Wind: ${data.hour[hour].wind_kph}km/hour</p>
                    </div>
                </td>
            </tr>
        `;
    }
    document.getElementById("hour").innerHTML = result;
}

