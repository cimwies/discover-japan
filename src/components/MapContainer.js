// MapContainer.js

import React, { Component } from 'react';
import Map from './Map';
import ListFilter from './ListFilter';


export default class MapContainer extends Component {


    render = () => {

        const { google, onChangeMarker, locationsGoogle } = this.props;
   
        return (
            <div className="main-container">
               <ListFilter locationsGoogle={locationsGoogle} />
                <main className="map-container" role="main">
                    <Map 
                        google = {google}
                        onChangeMarker = {onChangeMarker} 
                    /> 
                </main>
            </div>
        );
    }
}