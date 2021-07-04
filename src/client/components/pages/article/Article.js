import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../widgets/outputs/answerlistitem/Answerlistitem';
import ItemActions from '../../widgets/outputs/itemactions/ItemActions';
import TagList from '../../widgets/outputs/taglist/Taglist';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import Voting from '../../widgets/inputs/voting/Voting';

// material-ui imports
import {
    Button
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';
import axios from 'axios';

import './Article.css';

function Article() {
    const [articleData, setArticleData] = useState([]);
    const [answerData, setAnswerData] = useState([]);
    const [answerCreatorNames, setAnswerCreatorNames] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const [isArticleCreator, setIsArticleCreator] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const getData = () => {
            axios.get('/getArticleById', {
                params: {
                    articleid: id
                }
            }).then((articleResponse) => {
                const articleData = articleResponse.data[0];
                setArticleData(articleData);
                setAnswerData(articleData.answers);
                axios.get('/getAnswerCreatorNames', {
                    params: {
                        id: articleData._id
                    }
                }).then((response) => {
                    setAnswerCreatorNames(response.data);
                }).catch((error) => {
                    console.log(error);
                });
                firebase.auth().onAuthStateChanged(function(user) {
                    axios.get('/getUserByFirebaseid', {
                        params: {
                            firebaseid: user.uid
                        }
                    }).then((userResponse) => {
                        if (articleData.creator === userResponse.data[0]._id) {
                            setIsArticleCreator(true);
                        } else {
                            setIsArticleCreator(false);
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                })
            }).catch((error) => {
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
        }).then((userResponse) => {
            axios({
                url: `/createAnswer/${articleData._id}`,
                method: 'post',
                data: {
                    content: editorContent,
                    creator: userResponse.data[0]._id,
                    articleid: articleData._id
                }
            }).then(() => {
                console.log("Answer successfully created");
            }).catch((error) => {
                console.error("Answer is not successfully created", error);
            })
            window.location.reload();
        }).catch((error) => {
            console.error("Userdata are not loaded", error);
        })
    }

    const displayAnswerData = (answers) => {
        return answers.map((answer, index) => (
            <Answerlistitem
                answerid={answer._id}
                articleid={answer.articleid}
                content={answer.content}
                voting={answer.voting}
                created={answer.created}
                creator={answerCreatorNames[index]}
                creatorId={answer.creator} />
        ));
    }

    let articleActions;
    if (isArticleCreator === true) {
        articleActions = (
            <ItemActions
                deleteDialogTitle="Beitrag löschen"
                deleteDialogText="Wollen Sie den Beitrag wirklich löschen?"
                deleteUrl="deleteArticleAndUpdateUser"
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
                        axiosUrl="updateArticleVoting"
                        getByIdAxiosUrl="getArticleById"
                        voting={articleData.voting} />
                    <div className="article-content-right">
                        <p>{articleData.content}</p>
                        <TagList tagList={articleData.tags} />
                        {articleActions}
                    </div>
                </div>
                <h2>Antworten:</h2>
                { displayAnswerData(answerData) }
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