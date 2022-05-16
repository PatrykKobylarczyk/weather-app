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
        // document.querySelectorAll('.hide').forEach((section) => {
        //   section.style.opacity = '0';
        // })
        // // handle success
        // setTimeout(() => {
          setData(response.data)
        // }, 400)

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

  useEffect(() => {
    const showContent = (delay) => {
      if (data.name !== '') {
        const componentsToShow = document.querySelectorAll('.hide');
        const componentsToDisplay = document.querySelectorAll('.display');

        componentsToDisplay.forEach((component) => {
          component.style.display = 'block';
        });

        setTimeout(() => {
          componentsToShow.forEach((component) => {
            component.style.opacity = '1';
          });

        }, delay);
      };
    };
    showContent(150);
  }, [data]);

  useEffect(() => {
    getForecastData(data.coord.lat, data.coord.lon);
  }, [data.coord.lat, data.coord.lon])

  return (
    <div className="weatherApp">
      <div className="bgImage"></div>
      <Input cityName={getCity} checkForm={submitCity} />
      {city === '' ? <Current currentData={data} /> : null}
      {city === '' ? <Forecast forecastData={forecast} /> : null}
    </div>
  );
}

export default WeatherApp;
