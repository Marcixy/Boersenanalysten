import React, { useState, useEffect } from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';
import UserArticlelist from '../../pages/userprofile/userArticlelist/UserArticlelist';
import UserAnswerlist from '../../pages/userprofile/userAnswerlist/UserAnswerlist';
import UserVotinglist from '../../pages/userprofile/userVotinglist/UserVotinglist';
import SortingActions from '../../widgets/outputs/sortingactions/SortingActions';
import { 
    getUserById,
    getUserAnswerCount,
    getUserArticleCount,
    getUserVotingCount
 } from '../../utils/axios/user/UserFunctions';

// material-ui imports
import {
    Button,
    ButtonGroup,
    Tooltip
} from '@material-ui/core';

// material-ui icon imports
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIcon from '@material-ui/icons/Assignment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// third-party imports
import { useParams } from "react-router-dom";

import './Userprofile.css';

function Userprofile() {
    const [userData, setUserData] = useState([]);
    const [userAnswerCount, setUserAnswerCount] = useState(0);
    const [userArticleCount, setUserArticleCount] = useState(0);
    const [upVotingCount, setUpVotingCount] = useState(0);
    const [downVotingCount, setDownVotingCount] = useState(0);
    const [selectedFilterButton, setSelectedFilterButton] = useState(0);
    const [listType, setListType] = useState("articles");
    const [sortCriteria, setSortCriteria] = useState("createdAt");
    const { id } = useParams();

    useEffect(() => {
        getUserById(id).then((userResponse) => {
            const userData = userResponse[0];
            setUserData(userData);
        });
        getUserArticleCount(id).then((articleCountResponse) => {
            setUserArticleCount(articleCountResponse); 
        });
        getUserAnswerCount(id).then((answerCountResponse) => {
            setUserAnswerCount(answerCountResponse); 
        });
        getUserVotingCount(id, "upvotings").then((upVotingCountResponse) => {
            setUpVotingCount(upVotingCountResponse); 
        });
        getUserVotingCount(id, "downvotings").then((downVotingCountResponse) => {
            setDownVotingCount(downVotingCountResponse); 
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

    const onFilterButtonClick = (selectedFilterButton) => {
        switch (selectedFilterButton) {
            case 0:
                setListType("articles");
                setSelectedFilterButton(0);
                break;
            case 1:
                setListType("answers");
                setSelectedFilterButton(1);
                break;
            case 2:
                setListType("upVotings");
                setSelectedFilterButton(2);
                break;
            case 3:
                setListType("downVotings");
                setSelectedFilterButton(3);
                break;
            default:
                console.log("Selected Filter Button: " + selectedFilterButton + " wird nicht unterstützt (0 bis 3).");
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
            <div className="userprofile-overview">
                <div className="userprofile-userinfo">
                    <p>Benutzername: {userData.username}</p>
                    <p>Über mich und meine Anlagestrategie:</p>
                    <p>{userData.aboutMe}</p>
                    <p>{userData.location}</p>
                </div>
                <div className="userprofile-userstats">
                    <p id="userprofile-shareCounter">{userData.shareCounter} {userData.shareCounter === 1 ? "Aktienanteil" : "Aktienanteile"}
                    <Tooltip title="TODO Beschreibung hinzufügen... ." placement="right" arrow>
                        <HelpIcon id="userprofile-help-icon" fontSize="inherit" />
                    </Tooltip>
                    </p>
                    <p><AssignmentIcon />{userArticleCount} {userArticleCount === 1 ? "Beitrag" : "Beiträge"}</p>
                    <p><QuestionAnswerIcon />{userAnswerCount} {userAnswerCount === 1 ? "Antwort" : "Antworten"}</p>
                    <p><ArrowDropUpIcon />{upVotingCount} {upVotingCount === 1 ? "Upvoting" : "Upvotings"}</p>
                    <p><ArrowDropDownIcon />{downVotingCount} {downVotingCount === 1 ? "Downvoting" : "Downvotings"}</p>
                </div>
            </div>
            <div className="user-articlelist-header">
                <div className="user-articlelist-filter">
                    <ButtonGroup size="small" color="primary">
                        <Button color={selectedFilterButton === 0 ? "secondary" : "primary"} onClick={() => onFilterButtonClick(0)}>Beiträge</Button>
                        <Button color={selectedFilterButton === 1 ? "secondary" : "primary"} onClick={() => onFilterButtonClick(1)}>Antworten</Button>
                        <Button color={selectedFilterButton === 2 ? "secondary" : "primary"} onClick={() => onFilterButtonClick(2)}>Up Votings</Button>
                        <Button color={selectedFilterButton === 3 ? "secondary" : "primary"} onClick={() => onFilterButtonClick(3)}>Down Votings</Button>
                    </ButtonGroup>
                </div>
                <SortingActions parentCallbackSortCriteria={callbackSortCriteria} />
            </div>
            { displayList() }
        </div>
    )
}

export default Userprofile;