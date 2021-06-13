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

import './EmailSettings.css';

function EmailSettings() {
    const { id } = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const changeEmail = () => {
        const isEmailValid = checkEmail();
        if (isEmailValid === true) {
            reauthenticateUser(password).then(() => {
                const user = firebase.auth().currentUser;
                console.log(email);
                user.updateEmail(email).then(() => {
                    alert("E-Mail wurde erfolgreich aktualisiert.");
                    window.location.reload();
                    console.log("E-Mail wurde erfolgreich aktualisiert.");
                }).catch((error) => {
                    console.log(error.code);
                    switch(error.code) {
                        case "auth/invalid-email":
                            setEmailError(true);
                            setEmailErrorText("E-Mail Adresse ist nicht gültig.");
                            break;
                        default:
                            setEmailError(true);
                            setEmailErrorText("Unbekannter Fehler bei E-Mail Aktualisierung ist aufgetreten.");
                    }
                });
            }).catch((error) => {

            })
        }
    }

    // TODO in extra Klasse auslagern
    const reauthenticateUser = (oldPassword) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const checkEmail = () => {
        if (email === "") {
            setEmailError(true);
            setEmailErrorText("Bitte gib deine E-Mail Adresse ein.");
            return false;
        }
        setEmailError(false);
        setEmailErrorText("");
        return true;
    }

    return (
        <div className="email-settings-page">
            <UserNavigationbar userid={id} />
            <SettingsMenu userid={id} />
            <div className="password-settings-section">
                <h2>E-Mail</h2>
                <TextField
                    label="E-Mail"
                    type="email"
                    error={emailError}
                    helperText={emailErrorText}
                    inputProps={{ maxLength: 50 }}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus />
                <TextField
                    label="Passwort"
                    type="password"
                    error={passwordError}
                    helperText={passwordErrorText}
                    inputProps={{ maxLength: 40 }}
                    style={{ width: '270px' }}
                    onChange={(event) => setPassword(event.target.value)} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => changeEmail()}>Speichern</Button>
            </div>
        </div>
    )
}

export default EmailSettings;