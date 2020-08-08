import React from "react";
import "./styles.css";

import Form from "./Form";

let userLocation = "";
let apiKey = "hoArfRosT1215";
let locationKey = "";
let currentTemp = "";
let weatherText = "";
let userState = "";

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
    this.setState({ userLocationexists: false });
    userLocation = "";
  }
  componentDidMount() {
    userLocation = localStorage.getItem("localLocation");
    if (userLocation !== null) {
      this.setState({ userLocationexists: true });
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
      <div>
        {!this.state.userLocationexists && <Form />}
        <button onClick={this.resetStorage}>Reset</button>
        <h1>
          Location: {userLocation}, {userState}
        </h1>
        <p>Current Forecast: {currentTemp} Fahrenheight</p>
        <p>{weatherText}</p>
      </div>
    );
  }
}

export default App;
