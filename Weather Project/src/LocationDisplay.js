import React from "react";
import "./styles.css";
import { userLocation, currentTemp, weatherText, userState } from "./App";

const pagestyle = {
  textAlign: "center",
  fontSize: "35px"
};

const paragraphstyle = {
  fontSize: "25px"
};

export default class LocationDisplay extends React.Component {
  render() {
    return (
      <div>
        <p style={pagestyle}>
          Location: {userLocation}, {userState}
        </p>
        <p style={paragraphstyle}>Temperature: {currentTemp} °F</p>
        <p style={paragraphstyle}>Forecast: {weatherText}</p>
      </div>
    );
  }
}
