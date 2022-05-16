import React, { useEffect, useState } from 'react';

import '../styles/weatherApp.scss';
import Input from './Input';
import Current from './Current';
import Forecast from './Forecast';
import Axios from 'axios'



function WeatherApp() {

  const entryData = {
    coord: {
      lon: 69,
      lat: 0
    }
  };

  const [city, setCity] = useState()
  const [data, setData] = useState(entryData)
  const [forecast, setForecast] = useState()

  const getCity = e => {
    setCity(e.target.value)
  }

  const getCurrentData = (city) => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3bbcd38209e98c3c295a84414b911b1&units=metric`)
      .then(response => {
        // handle success
        setTimeout(() => {
          setData(response.data)
        }, 400)

        document.querySelector('.error-msg').textContent = '';
        document.querySelector('.input-wrap input').value = '';
        setCity('');
      })
      .catch(error => {
        if (city === '') {
          document.querySelector('.error-msg').textContent = 'You have to write something!'
          return
        } else {
          document.querySelector('.error-msg').textContent = 'Enter correct city name!'
          console.log(error);
        };
      })
  }

  const getForecastData = (lat, lon) => {
    Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=e3bbcd38209e98c3c295a84414b911b1&units=metric`)
      .then(respone => setForecast(respone.data))
  }

  const submitCity = e => {
    e.preventDefault();
    getCurrentData(city);
  }

  return (
    <div className="weatherApp">
      <div className="bgImage"></div>
      <Input cityName={getCity} checkForm={submitCity} />
      <Current currentData={data} />
      <Forecast forecastData={forecast} />
    </div>
  );
}

export default WeatherApp;
