import React from 'react';

// own-component imports
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';

// third-party imports
import { useParams } from "react-router-dom";

import './PasswordSettings.css';

function PasswordSettings() {
    const { id } = useParams();

    return (
        <div className="password-settings-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="password-settings-section">
                <h2>Passwort</h2>
            </div>
        </div>
    )
}

export default PasswordSettings;