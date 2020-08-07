import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      location: ''
      
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetStorage = this.resetStorage.bind(this)
  }
  
  handleSubmit(event) 
  {
    alert('Location: ' + this.state.location)
    localStorage.setItem('localLocation', this.state.location)
    event.preventDefault()
  }
  handleChange(event)
  {
    this.setState({location: event.target.value})
  }
  resetStorage()
  {
    localStorage.clear()
  }
  componentDidMount()
  {
    const location = localStorage.getItem('localLocation')
    console.log(location)
  }
  render(){
  return (
    <div>
    <form onSubmit={this.handleSubmit}>
      <label>
        Location:
        <input type="text" value={this.state.location} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
    
    <button onClick={this.resetStorage}>Reset</button>
    </div>
  );
  }
}

export default App
