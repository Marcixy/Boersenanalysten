// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import firebaseConfig from '../../firebase/Config';

import './Navigationbar.css';

function Navigationbar() {
    const user = firebase.auth().currentUser;
    const toHomepage = useHistory();

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            toHomepage.push("/");
            console.log("Benutzer wurde erfolgreich ausgeloggt.");
        }, function(error) {
            console.error("Fehler beim Logout. ", error);
        });
    }

    let RightNavigationbar;
    if (user !== null) {
        RightNavigationbar = (
            <div className="right-navigationbar">
                <Button variant="contained" color="primary" size="small" onClick={() => signOut()}>Logout</Button>
            </div>
        )
    } else {
        RightNavigationbar = (
            <div className="right-navigationbar">
                <Link to="/login">
                    <Button variant="contained" color="primary" size="small">Login</Button>
                </Link>
                <Link to='/register'>
                    <Button variant="contained" color="primary" size="small">Registrieren</Button>
                </Link>
            </div>
        )
    }

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
            { RightNavigationbar }
        </header>
    )
}

export default Navigationbar;