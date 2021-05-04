// material-ui imports
import {
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

import './Login.css';

function Login() {
    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                <TextField label="E-Mail" />
                <TextField label="Passwort" />
                <Button variant="contained" color="primary">Login</Button>
                <Link to="/register">
                    Zur Registrierung
                </Link>
            </div>
        </div>
    )
}

export default Login;