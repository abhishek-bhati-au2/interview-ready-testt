import React, {Component} from 'react';
import './App.css';
import HomeComponent from "./components/home/home.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeComponent/>
      </div>
    );
  }
}

export default App;
