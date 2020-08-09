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

const buttonStyle = {
  padding: "5px",
  align: "center",
  justifyContent: "center",
  display: "flex"
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
        this.setState({
          isLoaded: true
        });
      });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!this.state.userLocationexists && <Form />}
        <button style={buttonStyle} onClick={this.resetStorage}>
          Reset
        </button>
        {this.state.isLoaded && <LocationDisplay />}
      </div>
    );
  }
}

export default App;
