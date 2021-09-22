import React, { useState, useEffect } from 'react';

// own-component imports
import TextEditor from '../../../widgets/inputs/textEditor/TextEditor';
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';
import { getUserById, updateProfile } from '../../../utils/axios/user/UserFunctions';

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
    const [aboutMe, setAboutMe] = useState("");

    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [aboutMeErrorText, setAboutMeErrorText] = useState("");
    
    const [usernameError, setUsernameError] = useState(false);
    const [aboutMeError, setAboutMeError] = useState(false);

    const { userid } = useParams();

    useEffect(() => {
        getUserById(userid).then((userResponse) => {
            setUsername(userResponse[0].username);
            setAboutMe(userResponse[0].aboutMe);
        });
    }, [userid])

    const changeProfile = () => {
        const isUsernameValid = checkUsername();
        const isAboutMeValid = checkAboutMe();
        if (isUsernameValid === true && isAboutMeValid === true) {
            updateProfile(userid, username, aboutMe).then(() => {
                window.location.reload();
            });
        }
    }

    const checkUsername = () => {
        if (username === "") {
            setUsernameError(true);
            setUsernameErrorText("Bitte gib einen Benutzername ein.");
            return false;
        } else if (username.length < 5) {
            setUsernameError(true);
            setUsernameErrorText("Der Benutzername muss mindestens 5 Zeichen lang sein.");
            return false;
        }
        setUsernameError(false);
        setUsernameErrorText("");
        return true;
    }

    const checkAboutMe = () => {
        if (aboutMe.length > 500) {
            setAboutMeError(true);
            setAboutMeErrorText("Über mich darf maximal 500 Zeichen lang sein.");
            return false;
        }
        setAboutMeError(false);
        setAboutMeErrorText("");
        return true;
    }

    // Verbindung zu TextEditor Komponente um auf den eingegebenen Editor Content 
    // Zugriff zu bekommen.
    const callbackEditorContent = (editorContent) => {
        setAboutMe(editorContent);
    }

    return (
        <div className="profile-settings-page">
            <UserNavigationbar userid={userid} />
            <SettingsMenu userid={userid} />
            <div className="profile-settings-section">
                <h2>Profil</h2>
                <TextField
                    label="Benutzername"
                    error={usernameError}
                    helperText={usernameErrorText}
                    inputProps={{ maxLength: 30 }}
                    style={{ width: '270px' }}
                    placeholder={username}
                    onChange={(event) => setUsername(event.target.value)} 
                    autoFocus/>
                <TextEditor
                    editorText={ aboutMe }
                    contentError={ aboutMeError }
                    contentErrorText={ aboutMeErrorText }
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