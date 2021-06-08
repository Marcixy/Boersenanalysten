import React from 'react';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

// third-party imports
import { Link } from "react-router-dom";

function UserNavigationbar() {
    return (
        <ButtonGroup variant="text" color="primary">
            <Link to="/userprofile">
                <Button>Profil</Button>
            </Link>
            <Link to="/portfolioHistory">
                <Button>Portfolio Historie</Button>
            </Link>
            <Link to="/settings">
                <Button>Einstellungen</Button>
            </Link>
        </ButtonGroup>
    )
}

export default UserNavigationbar;