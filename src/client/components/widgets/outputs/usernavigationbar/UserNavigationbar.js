import React from 'react';

import store from '../../../utils/redux/store/index';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

// third-party imports
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import "./UserNavigationbar.css";

function UserNavigationbar(props) {
    const userid = useSelector((state) => state.user.userid);
    
    return (
        <div className="user-navigationbar">
            <ButtonGroup variant="text" color="primary">
                <Link to={{pathname: `/userprofile/${props.userid}`}}>
                    <Button>Profil</Button>
                </Link>
                { userid === props.userid && 
                <Link to={{pathname: `/profileSettings/${props.userid}`}} >
                    <Button >Einstellungen</Button>
                </Link> }
            </ButtonGroup>
        </div>
    )
}

export default UserNavigationbar;