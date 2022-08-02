import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IsLoading from './IsLoading'

const CardWeather = ({lat,lon,setBackground}) => {
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [flag, setFlag] = useState(true)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
      if(lat){
        const apiKey = '949b11b11a142dfcf99f47c05fad1554'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        
        axios.get(url)
            .then(res => {
              setWeather(res.data)
              // convertimos temp a celsius y fahrenheit
              const temp = {
                celsius : `${Math.round(res.data.main.temp - 273.15)} °C`,
                fahrenheit: `${Math.round((res.data.main.temp - 273.15) * 9/5 +32)} °F`
              }

              setTemperature(temp)
              setIsLoading(false)
            })
            .catch(err => console.log(err.message)) 
      }  
    }, [lat,lon])
    
    // cambiar la imagen de fondo
  
      switch (weather?.main){
        // case 'Rain': setBackground('../public/rain.jpg')
        //   break;
        // case 'Snow':setBackground('../public/snow.jpg')
        // break;
        // case 'Wind':setBackground('../public/wind.jpg')
        // break;
        // case 'Sunny ':setBackground('../public/sunny.jpg')
        // break;
        // default:setBackground('../public/could.jpg')
        // break;
        case 'Rain': setBackground('rain')
          break;
        case 'Snow':setBackground('snow')
        break;
        case 'Wind':setBackground('wind')
        break;
        case 'Sunny ':setBackground('sunny')
        break;
        default:setBackground('could')
        break;
      }

    // cambiamos el estado flag a falso si es true y alrevez
    const changeFlag = () => {
      setFlag(!flag);
    }

    console.log(weather);
    if(isLoading){
      return  <IsLoading/>
    }else{
  return (
    <article className='card-weather seleccion'>
        <h1 className='card-weather--title'>Weather App</h1>
        <p className='card-weather--description'>{`${weather?.name}, ${weather?.sys.country}`}</p>
        <div className='card-weather__body'>
            <div className='card-weather__body--left'>
              <img src={ weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
              
              <h3>{flag ? temperature?.celsius : temperature.fahrenheit}</h3>
            </div>
            <div className='card-weather__body--right'>
              <h3>"{weather?.weather[0].description}"</h3>
              <ul>
                <li><i className='bx bx-wind' style={{color:'#00f5d4'}}  ></i><span> Wind speed: </span>{weather?.wind.speed}{weather?.wind.speed.unit} m/s </li>
                <li><i class='bx bxs-cloud' style={{color:'#00f5d4'}} ></i><span> Clouds: </span>{weather?.clouds.all}&#37;</li>
                <li><i class='bx bxs-thermometer' style={{color:'#00f5d4'}} ></i><span> Pressure: </span>{weather?.main.pressure} hPa</li>
                {/* <li><span></span></li> */}
              </ul>
            </div>
        </div>
          <button onClick={changeFlag} className='card-weather--button'>{flag? 'change °F' : 'change °C'}</button>
    </article>
  )}

}

export default CardWeather