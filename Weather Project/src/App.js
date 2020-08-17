import React from "react";
import "./styles.css";

import LocationDisplay from "./LocationDisplay";

import Form from "./Form";

export let userLocation = "";
let apiKey = "hoArfRosT1215";
let locationKey = "";
export let currentTemp = "";
export let weatherText = "";
export let userState = "";
export let isRaining = false;
export let isDayTime = true;

const buttonStyle = {
  padding: "5px",
  align: "center",
  justifyContent: "center",
  display: "flex",
  margin: "5px"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      userLocationexists: false,
      isLoaded: false,
      items: []
    };
    this.resetStorage = this.resetStorage.bind(this);
    this.getConditions = this.getConditions.bind(this);
  }

  resetStorage() {
    localStorage.clear();
    isDayTime = true;
    this.setState({ userLocationexists: false, isLoaded: false });
    userLocation = "";
  }

  componentDidMount() {
    userLocation = localStorage.getItem("localLocation");
    if (userLocation !== null) {
      this.setState({ userLocationexists: true });
      this.getLocation();
    }
  }

  getLocation() {
    let locationUrl =
      "https://apidev.accuweather.com/locations/v1/search?q=" +
      userLocation +
      "&apikey=" +
      apiKey;
    console.log(locationUrl);
    fetch(locationUrl)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json
        });
        locationKey = this.state.items[0].Key;
        userLocation = this.state.items[0].LocalizedName;
        userState = this.state.items[0].AdministrativeArea.LocalizedName;
        this.getConditions(locationKey);
      });
  }

  getConditions(key) {
    let currentConUrl =
      "https://apidev.accuweather.com/currentconditions/v1/" +
      locationKey +
      ".json?apikey=" +
      apiKey;
    console.log(currentConUrl);
    fetch(currentConUrl)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json
        });
        currentTemp = this.state.items[0].Temperature.Imperial.Value;
        weatherText = this.state.items[0].WeatherText;
        isRaining = this.state.items[0].HasPrecipitation;
        isDayTime = this.state.items[0].IsDayTime;
        if (isDayTime) {
          document.body.style = "background: lightblue";
        } else {
          document.body.style = "background: darkgrey";
        }
        this.setState({
          isLoaded: true
        });
      });
  }

  render() {
    return (
      <div
        id="root"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "border-dark"
        }}
      >
        {!this.state.userLocationexists && <Form />}

        {this.state.isLoaded && <LocationDisplay />}
        <button style={buttonStyle} onClick={this.resetStorage}>
          Reset
        </button>
      </div>
    );
  }
}

export default App;
