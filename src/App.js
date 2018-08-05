// App.js

import React, { Component } from 'react';
import './css/stylesheet.css';
import { GoogleApiWrapper } from 'google-maps-react'; 
import * as locations from './data/locations';
import MapContainer from './components/MapContainer';
import Filter from './components/Filter';


//error handling - no internet connection 
document.addEventListener("DOMContentLoaded", function(e) {
    let scriptTag = document.getElementsByTagName('SCRIPT').item(1);
    scriptTag.onerror = function(e) {
        console.log('Ops! Google Maps cant be accessed now! Please check your internet connection')
        let mapContainerElement = document.querySelector('#root');
        let errorElement = document.createElement('div');
        errorElement.innerHTML = '<div class="network-failure-container">' +
                                    '<div class="alert-icon"></div>' +
                                    '<div class="api-failure">' +
                                        '<p class="alert-text">Ops! Sorry<br>Google Maps cant be accessed right now,<br>' +
                                        'please check your internet connection!</p>' +
                                    '</div>' +
                                '</div>'  
        mapContainerElement.appendChild(errorElement)
    }
})


class App extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            locationsGoogle: [],
        }
        this.markersGoogle = [];
        this.onChangeMarker = this.onChangeMarker.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
    }

    
    onChangeMarker(marker) {
        this.markersGoogle.push(marker);
        if(this.markersGoogle.length === locations.locations.length) {
            this.setState({locationsGoogle: this.markersGoogle})
        }
    }

    handleQuery(query) {
        let result = this.state.locationsGoogle.map( location => {
            let matched = location.props.name.toLowerCase().indexOf(query) >= 0;
            if (location.marker) {
                location.marker.setVisible(matched);
            }
            return location;
        })
        this.setState({ locationsGoogle: result });   
    }
        

    render = () => {


        return (
            <div className="App">
                <Filter handleQuery = {this.handleQuery} />
                <MapContainer 
                    google = {this.props.google}
                    onChangeMarker = {this.onChangeMarker}
                    locationsGoogle = {this.state.locationsGoogle} 
                />            
            </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCBPNM8bF8FBszM5n5KKbbTonBMxGiJMfQ',
})(App)