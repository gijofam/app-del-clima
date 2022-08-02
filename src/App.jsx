import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'
import IsLoading from './components/IsLoading'

function App() {
  const [coords, setCoords] = useState()
  const [background, setBackground] = useState()

  useEffect(() => {
    
    const success = pos =>{
      const objCoords = {
        lon: pos.coords.longitude,
        lat: pos.coords.latitude
      }
      setCoords(objCoords);
    }
    
    navigator.geolocation.getCurrentPosition(success)
    
  }, [])
  
  console.log(background);

  // const backgroundImg = {
  //   backgroundImage : url(background)
  // }


  // style={{backgroundImage : url(background)}}
  return (
    <div className={`App ${background}`} >
      <CardWeather lat = {coords?.lat} lon = {coords?.lon} setBackground={setBackground}/>
      {/* <IsLoading/> */}
    </div>
  )
}

export default App
