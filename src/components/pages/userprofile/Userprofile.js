import React, { useState, useEffect } from 'react';

// third-party imports
import axios from 'axios';

import './Userprofile.css';

function Userprofile() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('/getUserprofiles')
        .then((response) => {
            const userData = response.data;
            setUserData(userData);
        })
        .catch((error) => {
            console.error("Userdata are not loaded", error);
        })
    }, [])

    const displayUserData = (users) => {
        return users.map((user, index) => (
            <div key={index}>
                <h3>{user.username}</h3>
            </div>
        ));
    }

    return (
        <div className="userprofile-page">
            <h2>Profil</h2>
            { displayUserData(userData) }
        </div>
    )
}

export default Userprofile;