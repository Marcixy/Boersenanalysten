import React from 'react';

// own-component imports
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';

// third-party imports
import { useParams } from "react-router-dom";

import './EmailSettings.css';

function EmailSettings() {
    const { id } = useParams();

    return (
        <div className="email-settings-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="password-settings-section">
                <h2>E-Mail</h2>
            </div>
            
        </div>
    )
}

export default EmailSettings;