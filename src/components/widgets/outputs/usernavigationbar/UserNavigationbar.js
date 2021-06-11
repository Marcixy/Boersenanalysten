import React from 'react';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

// third-party imports
import { Link } from "react-router-dom";

import "./UserNavigationbar.css";

function UserNavigationbar(props) {
    return (
        <div className="user-navigationbar">
            <ButtonGroup variant="text" color="primary" >
                <Link to={{pathname: `/userprofile/${props.userid}`}}>
                    <Button>Profil</Button>
                </Link>
                <Link to={{pathname: `/portfolioHistory/${props.userid}`}}>
                    <Button>Portfolio Historie</Button>
                </Link>
                <Link to={{pathname: `/profileSettings/${props.userid}`}}>
                    <Button>Einstellungen</Button>
                </Link>
            </ButtonGroup>
        </div>
    )
}

export default UserNavigationbar;