// Error.js

import React, { Component } from 'react';


class Error extends Component {

    render = () => {

        return (

            <div>
                <nav className="navbar">
                    <div className="navbar-header">
                        <h1 tabIndex="0" className="site-name">Discover Japan</h1>
                    </div>
                </nav>
                <div className="main-container">
                    <main className="map-container" role="main">
                        <div className="api-failure-container">
                            <div className="api-failure">
                                <p className="alert-text">Sorry, the data could not be loaded.</p>
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