# Neighborhood Map Project

This is a Map project build with `ReactJS` and bootstraped with [Create React App](https://github.com/facebookincubator/create-react-app). In the webpage, it will show a map with 5 markers for NJ transit locations. It is registered with a service worker and suitable for devices with different sizes(`Galaxy S5, Ipad and desktop`). You can also filter the markers by using the input area in the side nav.

### To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

### API used
* Google Map API (For loading the map with markers and info-window)
* Foursquare API (For fetching detailed location information)

### How to use
*  After the app is up and running, if you click on the `hamburger icon`, a side nav will pop up, listing the locations corresponding to the markers, you can filter the markers with the input area.
* If you click on the marker, an `info-window` will pop up, showing the location info about the marker.
