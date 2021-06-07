import React, { useState, useEffect } from 'react';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import axios from 'axios';

import './Userprofile.css';

function Userprofile() {
    const [userData, setUserData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get('/getUserById', {
            params: {
                _id: id
            }
        })
        .then((userResponse) => {
            const userData = userResponse.data[0];
            setUserData(userData);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div className="userprofile-page">
            <ButtonGroup color="primary">
                <Button>Profil</Button>
                <Button>Portfolio Historie</Button>
                <Button>Einstellungen</Button>
            </ButtonGroup>
            <h1>Profil</h1>
            <h2>{userData.username}</h2>
            <p>{userData.shareCounter}</p>
            <p>{userData.articleCounter}</p>
            <p>{userData.answerCounter}</p>
            <p>{userData.description}</p>
            <p>{userData.location}</p>
        </div>
    )
}

export default Userprofile;