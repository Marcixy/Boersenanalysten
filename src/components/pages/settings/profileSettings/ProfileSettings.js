import React from 'react';

// own-component imports
import Settings from '../Settings';

import './ProfileSettings.css';

function ProfileSettings() {

    return (
        <div className="profile-settings-page">
            <Settings />
            <h2>Profil</h2>
        </div>
    )
}

export default ProfileSettings;