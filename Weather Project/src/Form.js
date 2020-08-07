import React from "react";
import "./styles.css";

const formstyle = {
  padding: "5px"
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
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input
            style={formstyle}
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </label>
        <input style={formstyle} type="submit" value="Submit" />
      </form>
    );
  }
}
