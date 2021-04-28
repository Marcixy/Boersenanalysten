// material-ui imports
import { Button } from '@material-ui/core';

import './Navigationbar.css';

function Navigationbar() {
    return (
        <header className="navigationbar">
            <h1>Börsenanalysten</h1>
            <nav>
                <p>Beiträge</p>
            </nav>
            <div className="register-and-login">
                <Button variant="contained" color="primary" size="small">Login</Button>
                <Button variant="contained" color="primary" size="small">Registrieren</Button>
            </div>
        </header>
    )
}

export default Navigationbar;