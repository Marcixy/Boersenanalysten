import React from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';

// material-ui imports
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider
} from '@material-ui/core';

// material-ui icon imports
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';

// third-party imports
import { useParams } from "react-router-dom";

import './Settings.css';

function Settings() {
    const { id } = useParams();

    return (
        <div className="settings-page">
            <UserNavigationbar userid={id} />
            <h2>Einstellungen</h2>
            <List component="nav">
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: "#2D2D2D" }}>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Profil" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: "#2D2D2D" }}>
                            <LockIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Passwort" />
                </ListItem>
                <Divider />
            </List>
        </div>
    )
}

export default Settings;