import React, {useState, useEffect} from 'react';
import './App.css';
import Clear from './assets/clear.jpg';
import Cloudy from './assets/cloudy.jpg';
import Overcast from './assets/overcast.jpg';
import Rainy from './assets/rainy.jpg';
import Snow from './assets/snow.jpg';
import SearchIcon from '@mui/icons-material/Search';

function App() {

  const[place, setPlace] = useState(null);
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
    handleFetch();
  },[]);

  const handleFetch = () =>{
    // fetch API
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=2cadb1d1db164725b1e115424221808&q=${place}&days=1&aqi=no&alerts=no`)
  .then((response) => response.json())
  .then((data) => setPlaceInfo({
    name: data.location.name,
    country: data.location.country,
    celcius: {
      current: data.current.temp_c,
      high: data.forecast.forecastday[0].day.maxtemp_c,
      low: data.forecast.forecastday[0].day.mintemp_c
    },
    condition: data.current.condition.text
  }));

  setPlace("");

  }

  console.log(placeInfo);

  return (
    <div className="app" 
    style={placeInfo.condition?.toLowerCase() === "clear" || 
    placeInfo.condition?.toLowerCase() === "sunny" 
    ? {backgroundImage: `url(${Clear})`} : 
    placeInfo.condition?.includes("cloudy") 
    ? {backgroundImage: `url(${Cloudy})`} : 
    placeInfo.condition?.toLowerCase().includes("rainy") 
    ? {backgroundImage: `url(${Rainy})`} :
    placeInfo.condition?.toLowerCase().includes("snow") 
    ? {backgroundImage: `url(${Snow})`} 
    : {backgroundImage: `url(${Overcast})`}
    }
    >

  
    <div className="search-input">
    <input type="text" value={place} onChange = {(e) => setPlace(e.target.value)} placeholder = "Ketikan Nama Kota" />

    <SearchIcon onClick={handleFetch} className = "search-button" fontSize = "large"/>

    </div>


    <div className="weather-container">
      <div className="top-part">
        <h1 className='condition-level'>{placeInfo.celcius?.current}°c</h1>
        <div className="condition-high-low">
          <h1 className='conditionLabel'>{placeInfo.condition}</h1>
          <h1 className='condition-high'>High {placeInfo.celcius?.high}°c</h1>
          <h1 className='condition-low'>Low {placeInfo.celcius?.low}°c </h1>
        </div>
      
      </div>
      <h2 className='place-location'>{placeInfo.name}, {placeInfo.country}</h2>
    </div>

 
    </div>
  );
}

export default App;
