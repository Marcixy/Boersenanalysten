import React, { useState } from 'react';

// material-ui imports
import {
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

import './ForgotPassword.css';

function ForgotPassword() {
    // Eingabefelder für Passwort zurücksetzen
    const [email, setEmail] = useState("");

    // Errortext für Passwort zurücksetzen
    const [emailErrorText, setEmailErrorText] = useState("");

    // Error Farbe für Passwort zurücksetzen
    const [emailError, setEmailError] = useState(false);

    const toLogin = useHistory();

    const resetPassword = () => {
        const isEmailValid = checkEmail();
        if (isEmailValid === true) {
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("E-Mail zum zurücksetzen des Passworts wurde an " + email + " gesendet.");
                toLogin.push("/login");
            }).catch((error) => {
                switch(error.code) {
                    case "auth/invalid-email":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht gültig.");
                        break;
                    case "auth/user-not-found":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht registriert.");
                        break;
                    default:
                        setEmailError(true);
                        setEmailErrorText("Unbekannter Fehler beim Zurücksetzen des Passworts ist aufgetreten.");
                }
            })
        }
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
        <div className="forgot-password-page">
            <div className="forgot-password-form">
                <h2>Passwort zurücksetzen</h2>
                <TextField
                    label="E-Mail"
                    type="email"
                    error={emailError}
                    helperText={emailErrorText}
                    inputProps={{ maxLength: 50 }}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => resetPassword()}>E-Mail senden</Button>
                <Link to="/login">
                    Zum Login
                </Link>
            </div>
        </div>
    )
}

export default ForgotPassword;