import React from 'react';

import '../styles/current.scss'
import Icons from './Icons'

const Current = props => {

    //checks if theres actual data, its not in the beginning 
    if (props.currentData.name === undefined) {
        return <></>
    };

    const data = props.currentData;
    const description = data.weather[0].description
    const city = data.name;
    const temp = data.main.temp.toFixed();              
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const feelsLike = data.main.feels_like.toFixed();
    const wind = (data.wind.speed * 3.6).toFixed(1);
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const icon = data.weather[0].icon;
    const country = data.sys.country;


    const formatTime = daytime => {
        const time = new Date((daytime * 1000) + (data.timezone * 1000)).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(11, -3);
        return time;
    };

    const currentDate = () => {
        const a = new Date();
        const day = a.getDay()
        const month = a.getMonth()
        const time = `${day} ${a.getDate()} ${month}`;

        return time;
    };

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <section className="current-forecast hide">
            <div className="city">
                <h2>{city}, <span>{country}</span></h2>
                <p>{currentDate()}</p>
            </div>
            <div className="current-temp">
                <Icons iconInfo={icon} />
                <div className="info">
                    <h2>{temp}°C</h2>
                    <p>{capitalizeFirstLetter(description)}</p>
                </div>
            </div>
            <div className="current-others">
                <div className="rain">
                    <h3>{feelsLike}°C</h3>
                    <p>Feels like</p>
                </div>
                <div className="wind">
                    <h3>{wind}km/h</h3>
                    <p>Wind speed</p>
                </div>
                <div className="sunrise">
                    <h3>{formatTime(sunrise)}</h3>
                    <p>Sunrise</p>
                </div>
                <div className="pressure">
                    <h3>{pressure}hPa</h3>
                    <p>Pressure</p>
                </div>
                <div className="humidity">
                    <h3>{humidity}%</h3>
                    <p>Humidity</p>
                </div>
                <div className="sunset">
                    <h3>{formatTime(sunset)}</h3>
                    <p>Sunset</p>
                </div>
            </div>
        </section>
    );
};

export default Current;