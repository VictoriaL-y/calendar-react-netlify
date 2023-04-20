import React, { useEffect } from "react";

function WeatherWidget() {
    let lat;
    let long;

    // Get your current position
    useEffect(() => {
        const success = (position) => {

            lat = position.coords.latitude;
            long = position.coords.longitude;

            const weatherFetchUrl = "http://127.0.0.1:8000/geolocation/" + lat + "/" + long;

            const displayWeather = function (data) {
                const { name } = data.data;
                const { icon, description } = data.data.weather[0];
                const { temp, humidity } = data.data.main;
                const { speed } = data.data.wind;
                if (name != null) {
                    document.querySelector(".city").innerText = "Weather in " + name;
                    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                    document.querySelector(".description").innerText = description;
                    document.querySelector(".temp").innerText = parseInt(temp) + "°C";
                    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
                    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
                }
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", weatherFetchUrl, true); // false for synchronous request
            xmlHttp.send(null);

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {   //if complete
                    if (xmlHttp.status === 200) {  //check if "OK" (200)

                        displayWeather(JSON.parse(xmlHttp.response)); //success
                        
                    } else {
                        document.querySelector(".city").innerText = "For weather info:";
                        document.querySelector(".humidity").innerHTML = `
                        <div class="error-weather">
                        <p>- Turn on your device location</p>
                        <p>- Allow to access your location</p>
                        <p>- Refresh the page</p>
                        </div>` //otherwise, some other code was returned
                    }
                }
                
            }

            

            

        }
        const error = () => {
            document.querySelector(".city").innerText = "For weather info:";
            document.querySelector(".humidity").innerHTML = `
            <div class="error-weather">
            <p>- Turn on your device location</p>
            <p>- Allow to access your location</p>
            <p>- Refresh the page</p>
            </div>`
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return (
        <div className="card">
            <div className="weather">
                <h2 className="city"></h2>
                <div className="temp"></div>
                <img alt="" className="icon" />
                <div className="description"></div>
                <div className="humidity"></div>
                <div className="wind"></div>
            </div>
        </div>
    )
};


export default WeatherWidget;


