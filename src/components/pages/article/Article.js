import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../widgets/outputs/answerlistitem/Answerlistitem';
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
    let [answerCreatorData, setAnswerCreatorData] = useState([]);
    const [editorContent, setEditorContent] = useState("");
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
                articleData.answers.map((answer) => (
                    axios.get('/getUserById', {
                        params: {
                            _id: answer.creator
                        }
                    })
                    .then((userResponse) => {
                        //let newAnswerCreator = userResponse.data[0].username;
                        //console.log(newAnswerCreator);
                        answerCreatorData = [ ...answerCreatorData, userResponse.data[0].username];
                        setAnswerCreatorData(answerCreatorData);
                        console.log(answerCreatorData);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                ))
            })
            .catch((error) => {
                console.error("Articledata are not loaded", error);
            });
        }
        getData();
    }, [])

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
            }).then(() => {
                console.log("Answer successfully created");
                //toArticle.push(`/article/${articleData._id}`);
            }).catch((error) => {
                console.error("Answer is not successfully created", error);
            })
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
                creator={answerCreatorData[index]} />
        ));
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
                    </div>
                </div>
                <h2>Antworten:</h2>
                { displayAnswerData(answerData) }
                <h3>Deine Antwort:</h3>
                <TextEditor parentCallbackEditorContent={ callbackEditorContent } />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createAnswer()}>Antwort erstellen</Button>
            </div>
        </div>
    )
}

export default Article;