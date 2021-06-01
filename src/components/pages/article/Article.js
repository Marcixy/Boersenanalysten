import React, { useState, useEffect } from 'react';

// own component imports
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';

// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';
import axios from 'axios';

import './Article.css';
import Answerlistitem from '../../widgets/outputs/answerlistitem/Answerlistitem';

function Article() {
    const [articleData, setArticleData] = useState([]);
    const [answerData, setAnswerData] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get('/getArticleById', {
            params: {
                id: id
            }
        })
        .then((response) => {
            const articleData = response.data[0];
            setArticleData(articleData);
            setAnswerData(articleData.answers);
        })
        .catch((error) => {
            console.error("Articledata are not loaded", error);
        });
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
                created={answer.created} />
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
                <p>{articleData.content}</p>
                <p>{articleData.tags}</p>
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