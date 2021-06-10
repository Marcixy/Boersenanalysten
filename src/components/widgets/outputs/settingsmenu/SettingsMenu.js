import React from 'react';

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
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// third-party imports
import { Link } from "react-router-dom";

import './SettingsMenu.css';

function SettingsMenu(props) {
    return (
        <div className="settings-menu">
            <h2>Einstellungen</h2>
            <List component="nav">
                <Link to={{pathname: `/profileSettings/${props.userid}`}}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: "#2D2D2D" }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Profil" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to={{pathname: `/emailSettings/${props.userid}`}}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: "#2D2D2D" }}>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="E-Mail" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to={{pathname: `/passwordSettings/${props.userid}`}}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: "#2D2D2D" }}>
                                <LockIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Passwort" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to={{pathname: `/deleteAccount/${props.userid}`}}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: "#2D2D2D" }}>
                                <HighlightOffIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Account löschen" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )
}

export default SettingsMenu;