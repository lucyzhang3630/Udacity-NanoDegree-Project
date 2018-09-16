import React, { Component } from 'react';
import './App.css';
import Map from './Map'

let allLocations=[]
let allMarkers=[]
class App extends Component {
  state = {
    value:'',
    locations:[],
  }
  openNav() {

    if(document.getElementById("mySidenav")) {
      document.getElementById("mySidenav").style.width = "250px";
    }
  }
  closeNav() {

    if(document.getElementById("mySidenav")) {
      document.getElementById("mySidenav").style.width = "0";
    }

  }
  listLocations(locations) {

    if(locations.length){
      this.setState({locations:locations});
      allLocations = locations;
    }

  }
  getMarkers(markers) {
    allMarkers=markers;
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    let matchedLocations;
    if(event.target.value.length) {
       matchedLocations= this.state.locations.filter(l=>{
        return l.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1
      });
      this.setState({locations:matchedLocations});
    }else{
      //show all locations if the filter is empty
      this.setState({locations:allLocations});
    }
    //if there are matched locations, show the matched marker
    if(matchedLocations&&matchedLocations.length){
      for(let i = 0;i<allMarkers.length;i++){
        if(matchedLocations.includes(allMarkers[i].properties)) {
          allMarkers[i].setVisible(true);
        }else{
          allMarkers[i].setVisible(false);
        }
      }
    }else{
      //if the filter is empty,show all the markers
      for(let j = 0;j<allMarkers.length;j++){
        allMarkers[j].setVisible(true);
      }
    }

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NJ Transit Locations</h1>

          <span className="hamburger-menu" onClick={this.openNav}>&#9776; </span>
          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} className="filter-area" />
                Filter
              </label>
            </form>
            <ul id="locationsList">
              {this.state.locations.map((location,index)=>{
                return (<li key={location} id={location} className={index}>{location}</li>)
              })}
            </ul>
          </div>
        </header>
        <div className="map-container">
          <Map getLocations={this.listLocations.bind(this)} sendMarkers={this.getMarkers.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
