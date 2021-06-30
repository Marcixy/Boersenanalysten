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
    const [listType, setListType] = useState("articles");
    const [sortCriteria, setSortCriteria] = useState("createdAt");
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

    const displayList = () => {
        switch (listType) {
            case "articles":
                return <UserArticlelist
                    sortCriteria={sortCriteria} />
            case "answers":
                // TODO
                break;
            case "upVotings":
                // TODO
                break;
            case "downVotings":
                // TODO
                break;
            default:
                console.log("List Type: " + listType + " wird nicht unterstützt.");
        }
    }

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
            <div className="user-articlelist-header">
                <div className="user-articlelist-filter">
                    <ButtonGroup size="small" color="primary">
                        <Button onClick={() => setListType("articles")}>Beiträge</Button>
                        <Button onClick={() => setListType("answers")}>Antworten</Button>
                        <Button onClick={() => setListType("upVotings")}>Up Votings</Button>
                        <Button onClick={() => setListType("downVotings")}>Down Votings</Button>
                    </ButtonGroup>
                </div>
                <div className="user-articlelist-sorting">
                    <ButtonGroup variant="text" size="small" color="primary">
                        <Button onClick={() => setSortCriteria("createdAt")}>Neuste</Button>
                        <Button onClick={() => setSortCriteria("voting")}>Voting</Button>
                        <Button onClick={() => setSortCriteria("answerCounter")}>Antworten</Button>
                    </ButtonGroup>
                </div>
            </div>
            { displayList() }
        </div>
    )
}

export default Userprofile;