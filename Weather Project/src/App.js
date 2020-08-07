import React from "react";
import "./styles.css";

import Form from "./Form";

let userLocation = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      userLocationexists: false,
    };
    this.resetStorage = this.resetStorage.bind(this);
  }
  resetStorage() {
    localStorage.clear();
    this.setState({userLocationexists: false})
    userLocation = ""
  }
  componentDidMount() {
    userLocation = localStorage.getItem("localLocation");
    if(userLocation !== null)
    {
      this.setState({userLocationexists: true})
      console.log(userLocation)
    }
  }
  
  render() {
    return (
      <div>
        {!this.state.userLocationexists && <Form />}
        <button onClick={this.resetStorage}>Reset</button>
        <h1>Location: {userLocation}</h1>
      </div>
    );
  }
}

export default App;
