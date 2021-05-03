// material-ui imports
import {
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

import './Register.css';

function Register() {
    return (
        <div className="register-page">
            <div className="register-form">
                <h2>Registrieren</h2>
                <TextField label="E-Mail" />
                <TextField label="Benutzername" />
                <TextField label="Passwort" />
                <Button variant="contained" color="primary">Registrieren</Button>
                <Link to="/login">
                    Zum Login
                </Link>
            </div>
        </div>
    )
}

export default Register;