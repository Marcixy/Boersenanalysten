import React, { useState } from 'react';

// own-component imports
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';

// material-ui imports
import {
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';

import './PasswordSettings.css';

function PasswordSettings() {
    // Eingabefelder für Passwort ändern
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

    // Errortext für Passwort ändern
    const [oldPasswordErrorText, setOldPasswordErrorText] = useState("");
    const [newPasswordErrorText, setNewPasswordErrorText] = useState("");
    const [repeatedNewPasswordErrorText, setRepeatedNewPasswordErrorText] = useState("");

    // Error Farbe für Passwort ändern
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [repeatedNewPasswordError, setRepeatedNewPasswordError] = useState(false);

    const { id } = useParams();

    const changePassword = () => {
        const isOldPasswordValid = checkOldPassword();
        const isNewPasswordValid = checkNewPassword();
        const isRepeatedNewPasswordValid = checkRepeatedNewPassword();
        if (isOldPasswordValid === true && isNewPasswordValid === true && isRepeatedNewPasswordValid === true) {
            reauthenticateUser(oldPassword).then(() => {
                const user = firebase.auth().currentUser;
                // TODO async benötigt? Danach testen
                user.updatePassword(newPassword).then(async () => {
                    alert("Passwort wurde erfolgreich aktualisiert.");
                    window.location.reload();
                    console.log("Passwort wurde erfolgreich aktualisiert.");
                }).catch((error) => {
                     console.log(error);
                });
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        setOldPasswordError(true);
                        setOldPasswordErrorText('Falsches Passwort.');
                        break;
                    default:
                        console.log('Unbekannter Fehler bei Passwort Aktualisierung: ' + error);
                        break;
                }
            });
        }
    }

    const reauthenticateUser = (oldPassword) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const checkOldPassword = () => {
        if (oldPassword === "") {
            setOldPasswordError(true);
            setOldPasswordErrorText("Bitte gib ein Passwort ein.");
            return false;
        }
        setOldPasswordError(false);
        setOldPasswordErrorText("");
        return true;
    }

    const checkNewPassword = () => {
        if (newPassword === "") {
            setNewPasswordError(true);
            setNewPasswordErrorText("Bitte gib ein Passwort ein.");
            return false;
        } else if (newPassword !== repeatedNewPassword) {
            setNewPasswordError(true);
            setNewPasswordErrorText("Passwörter stimmen nicht überein.");
            return false;
        }
        setNewPasswordError(false);
        setNewPasswordErrorText("");
        return true;
    }

    const checkRepeatedNewPassword = () => {
        if (repeatedNewPassword === "") {
            setRepeatedNewPasswordError(true);
            setRepeatedNewPasswordErrorText("Bitte gib ein Passwort ein.");
            return false;
        } else if (newPassword !== repeatedNewPassword) {
            setRepeatedNewPasswordError(true);
            setRepeatedNewPasswordErrorText("Passwörter stimmen nicht überein.");
            return false;
        }
        setRepeatedNewPasswordError(false);
        setRepeatedNewPasswordErrorText("");
        return true;
    }

    return (
        <div className="password-settings-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="password-settings-section">
                <h2>Passwort</h2>
                <TextField
                    label="Altes Passwort"
                    type="password"
                    error={oldPasswordError}
                    helperText={oldPasswordErrorText}
                    inputProps={{ maxLength: 40 }}
                    style={{ width: '270px' }}
                    onChange={(event) => setOldPassword(event.target.value)}
                    autoFocus />
                <TextField
                    label="Neues Passwort"
                    type="password"
                    error={newPasswordError}
                    helperText={newPasswordErrorText}
                    inputProps={{ maxLength: 40 }}
                    style={{ width: '270px' }}
                    onChange={(event) => setNewPassword(event.target.value)} />
                <TextField
                    label="Neues Passwort wiederholen"
                    type="password"
                    error={repeatedNewPasswordError}
                    helperText={repeatedNewPasswordErrorText}
                    inputProps={{ maxLength: 40 }}
                    style={{ width: '270px' }}
                    onChange={(event) => setRepeatedNewPassword(event.target.value)} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => changePassword()}>Passwort ändern</Button>
            </div>
        </div>
    )
}

export default PasswordSettings;