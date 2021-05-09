import React, { useState } from 'react';

// material-ui imports
import {
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Register.css';

function Register() {
    // Eingabefelder für Registrierung
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Errors für Registrierung
    const [emailErrorText, setEmailErrorText] = useState("");
    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const registerUser = () =>  {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                setEmailError(false);
                setPasswordError(false);
                setEmailErrorText("");
                setPasswordErrorText("");
            }).catch((error) => {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist bereits registriert.");
                        break;
                    case "auth/invalid-email":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht gültig.");
                        break;
                    case "auth/invalid-password":
                        setPasswordError(true);
                        setPasswordErrorText("Passwort muss mindestens 6 Zeichen enthalten.");
                        break;
                    default:
                }
            });
    }

    return (
        <div className="register-page">
            <div className="register-form">
                <h2>Registrieren</h2>
                <TextField
                    label="E-Mail"
                    type="email"
                    error={emailError}
                    helperText={emailErrorText}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus />
                <TextField
                    label="Benutzername"
                    onChange={(event) => setUsername(event.target.value)} />
                <TextField
                    label="Passwort"
                    type="password"
                    error={passwordError}
                    helperText={passwordErrorText}
                    onChange={(event) => setPassword(event.target.value)} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => registerUser()}>Registrieren</Button>
                <Link to="/login">
                    Zum Login
                </Link>
            </div>
        </div>
    )
}

export default Register;