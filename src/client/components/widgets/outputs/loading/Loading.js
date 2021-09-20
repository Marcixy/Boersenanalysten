import React from 'react';

// third-party imports
import Loader from "react-loader-spinner";

import './Loading.css';

function Loading({ timeout = 5000 }) {
    return (
        <div className="loading">
            <Loader
                type="ThreeDots"
                color="#303F9F"
                height={56}
                width={56}
                timeout={timeout} />
        </div>
    )
}

export default Loading;