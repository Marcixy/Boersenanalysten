import React, { useState, useEffect } from 'react';

import './Userprofile.css';

// third party imports
import axios from 'axios';

function Userprofile() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        axios.get('/userprofile')
            .then((response) => {
                const data = response.data;
                setUserData(data);
                console.log("Benutzer Daten wurden geladen.");
            })
            .catch(() => {
                console.log("Benutzer Daten konnten nicht geladen werden.");
            });
    }

    return (
        <div className="userprofile-page">
            <h2>Profil</h2>
            <button>Verbinden zur MongoDB</button>
        </div>
    )
}

export default Userprofile;