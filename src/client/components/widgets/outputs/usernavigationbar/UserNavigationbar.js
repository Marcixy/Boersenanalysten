import React, { useState, useEffect } from 'react';

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
    const [displaySettings, setDisplaySettings] = useState("none");
    const userid = useSelector(state => state.user.userid);

    useEffect(() => {
        userid === props.userid ? setDisplaySettings("inline-block") : setDisplaySettings("none");
    }, [userid, props.userid])

    return (
        <div className="user-navigationbar">
            <ButtonGroup variant="text" color="primary">
                <Link to={{pathname: `/userprofile/${props.userid}`}}>
                    <Button>Profil</Button>
                </Link>
                <Link to={{pathname: `/profileSettings/${props.userid}`}} style={{display: displaySettings}}>
                    <Button >Einstellungen { userid } </Button>
                </Link>
            </ButtonGroup>
        </div>
    )
}

export default UserNavigationbar;