import React, { useState, useEffect } from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';
import UserArticlelist from '../../pages/userprofile/userArticlelist/UserArticlelist';

// material-ui imports
import {
    Button,
    ButtonGroup,
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
            <UserNavigationbar userid={id} />
            <h2>Profil</h2>
            <p>{userData.username}</p>
            <p>{userData.shareCounter} Aktienanteile</p>
            <p>{userData.articleCounter} Artikel</p>
            <p>{userData.answerCounter} Antworten</p>
            <p>{userData.description}</p>
            <p>{userData.location}</p>
            <div className="user-articlelist-filter">
                <ButtonGroup variant="text" size="small" color="primary">
                    <Button>Beiträge</Button>
                    <Button>Portfoliobeiträge</Button>
                    <Button>Antworten</Button>
                    <Button>Up Votings</Button>
                    <Button>Down Votings</Button>
                </ButtonGroup>
            </div>
            <UserArticlelist />
        </div>
    )
}

export default Userprofile;