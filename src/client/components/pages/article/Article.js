import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../widgets/outputs/answerlistitem/Answerlistitem';
import ItemActions from '../../widgets/outputs/itemactions/ItemActions';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import Voting from '../../widgets/inputs/voting/Voting';

// material-ui imports
import {
    Button,
    Chip
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';
import axios from 'axios';

import './Article.css';

function Article() {
    const [articleData, setArticleData] = useState([]);
    const [answerData, setAnswerData] = useState([]);
    const [answerUsernames, setAnswerUsernames] = useState([]);
    const [answerCreatorShareCounters, setAnswerCreatorShareCounters] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const getData = () => {
            axios.get('/getArticleById', {
                params: {
                    id: id
                }
            })
            .then((response) => {
                const articleData = response.data[0];
                setArticleData(articleData);
                setAnswerData(articleData.answers);
                console.log(articleData)
                articleData.answers.map((answer, index) => (
                    axios.get('/getUserById', {
                        params: {
                            _id: answer.creator
                        }
                    })
                    .then((userResponse) => {
                        // TODO Code verbessern!
                        console.log(userResponse.data[0].username);
                        console.log(answer.creator);
                        console.log(index);
                        let answerUsername = [userResponse.data[0].username, ...answerUsernames];
                        let answerCreatorShareCounter = [userResponse.data[0].shareCounter, ...answerCreatorShareCounters];
                        setAnswerUsernames(answerUsername);
                        setAnswerCreatorShareCounters(answerCreatorShareCounter);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                ))
                firebase.auth().onAuthStateChanged(function(user) {
                    console.log("UID:" + user.uid);
                    axios.get('/getUserByFirebaseid', {
                        params: {
                            firebaseid: user.uid
                        }
                    })
                    .then((userResponse) => {
                        console.log("articleData.creator: " + articleData.creator);
                        console.log("userResponse.data[0]._id: " + userResponse.data[0]._id);
                        if (articleData.creator === userResponse.data[0]._id) {
                            setUserIsLoggedIn(true);
                        } else {
                            setUserIsLoggedIn(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
            })
            .catch((error) => {
                console.error("Articledata are not loaded", error);
            });
        }
        getData();
    }, [id])

    const createAnswer = () => {
        axios.get('/getUserByFirebaseid', {
            params: {
                firebaseid: firebase.auth().currentUser.uid
            }
        })
        .then((response) => {
            const userData = response.data[0];
            axios({
                url: `/createAnswer/${articleData._id}`,
                method: 'post',
                data: {
                    content: editorContent,
                    creator: userData._id,
                    voting: 0
                }
            }).catch((error) => {
                console.error("Answer is not successfully created", error);
            })
            console.log("Answer successfully created");
            window.location.reload();
        })
        .catch((error) => {
            console.error("Userdata are not loaded", error);
        })
    }

    const displayAnswerData = (answers) => {
        return answers.map((answer, index) => (
            <Answerlistitem
                content={answer.content}
                voting={answer.voting}
                created={answer.created}
                creator={answerUsernames[index]}
                creatorId={answer.creator}
                creatorShareCounter={answerCreatorShareCounters[index]} />
        ));
    }

    let articleActions;
    if (userIsLoggedIn === true) {
        articleActions = (
            <ItemActions
                deleteDialogTitle="Beitrag löschen"
                deleteDialogText="Wollen Sie den Beitrag wirklich löschen?"
                deleteUrl="deleteArticle"
                id={articleData._id} />
        )
    }

    // Verbindung zu TextEditor Komponente um auf den eingegebenen Editor Content 
    // Zugriff zu bekommen.
    const callbackEditorContent = (editorContent) => {
        setEditorContent(editorContent);
    }

    return (
        <div className="article-page">
            <div className="article-page-content">
                <h1>{articleData.title}</h1>
                <div className="article-content">
                    <Voting
                        articleid={articleData._id}
                        axiosUrl="articleVotingUpdate"
                        voting={articleData.voting} />
                    <div className="article-content-right">
                        <p>{articleData.content}</p>
                        <Chip label={articleData.tags} size="small" color="primary" />
                        { articleActions }
                    </div>
                </div>
                <h2>Antworten:</h2>
                {displayAnswerData(answerData)}
                <h3>Deine Antwort:</h3>
                <TextEditor parentCallbackEditorContent={callbackEditorContent} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createAnswer()}>Antwort erstellen</Button>
            </div>
        </div>
    )
}

export default Article;