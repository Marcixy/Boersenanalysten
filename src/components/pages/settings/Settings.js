import React from 'react';

// own-component imports
import SettingsMenu from '../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';

// third-party imports
import { useParams } from "react-router-dom";

import './Settings.css';

function Settings() {
    const { id } = useParams();

    return (
        <div className="settings">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
        </div>
    )
}

export default Settings;