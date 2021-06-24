import React, { useState } from 'react';

// own-component imports
import TextEditor from '../../../widgets/inputs/textEditor/TextEditor';
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';

// material-ui imports
import {
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";

import './ProfileSettings.css';

function ProfileSettings() {

    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [descriptionErrorText, setDescriptionErrorText] = useState("");
    
    const [usernameError, setUsernameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const { id } = useParams();

    const changeProfile = () => {
        // TODO
    }

    // Verbindung zu TextEditor Komponente um auf den eingegebenen Editor Content 
    // Zugriff zu bekommen.
    const callbackEditorContent = (editorContent) => {
        setDescription(editorContent);
    }

    return (
        <div className="profile-settings-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="profile-settings-section">
                <h2>Profil</h2>
                <TextField
                    label="Benutzername"
                    error={usernameError}
                    helperText={usernameErrorText}
                    inputProps={{ maxLength: 30 }}
                    style={{ width: '270px' }}
                    onChange={(event) => setUsername(event.target.value)}
                    autoFocus />
                <TextEditor
                    contentError={ descriptionError }
                    contentErrorText={ descriptionErrorText }
                    parentCallbackEditorContent={ callbackEditorContent } />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => changeProfile()}>Speichern</Button>
            </div>
        </div>
    )
}

export default ProfileSettings;