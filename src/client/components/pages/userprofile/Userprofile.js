import React, { useState, useEffect } from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';
import UserArticlelist from '../../pages/userprofile/userArticlelist/UserArticlelist';
import UserAnswerlist from '../../pages/userprofile/userAnswerlist/UserAnswerlist';
import UserVotinglist from '../../pages/userprofile/userVotinglist/UserVotinglist';
import SortingActions from '../../widgets/outputs/sortingactions/SortingActions';
import { getUserById } from '../../utils/axios/user/UserFunctions';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";

import './Userprofile.css';

function Userprofile() {
    const [userData, setUserData] = useState([]);
    const [listType, setListType] = useState("articles");
    const [sortCriteria, setSortCriteria] = useState("createdAt");
    const { id } = useParams();

    useEffect(() => {
        getUserById(id).then((userResponse) => {
            const userData = userResponse[0];
            setUserData(userData);
        });
    }, [])

    const displayList = () => {
        switch (listType) {
            case "articles":
                return <UserArticlelist
                    sortCriteria={sortCriteria} />
            case "answers":
                return <UserAnswerlist
                    sortCriteria={sortCriteria} />
            case "upVotings":
                return <UserVotinglist
                    sortCriteria={sortCriteria}
                    upOrDownvoting="Upvoting" />
            case "downVotings":
                return <UserVotinglist
                    sortCriteria={sortCriteria}
                    upOrDownvoting="Downvoting" />
            default:
                console.log("List Type: " + listType + " wird nicht unterstützt.");
        }
    }

    // Verbindung zu SortActions Komponente um auf die aktuelle Sortierungs-
    // einstellung Zugriff zu bekommen.
    const callbackSortCriteria = (sortCriteria) => {
        setSortCriteria(sortCriteria);
    }

    return (
        <div className="userprofile-page">
            <UserNavigationbar userid={id} />
            <p>{userData.username}</p>
            <p>Über mich und meine Anlagestrategie:</p>
            <p>{userData.aboutMe}</p>
            <p>{userData.shareCounter} Aktienanteile</p>
            <p>{userData.articleCounter} {userData.articleCounter === 1 ? "Beitrag" : "Beiträge"}</p>
            <p>{userData.answerCounter} Antworten</p>
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
                <SortingActions parentCallbackSortCriteria={callbackSortCriteria} />
            </div>
            { displayList() }
        </div>
    )
}

export default Userprofile;