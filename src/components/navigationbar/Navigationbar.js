import React, { useState, useEffect } from 'react';

// own component imports
import ChoiceDialog from '../widgets/dialogs/ChoiceDialog';
import firebaseConfig from '../../server/firebase/Config';

// material-ui imports
import { 
    Button,
    IconButton,
} from '@material-ui/core';

// material-ui icon imports
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// third-party imports
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

import './Navigationbar.css';

function Navigationbar() {
    const [openDialog, setDialogOpen] = useState(false);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const toHomepage = useHistory();

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUserIsLoggedIn(true);
            } else {
                setUserIsLoggedIn(false);
            }
        });
    }, [])

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            toHomepage.push("/");
            setDialogOpen(false);
            console.log("Benutzer wurde erfolgreich ausgeloggt.");
        }, function(error) {
            console.error("Fehler beim Logout. ", error);
        });
    }

    let RightNavigationbar;
    if (userIsLoggedIn === true) {
        RightNavigationbar = (
            <div className="visitor-right-navigationbar">
                <Link to="/userprofile">
                    <IconButton variant="contained" size="small"><PersonIcon /></IconButton>
                </Link>
                <Link to="/message">
                    <IconButton variant="contained" size="small"><MessageIcon /></IconButton>
                </Link>
                <Link to="/help">
                    <IconButton variant="contained" size="small"><LiveHelpIcon /></IconButton>
                </Link>
                <IconButton variant="contained" size="small" onClick={() => handleOpenDialog()}><ExitToAppIcon /></IconButton>
                <ChoiceDialog 
                    dialogOpen={ openDialog }
                    handleCloseDialog={ handleCloseDialog }
                    content="Wollen Sie sich wirklich ausloggen?"
                    onYesButton={ signOut }
                    onNoButton={ handleCloseDialog } />
            </div>
        )
    } else {
        RightNavigationbar = (
            <div className="user-right-navigationbar">
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