import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import './App.css';


const App = () => {


  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ sw: 0, ne: 0 });
  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [isVoid, setIsVoid] =useState(false);

  const emptyArr=[];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, []) //only happens at the start

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) >= rating);
    // console.log("this is:",filtered);
    setIsVoid(false);
    setFilteredPlaces(filtered);
    if (!filtered.length && places.length) { //if there isnt anything that fits the filter
      const bool=true;
      setIsVoid(true);
      // console.log("isvoid: ", bool,filteredPlaces.length);
    }
    

  }, [rating,coordinates,places])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        setWeatherData(data);
      })

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
     
        setFilteredPlaces([]);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        
        setIsLoading(false);
      })
    }
  }, [type, bounds]); //reload when there is a change to type or boundsm
  

  return (
    <div className="app">
    {/* reset global styles like padding and box-sizing */}
      <CssBaseline />  
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={ 
              isVoid? emptyArr:
              filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
           
          />

        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={ 
              isVoid? emptyArr:
              filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
