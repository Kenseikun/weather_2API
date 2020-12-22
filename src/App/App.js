import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SearchWeatherForm from "../components/SearchWeatherForm/SearchWeatherForm";
import DisplayWeather from "../components/DisplayWeather/DisplayWeather";

// const apiUrl =
//   "http://api.openweathermap.org/data/2.5/weather?q=Warsaw&APPID=82539fc214fd5543bd4ccc83b18a89a1";

// const coordinates = `http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=${process.env.REACT_APP_API_KEY}`;

class App extends Component {
  state = {
    humidity: null,
    pressure: null,
    temp: null,
    wind: {},
    pollution: null,
    weatherDescription: {},
    weatherCoordinates: {
      lat: null,
      lon: null,
    },
    error: "",
  };

  // componentDidMount() {
  //   this.getWeather();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.weatherCoordinates !== this.state.weatherCoordinates) {
      this.getPollution();
    }
  }

  getWeather = (e) => {
    e.preventDefault();
    const cityInputValue = e.target.searchWeather.value;

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log(response);
        const { temp, humidity, pressure } = response.data.main;
        const { lat, lon } = response.data.coord;
        const celciusWeather = Math.round(temp - 273);

        this.setState({
          wind: response.data.wind,
          weatherDescription: response.data.weather[0],
          temp: celciusWeather,
          pressure,
          humidity,
          weatherCoordinates: {
            lat,
            lon,
          },
          error: "",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "City not found, try again",
        });
      });
    e.target.reset();
  };

  handleTempDegreeSelect = (e) => {
    const selectValue = e.target.value;
    console.log(selectValue);
    if (selectValue === "Celcius") {
      const celciusWeather = Math.round(this.state.temp);
      // T(°F) = T(°C) × 1.8 + 32

      this.setState({
        temp: celciusWeather,
      });
    } else {
      this.setState({
        temp: this.state.temp * 1.8 + 32,
      });
    }
  };

  getPollution = () => {
    const { lat, lon } = this.state.weatherCoordinates;

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.list[0]);
        console.log(response.data.list[0].components);
        this.setState({
          pollution: response.data.list[0].components.co,
        });
      });
  };

  render() {
    // console.log(this.state.pollution);
    // const {
    //   temp,
    //   humidity,
    //   pressure,
    //   weatherLoading,
    //   error,
    //   weatherDescription,
    // pollution
    // } = this.state;
    return (
      <>
        <>
          <SearchWeatherForm getWeather={this.getWeather} />
          <DisplayWeather
            {...this.state}
            // temp={temp}
            // humidity={humidity}
            // pressure={pressure}
            // error={error}
            // weatherLoading={weatherLoading}
            // weatherDescription={weatherDescription}
            handleTempDegreeSelect={this.handleTempDegreeSelect}
          />
        </>
      </>
    );
  }
}

export default App;
