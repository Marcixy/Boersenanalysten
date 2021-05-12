// material-ui imports
import { Button, IconButton } from '@material-ui/core';

// third-party imports
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import firebaseConfig from '../../firebase/Config';

// material-ui icon imports
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
                <IconButton variant="contained" color="primary" size="small"><PersonIcon /></IconButton>
                <IconButton variant="contained" color="primary" size="small"><MessageIcon /></IconButton>
                <IconButton variant="contained" color="primary" size="small"><LiveHelpIcon /></IconButton>
                <IconButton variant="contained" color="primary" size="small" onClick={() => signOut()}><ExitToAppIcon /></IconButton>
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