import React, { useState, useEffect } from 'react';

// own-component imports
import SettingsMenu from '../../../widgets/outputs/settingsmenu/SettingsMenu';
import UserNavigationbar from '../../../widgets/outputs/usernavigationbar/UserNavigationbar';
import { getUserById, updateEmail } from '../../../utils/axios/user/UserFunctions';

// material-ui imports
import {
    Button,
    Snackbar,
    TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// third-party imports
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';

import './EmailSettings.css';

function EmailSettings() {
    const { userid } = useParams();

    // Eingabefelder für E-Mail ändern
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     // Errortext für E-Mail ändern
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    // Error Farbe für E-Mail ändern
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const showSnackbar = () => { setOpenSnackbar(true); };
    const handleClose = () => { setOpenSnackbar(false); };

    useEffect(() => {
        getUserById(userid).then((userResponse) => {
            setEmail(userResponse[0].email);
        });
    }, [userid])

    const changeEmail = () => {
        const isEmailValid = checkEmail();
        const isPasswordValid = checkPassword();
        if (isEmailValid === true && isPasswordValid === true) {
            reauthenticateUser(password).then(() => {
                const user = firebase.auth().currentUser;
                updateEmail(userid, email).then(() => {
                    user.updateEmail(email).then(() => {
                        showSnackbar();
                        setTimeout(function() { window.location.reload(); }, 2000);
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            }).catch((error) => {
                console.log(error.code);
                switch(error.code) {
                    case "auth/invalid-email":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht gültig.");
                        break;
                    case 'auth/wrong-password':
                        setPasswordError(true);
                        setPasswordErrorText('Falsches Passwort.');
                        break;
                    default:
                        setEmailError(true);
                        setEmailErrorText("Unbekannter Fehler bei E-Mail Aktualisierung ist aufgetreten.");
                }
            });
        }
    }

    // TODO in extra Klasse auslagern
    const reauthenticateUser = (password) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, password);
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

    const checkPassword = () => {
        if (password === "") {
            setPasswordError(true);
            setPasswordErrorText("Bitte gib dein Passwort ein.");
            return false;
        }
        setPasswordError(false);
        setPasswordErrorText("");
        return true;
    }

    return (
        <div className="email-settings-page">
            <UserNavigationbar userid={userid} />
            <SettingsMenu userid={userid} />
            <div className="password-settings-section">
                <h2>E-Mail</h2>
                <TextField
                    label="E-Mail"
                    type="email"
                    error={emailError}
                    helperText={emailErrorText}
                    inputProps={{ maxLength: 50 }}
                    style={{ width: '270px' }}
                    placeholder={email}
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
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleClose}>
                    <Alert 
                        severity="success"
                        onClose={() => handleClose()}
                        style={{backgroundColor: '#4D9A51', color: 'white'}}>Email wurde erfolgreich aktualisiert.</Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default EmailSettings;