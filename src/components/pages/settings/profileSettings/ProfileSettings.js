import React from 'react';

// own-component imports
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';

// third-party imports
import { useParams } from "react-router-dom";

import './ProfileSettings.css';

function ProfileSettings() {
    const { id } = useParams();

    return (
        <div className="profile-settings-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="password-settings-section">
                <h2>Profil</h2>
            </div>
        </div>
    )
}

export default ProfileSettings;