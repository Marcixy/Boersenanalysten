import React, { useState } from 'react';

// material-ui imports
import {
    Button,
    TextField,
    IconButton,
    InputAdornment
} from '@material-ui/core';

// material-ui icon imports
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// third-party imports
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

import './Login.css';

function Login() {
    // Eingabefelder für Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Errortext für Login
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    // Error Farbe für Login
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toArticlelist = useHistory();

    const loginUser = () => {
        const isEmailValid = checkEmail();
        const isPasswordValid = checkPassword();
        if (isEmailValid === true && isPasswordValid === true) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                toArticlelist.push("/articlelist");
            }).catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht gültig.");
                        break;
                    case "auth/user-not-found":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht registriert.");
                        break;
                    case "auth/wrong-password":
                        setPasswordError(true);
                        setPasswordErrorText("Passwort ist nicht korrekt.");
                        break;
                    case "auth/weak-password":
                        setPasswordError(true);
                        setPasswordErrorText("Passwort muss mindestens 6 Zeichen lang sein.");
                        break;
                    default:
                        setEmailError(true);
                        setEmailErrorText("Unbekannter Fehler beim Login ist aufgetreten.");
                }
            });
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

    const checkPassword = () => {
        if (password === "") {
            setPasswordError(true);
            setPasswordErrorText("Bitte gib ein Passwort ein.");
            return false;
        }
        setPasswordError(false);
        setPasswordErrorText("");
        return true;
    }

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
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
                    type={showPassword ? "text" : "password"}
                    error={passwordError}
                    helperText={passwordErrorText}
                    inputProps={{ maxLength: 40 }}
                    InputProps={{ endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                style={{color: "white"}}
                                onClick={handleShowPasswordClick}
                                edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }}
                    onChange={(event) => setPassword(event.target.value)} />
                <Link to="/forgotPassword">
                    Passwort vergessen?
                </Link>
                <Button
                    id="login-button"
                    variant="contained"
                    color="primary"
                    onClick={() => loginUser()}>Login</Button>
                <Link to="/register">
                    Zur Registrierung
                </Link>
            </div>
        </div>
    )
}

export default Login;