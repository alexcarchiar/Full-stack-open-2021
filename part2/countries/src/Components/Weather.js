import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = (props) => {
    const country = props.country
    const [weather, setWeather] = useState([])
    const [weatherLoad, setWeatherLoad] = useState(true)
    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`).then(response => {
        setWeather(response.data.current)
        setWeatherLoad(false)
        })
      }, [apiKey, country.capital])
      console.log('weather', weather)
      if(weatherLoad){
          return(<p>Loading</p>)
      }
      return(
          <div>
              <h4>Weather in {country.capital}</h4>
              <p><strong>Temperature: </strong> {weather.temperature} Celsius</p>
              <img src={weather.weather_icons[0]}/>
              <p><bold>Weather Description: </bold>{weather.weather_descriptions[0]}</p>
              <p><bold>Wind: </bold>{weather.wind_speed} mph direction {weather.wind_dir}</p>
          </div>
      )
}

export default Weather