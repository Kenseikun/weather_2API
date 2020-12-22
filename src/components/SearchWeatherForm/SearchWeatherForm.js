import React from "react";

const SearchWeatherForm = ({ getWeather }) => {
  return (
    <>
      <form onSubmit={getWeather}>
        <input type="text" placeholder="search place..." name="searchWeather" />

        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchWeatherForm;
