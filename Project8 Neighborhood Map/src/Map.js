/* eslint-disable no-undef */
import React, { Component } from "react"
var map
let googleMarkers = [];

class transitMap extends Component {
  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const key = 'AIzaSyCEe2KJwjGbTaf4fDLLF0PQDYEIdjpu55E';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    let self = this;

    this.getGoogleMaps().then((google) => {
      const center = { lat: 40.828, lng: -74.101 }
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: center
      });
      self.loadFeatures()
    });
  }

  loadFeatures(){
    let self = this;
    const markers = [
              {lat: 40.761, lng: -74.076},
              {lat: 40.828, lng: -74.101},
              {lat: 40.855, lng: -74.097},
              {lat: 40.866, lng: -74.105},
              {lat: 40.877, lng: -74.103}
            ]
    this.createInfoWindow(markers).then((locations)=>{
      self.props.getLocations(locations);
    });
  }

  createInfoWindow(markers){
    return new Promise((resolve,reject)=>{
      let infoWindow = new google.maps.InfoWindow();
      let self = this;
      let locations = Array(5).fill(0);
      for (let i = 0; i<markers.length;i++) {
        //use Foursquare API to get location information from lat lng information
        let url = `https://api.foursquare.com/v2/venues/search?client_id=LK421X3VDYJDRTOWDIADWFTJA5QF0N4N1S0KG1PC3XNFLXKE&client_secret=KRU2NVFMRKGZ2ULDRWKSIA1QDT2BRRLJA3O1YWFRNOYO5MYF&v=20180323&limit=1&ll=${markers[i].lat},${markers[i].lng}`
        fetch(url).then(response => response.json())
          .then((response)=>{

            let infoContent = response.response.venues[0].name;
            let marker = self.createMarker(markers[i],map,infoContent);
            //make the locations array always have the same order as the markers
            locations[i]=infoContent;
            marker.addListener('click', function(event) {
              infoWindow.setContent(infoContent)
              infoWindow.open(map, this);
              document.getElementById(infoContent).style.backgroundColor="#888";
            })
            google.maps.event.addListener(infoWindow,'closeclick',function(){
              const locationsListElmt = document.getElementsByTagName("LI");
              for(let j = 0;j<locationsListElmt.length;j++) {
                locationsListElmt[j].style.backgroundColor="#111";
              }
            });
            //resolve after the locations are all pushed in order
            if(!locations.includes(0)){
              resolve(locations)
            }
          })
      }
    })

  }
  createMarker(val,map,property) {
    let marker = new google.maps.Marker({
      position: val,
      map:map,
      properties:property
    });
    if(!googleMarkers.includes(marker)){
      googleMarkers.push(marker);
    }
    if(googleMarkers.length===5) {
      this.props.sendMarkers(googleMarkers);
    }
    return marker
  }
  render() {
    return (
      <div>
        <div id="map" style={{height: 'calc(100vh - 70px)'}}></div>
      </div>
    )
  }
}

export default transitMap
