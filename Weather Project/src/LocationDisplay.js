import React from "react";
import "./styles.css";
import {
  userLocation,
  currentTemp,
  weatherText,
  userState,
  isRaining
} from "./App";

const sunnyUrl =
  "https://www.clker.com/cliparts/I/X/3/J/K/a/sunny-weather-ed.svg";

const rainingUrl =
  "https://www.clker.com/cliparts/w/F/h/x/4/3/rain-cloud-md.png";
const pagestyle = {
  textAlign: "center",
  fontSize: "35px"
};

const paragraphstyle = {
  fontSize: "25px",
  textAlign: "center"
};

export default class LocationDisplay extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "lightgray",
          width: "1000px",
          border: "5px solid black"
        }}
      >
        <h1 style={pagestyle}>
          Location: {userLocation}, {userState}
        </h1>
        <span style={paragraphstyle}>Forecast: {weatherText}</span>
        {isRaining === false && <img src={sunnyUrl} alt="Clear" />}
        {isRaining === true && <img src={rainingUrl} alt="Raining" />}
        <br />
        <span style={paragraphstyle}>Temperature: {currentTemp} °F</span>
      </div>
    );
  }
}
