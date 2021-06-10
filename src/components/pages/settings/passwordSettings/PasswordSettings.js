import React from 'react';

// own-component imports
import Settings from '../Settings';

import './PasswordSettings.css';

function PasswordSettings() {

    return (
        <div className="password-settings-page">
            <Settings />
            <h2>Passwort</h2>
        </div>
    )
}

export default PasswordSettings;