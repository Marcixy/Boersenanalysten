import React, { useState, useEffect } from 'react';

// own component imports
import ChoiceDialog from '../widgets/dialogs/ChoiceDialog';
import { getUserByFirebaseid } from '../utils/axios/user/UserFunctions';
import { userActions } from '../utils/redux/store/userSlice';
/* eslint-disable no-unused-vars */
import firebaseConfig from '../../../server/firebase/Config';
/* eslint-enable no-unused-vars */

// material-ui imports
import {
    Badge,
    Button,
    IconButton
} from '@material-ui/core';

// material-ui icon imports
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// third-party imports
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';

import './Navigationbar.css';

function Navigationbar() {
    const [userData, setUserData] = useState("");
    const [openLogoutDialog, setLogoutDialogOpen] = useState(false);

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const toHomepage = useHistory();
    const dispatch = useDispatch();

    const handleOpenLogoutDialog = () => {
        setLogoutDialogOpen(true);
    };
    
    const handleCloseLogoutDialog = () => {
        setLogoutDialogOpen(false);
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getUserByFirebaseid().then((userResponse) => {
                    setUserData(userResponse[0]);
                    dispatch(userActions.setUserData({
                        isLoggedIn: true,
                        userid: userResponse[0]._id,
                        email: userResponse[0].email,
                        username: userResponse[0].username,
                        shareCounter: userResponse[0].shareCounter }));
                });
            }
        });
        return () => unsubscribe();
    }, [dispatch])

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            dispatch(userActions.logout());
            toHomepage.push("/");
            setLogoutDialogOpen(false);
            console.log("Benutzer wurde erfolgreich ausgeloggt.");
        }, function(error) {
            console.error("Fehler beim Logout. ", error);
        });
    }

    let RightNavigationbar;
    if (isLoggedIn === true) {
        RightNavigationbar = (
            <div className="user-navigationbar">
                <div className="userinfo-navigationbar">
                    <Link to={{pathname: `/userprofile/${userData?._id}`}}>
                        <span>{userData?.shareCounter} {userData?.username}</span>
                    </Link>
                </div>
                <div className="user-right-navigationbar">
                    <Link to={{pathname: `/userprofile/${userData?._id}`}}>
                        <IconButton variant="contained" size="small"><PersonIcon /></IconButton>
                    </Link>
                    <Link to="/message">
                        <Badge badgeContent={4} color="primary">
                            <MailIcon id="user-right-navigationbar-mail-icon" />
                        </Badge>
                    </Link>
                    <Link to="/help">
                        <IconButton variant="contained" size="small"><LiveHelpIcon /></IconButton>
                    </Link>
                    <IconButton
                        id="logout-button"
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenLogoutDialog()}><ExitToAppIcon /></IconButton>
                    <ChoiceDialog 
                        dialogOpen={ openLogoutDialog }
                        handleCloseDialog={ handleCloseLogoutDialog }
                        title="Ausloggen"
                        content="Wollen Sie sich wirklich ausloggen?"
                        onYesButton={ signOut }
                        onNoButton={ handleCloseLogoutDialog } />
                </div>
            </div>
        )
    } else {
        RightNavigationbar = (
            <div className="visitor-right-navigationbar">
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
                <h1>B??rsenanalysten</h1>
            </Link>
            <nav>
                <ul>
                    <Link to="/blog">
                        <li>Blog</li>
                    </Link>
                    <Link to="/articlelist">
                        <li>Beitr??ge</li>
                    </Link>
                    <Link to="/taglist">
                        <li>Tags</li>
                    </Link>
                </ul>
            </nav>
            { RightNavigationbar }
        </header>
    )
}

export default Navigationbar;