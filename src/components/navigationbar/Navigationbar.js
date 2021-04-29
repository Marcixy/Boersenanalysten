// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

import './Navigationbar.css';

function Navigationbar() {
    return (
        <header className="navigationbar">
            <Link to="/">
                <h1>Börsenanalysten</h1>
            </Link>
            <nav>
                <ul>
                    <Link to="/articlelist">
                        <li>Beiträge</li>
                    </Link>
                </ul>
            </nav>
            <div className="register-and-login">
                <Link to="/login">
                    <Button variant="contained" color="primary" size="small">Login</Button>
                </Link>
                <Link to='/register'>
                    <Button variant="contained" color="primary" size="small">Registrieren</Button>
                </Link>
            </div>
        </header>
    )
}

export default Navigationbar;