import React, { useState, useEffect } from 'react';

import './Userprofile.css';

// third-party imports
import axios from 'axios';

function Userprofile() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('/userprofile')
        .then((response) => {
            const userData = response.data;
            setUserData(userData);
            console.log("Test " + response.data);
        })
        .catch(() => {
            console.error("Benutzerdaten konnten nicht geladen werden");
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