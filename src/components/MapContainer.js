// MapContainer.js

import React, { Component } from 'react';
import Map from './Map';
import ListFilter from './ListFilter';
import Error from "./Error";


export default class MapContainer extends Component {


    state = {
        error: false,
    };

  componentDidMount() {
    // handle error, when google map fails to load
        window.gm_authFailure = () => this.setState({ error: true });
        if (window.google === undefined) {
            this.setState({ error: true });
        }
    }    
    

    render = () => {

        const noError = !this.state.error;
        const { google, onChangeMarker, locationsGoogle } = this.props;
   
        return (
            <div className="main-container">
            
                {noError ? (
                    <div>
                    <ListFilter locationsGoogle={locationsGoogle} />
                    <main className="map-container" role="main">
                        <Map 
                            google = {google}
                            onChangeMarker = {onChangeMarker} 
                        /> 
                     </main>
                     </div>

                    ) : (
                    <Error />
                )}

            </div>
        );
    }
}