import React from "react";

// http://openweathermap.org/img/wn/10d@2x.png

const DisplayWeather = ({
  weatherDescription,
  pressure,
  humidity,
  temp,
  pollution,
  error,
  handleTempDegreeSelect,
}) => {
  return (
    <>
      {temp ? (
        <div>
          <p>{temp}&deg;C</p>
          <p>Carbon monoxide level: {pollution}</p>

          <select
            onChange={(e) => handleTempDegreeSelect(e)}
            name="tempDegreeSelect"
          >
            <option value="Celcius">Celcius</option>
            <option value="Fahrenheit">Fahrenheit</option>
          </select>
          <img
            src={`http://openweathermap.org/img/wn/${weatherDescription.icon}@2x.png`}
            alt="weather condition icon"
          />
          <p style={{ color: "red" }}>{error}</p>
        </div>
      ) : null}
    </>
  );
};

export default DisplayWeather;
