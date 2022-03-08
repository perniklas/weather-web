import './App.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import CitiesOverview from './components/AllCities';
import City from './components/City';
import cityData from './assets/norway_cities.json'
import React, { useEffect, useState, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleWeatherResponse } from './helpers/utils';

const cities = cityData.records.sort((a, b) => b.fields.population - a.fields.population)
  .map(city => ({
    latitude: city.fields.coordinates[0],
    longitude: city.fields.coordinates[1],
    name: city.fields.name,
    population: city.fields.population
  })).filter(c => c.population > 5000);

function App() {
  const baseLocURL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?';
  const [lat, setLat]             = useState(null);
  const [long, setLong]           = useState(null);
  const [weather, setWeather]     = useState(null);
  // const [forecast, setForecast]   = useState(null);
  const [currentCity, setCity]    = useState(null);
  const [useGPS, setGPS]          = useState(true);
  const [foundCities, setCities]  = useState(cities);

  const callback = useCallback((pCity) => {
    const city = foundCities.filter(c => c.name === pCity)[0];
    setCity(pCity);
    setLat(city.latitude);
    setLong(city.longitude);
    setWeather(null);
  }, [currentCity, weather]);

  const filterSearch = (e) => {
    const filter = e.target.value;
    if (filter !== '') {
      const results = cities.filter(city => {
        return city.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
      setCities(results);
    } else {
      setCities(cities);
    }
  };

  const reset = useCallback(() => {
    setCity(null);
    setLat(null);
    setLong(null);
    setWeather(null);
    setCities(cities);
    setGPS(null);
  }, []);

  async function getWeatherData() {
    console.log('fetching weather for ', currentCity);
    await fetch(baseLocURL + `lat=${lat}&lon=${long}`)
      .then(data => data.json())
      .then(result => {
        let parsedWeather = handleWeatherResponse(result);
        setWeather(parsedWeather);
      });
  }

  async function getNearestCity() {
    await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
    ).then(data => data.json())
    .then(result => setCity(result.city));
  }

  function getGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude.toFixed(2));
      setLong(position.coords.longitude.toFixed(2));
    }, error => {
      setLat(null);
      setLong(null);
      console.log(error);
    });
  }

  useEffect(() => {
    console.log("status: ", lat, long, currentCity, weather);
    if (lat && long && currentCity && !weather) {
      getWeatherData();
      return;
    }
    
    if (useGPS) {
      getGeolocation();
    }
    
    if (lat && long && !currentCity) {
      getNearestCity();
    }
  }, [lat, long, currentCity, weather]);

  /**
   * If user has consented to sharing their location, jump straight to weather at user's position.
   * Load city overview if not.
   */
  return (
    <div className="App">
      <header className="App-header">
        {currentCity ? (
          weather ? <City weatherData={weather} name={currentCity} resetCity={reset}/>
            : <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
          ) : (
            <CitiesOverview 
              parentCallback={callback}
              allCities={foundCities}
              searchFilter={filterSearch}>
            </CitiesOverview>
          )
        }
      </header>
    </div>
  );
}

export default App;
