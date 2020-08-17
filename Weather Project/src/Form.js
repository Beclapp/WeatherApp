import React from "react";
import "./styles.css";

const formstyle = {
  padding: "5px",
  textAlign: "center",
  align: "center"
};

const buttonstyle = {
  padding: "5px",
  textAlign: "center",
  align: "center",
  margin: "5px"
};

export default class Form extends React.Component {
  state = {
    location: "",
    locationsubmitted: false
  };
  handleSubmit = (event) => {
    localStorage.setItem("localLocation", this.state.location);
    //event.preventDefault();

    this.setState({ locationsubmitted: true });
  };
  handleChange = (event) => {
    this.setState({ location: event.target.value });
  };
  getLocation = (locationInfo) => {};
  render() {
    return (
      <form style={formstyle} onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input
            style={formstyle}
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </label>
        <input style={buttonstyle} type="submit" value="Submit" />
      </form>
    );
  }
}
