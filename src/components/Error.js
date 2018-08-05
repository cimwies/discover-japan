// Error.js

import React, { Component } from 'react';


class Error extends Component {

    render = () => {

        return (

            <div>
                <div className="main-container">
                    <main className="map-container" role="main">
                        <div className="api-failure-container">
                            <div className="api-failure">
                                <div className="alert-icon">
                                </div>
                                <p className="alert-text">Sorry, the Google API data could not be loaded.</p>
                                <p className="alert-text">See the JavaScript console for technical details.</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Error;