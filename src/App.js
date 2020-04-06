import React, { useState, useEffect } from 'react';

//Components
import Header from './components/header/Header';
import Form from './components/form/Form';
import Error from './components/error/Error';
import WeatherCard from './components/weatherCard/WeatherCard';

function App() {
  const [search, setSearch] = useState({
    city: '',
    country: ''
  });
  const [isQuery, setQuery] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const { city, country } = search;
  useEffect(() => {
    const getWeather = async () => {
      if(isQuery) {
        const apiKey = '2a2ac1bc0f008ba18c3d3d7f27519c9f';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
        const weather = await fetch(url);
        const response = await weather.json();
        setWeather(response);
        setQuery(false);
        if(weather.cod === '404') {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    getWeather();
  }, [isQuery])
  let component;
  if(error) {
    component = <Error message="No se obtuvieron resultados" />
  } else {
    component = <WeatherCard weather={weather} />
  }

  return (
    <>
      <Header
        title="Clima React app"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
                search={search}
                setSearch={setSearch}
                setQuery={setQuery}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
