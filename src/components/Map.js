// Map.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyles from '../data/mapStyles';
import * as locations from '../data/locations';
import * as constants from '../data/constants';
import Marker from './Marker';
import Error from "./Error";


class Map extends Component {

    state = {
        error: false,
    };

    componentDidMount() { 
        this.loadMap();
        // handle error, when google map fails to load due to wrong API for example
        window.gm_authFailure = () => this.setState({ error: true });
        if (window.google === undefined) {
          this.setState({ error: true });
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }
    
    loadMap() {

        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const divMapElement = ReactDOM.findDOMNode(mapRef);

            //setup the Map
            const { lat, lng } = constants.neighborhood;
            const center = new maps.LatLng(lat, lng);
            const mapObj = Object.assign({}, {
                center: center,
                zoom: mapStyles.zoom,
                styles: mapStyles.styles,
                mapTypeControl: mapStyles.mapTypeControl
            })
            
            //create map instances            
            this.map = new maps.Map(divMapElement, mapObj);
            //unique instance of Bounds
            this.bounds = new google.maps.LatLngBounds();
            //unique instance of infoWindow
            this.largeInfowindow = new google.maps.InfoWindow();

            //resize the map to make it responsive
            checkSizeWindow(window);
            maps.event.addDomListener(window, 'resize', function(e) {
                checkSizeWindow(e.currentTarget)
            });

            function checkSizeWindow(objWindow){
                if(objWindow.innerWidth < 400) {
                    divMapElement.style.height = 'calc(100vh - 46px)';
                } else {
                    divMapElement.style.height = 'calc(100vh - 53px)';
                }
            }

            //force the update here in order to get this.map filled         
            this.forceUpdate();

        } else {
           console.log('Ops! Google Maps cant be accessed now, please come back later!' )
            let mapContainerElemt = document.querySelector('.map-container');
            mapContainerElemt.innerHTML = '<div class="api-failure-container">' +
                                                '<div class="api-failure">' +
                                                    '<div class="alert-icon"></div>' +
                                                    '<p class="alert-text">Ops! Sorry<br>Google Maps cant be accessed right now,<br>' +
                                                    'please come back later!</p>' +
                                                '</div>' +
                                            '</div>'       
        }
    }


    render = () => {
        
     
        const style = {
            width: '100%',
            height: '100vh'
          }

        const { onChangeMarker } = this.props;
        const noError = !this.state.error;

        return (

            <div>
                {noError ? (
                    <div ref='map' style={style} id ="map" className="main-container" role="application"  aria-label="Map showing places" tabIndex="-1" >
                        Loading map ...
                        {locations.locations.map( (location, index) => (
                            <Marker   
                                key = {index} 
                                google = {this.props.google}
                                map = {this.map}
                                name = {location.name}
                                position ={location.coordinates} 
                                bounds = {this.bounds}
                                largeInfowindow = {this.largeInfowindow}
                                onChangeMarker = {onChangeMarker} 
                                icon = {location.icon}
                                thumbnailSource = {location.thumbnailSource}
                                source = {location.source}
                                wikipedia = {location.wikipedia}
                                wikipediaSource = {location.wikipediaSource}
                                />
                         ))}
                    </div> 
                ) : (
                    <Error />
                )}     
            </div>       
        );
    }
}

export default Map;