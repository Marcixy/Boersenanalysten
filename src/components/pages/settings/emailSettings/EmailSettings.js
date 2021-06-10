import React from 'react';

// own-component imports
import Settings from '../Settings';

import './EmailSettings.css';

function EmailSettings() {

    return (
        <div className="email-settings-page">
            <Settings />
            <h2>E-Mail</h2>
        </div>
    )
}

export default EmailSettings;