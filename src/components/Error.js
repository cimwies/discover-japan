// Error.js

import React, { Component } from 'react';


class Error extends Component {

	render = () => {

		return (
		    <div className="api-failure">
			    <p className="alert-text">Sorry, the data could not be loaded.</p>
			    <p className="alert-text">See the JavaScript console for technical details.</p>
		    </div>
		);
	}	
}

export default Error;