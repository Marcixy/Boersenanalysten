import React from 'react';

// own-component imports
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';

// third-party imports
import { useParams } from "react-router-dom";

import './DeleteAccount.css';

function DeleteAccount() {
    const { id } = useParams();

    return (
        <div className="delete-account-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="password-settings-section">
                <h2>Account löschen</h2>
                <p>TODO</p>
            </div>
        </div>
    )
}

export default DeleteAccount;