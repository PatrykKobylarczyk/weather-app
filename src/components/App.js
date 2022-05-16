import React from 'react';
import WeatherApp from './WeatherApp';
import '../styles/app.scss'
import '../styles/weather-icons.min.css'

const App = () => {
    return ( 
        <div className='app'>
            <WeatherApp/>
        </div>
     );
}
 
export default App;