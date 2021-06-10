import React from 'react';

// own-component imports
import Settings from '../Settings';

import './DeleteAccount.css';

function DeleteAccount() {

    return (
        <div className="delete-account-page">
            <Settings />
            <h2>Account löschen</h2>
        </div>
    )
}

export default DeleteAccount;