import React, { useState, useEffect } from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';

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
            <p>{userData.shareCounter}</p>
            <p>{userData.articleCounter}</p>
            <p>{userData.answerCounter}</p>
            <p>{userData.description}</p>
            <p>{userData.location}</p>
        </div>
    )
}

export default Userprofile;