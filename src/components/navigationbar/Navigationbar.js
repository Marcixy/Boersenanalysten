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
import { Link, useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import axios from 'axios';

import './Navigationbar.css';

function Navigationbar() {
    const [userData, setUserData] = useState("");
    const [openDialog, setDialogOpen] = useState(false);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const toHomepage = useHistory();
    const { id } = useParams();

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                axios.get('/getUserByFirebaseid', {
                    params: {
                        firebaseid: user.uid
                    }
                })
                .then((userResponse) => {
                    setUserData(userResponse.data[0]);
                    setUserIsLoggedIn(true);
                })
                .catch((error) => {
                    console.log(error);
                })
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
                <span>{userData.username}</span>
                <Link to={{pathname: `/userprofile/${userData._id}`}}>
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