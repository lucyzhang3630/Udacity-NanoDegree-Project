# Neighborhood Map Project

This is a Map project build with `ReactJS` and bootstraped with [Create React App](https://github.com/facebookincubator/create-react-app). In the webpage, it will show a map with 5 markers for NJ transit locations. It is registered with a service worker and suitable for devices with different sizes(`Galaxy S5, Ipad and desktop`). You can also filter the markers by using the input area in the side nav.

### Run the app

* install all project dependencies with `npm install`
* run the development version: start the development server with `npm start`
* run the build version with service worker:
1)build the application for production with `npm run build`, the build is minified and also has a service worker working for loading the app with cache.
2)after the build, run `npm install -g serve` and `serve -s build` to run the build version of the app.
3)open your browser, and go to `http://localhost:5000`, the app is running there.


### API used
* Google Map API (For loading the map with markers)
* Foursquare API (For fetching detailed location information showed in the infoWindow)

### How to use
*  After the app is up and running, if you click on the `hamburger icon`, a side nav will pop up, listing the locations corresponding to the markers, you can filter the markers with the input area.
* If you click on the marker, an `info-window` will pop up, showing the location info about the marker.
* If you click on the locations in the side nav, corresponding marker will bounce and the infoWindow for that location will also pop up.
