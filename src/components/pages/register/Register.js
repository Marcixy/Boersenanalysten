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

    const registerUser = () =>  {
        console.log('Test');
        firebase.auth().createUserWithEmailAndPassword('Marcel.Geirhos@gmail.com', '123456');
    }

    return (
        <div className="register-page">
            <div className="register-form">
                <h2>Registrieren</h2>
                <TextField label="E-Mail" />
                <TextField label="Benutzername" />
                <TextField label="Passwort" />
                <Button variant="contained" color="primary" onClick={() => registerUser()}>Registrieren</Button>
                <Link to="/login">
                    Zum Login
                </Link>
            </div>
        </div>
    )
}

export default Register;