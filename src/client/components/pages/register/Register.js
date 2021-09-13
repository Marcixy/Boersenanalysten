import React, { useState } from 'react';

// own-component imports
import { registerUser } from '../../utils/axios/user/UserFunctions';

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

import './Register.css';

function Register() {
    // Eingabefelder für Registrierung
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Errortext für Registrierung
    const [emailErrorText, setEmailErrorText] = useState("");
    const [usernameErrorText, setUsernameErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    // Error Farbe für Registrierung
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toArticlelist = useHistory();

    const registerNewUser = () =>  {
        const isEmailValid = checkEmail();
        const isUsernameValid = checkUsername();
        const isPasswordValid = checkPassword();
        if (isEmailValid === true && isUsernameValid === true && isPasswordValid === true) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                registerUser(email, username).then(() => {
                    console.log("User successfully registered");
                    toArticlelist.push("/articlelist");
                });
            }).catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist bereits registriert.");
                        break;
                    case "auth/invalid-email":
                        setEmailError(true);
                        setEmailErrorText("E-Mail Adresse ist nicht gültig.");
                        break;
                    case "auth/weak-password":
                        setPasswordError(true);
                        setPasswordErrorText("Passwort muss mindestens 6 Zeichen lang sein.");
                        break;
                    default:
                        setEmailError(true);
                        setEmailErrorText("Unbekannter Fehler bei Registrierung ist aufgetreten.");
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
        <div className="register-page">
            <div className="register-form">
                <h2>Registrieren</h2>
                <TextField
                    label="E-Mail"
                    type="email"
                    error={emailError}
                    helperText={emailErrorText}
                    inputProps={{ maxLength: 50 }}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus />
                <TextField
                    label="Benutzername"
                    error={usernameError}
                    helperText={usernameErrorText}
                    inputProps={{ maxLength: 30 }}
                    onChange={(event) => setUsername(event.target.value)} />
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
                <Button
                    id="register-button"
                    variant="contained"
                    color="primary"
                    onClick={() => registerNewUser()}>Registrieren</Button>
                <Link to="/login">
                    Zum Login
                </Link>
            </div>
        </div>
    )
}

export default Register;