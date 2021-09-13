import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../widgets/outputs/answerlistitem/Answerlistitem';
import ItemActions from '../../widgets/outputs/itemactions/ItemActions';
import TagList from '../../widgets/outputs/taglist/Taglist';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import Voting from '../../widgets/inputs/voting/Voting';
import { getUserByFirebaseid } from '../../utils/axios/user/UserFunctions';
import { getArticleById } from '../../utils/axios/article/ArticleFunctions';
import {
    getAnswerCreatorNames,
    createAnswer
} from '../../utils/axios/answer/AnswerFunctions';

// material-ui imports
import {
    Button
} from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';

import './Article.css';

function Article() {
    const [articleData, setArticleData] = useState([]);
    const [answerData, setAnswerData] = useState([]);
    const [answerCreatorNames, setAnswerCreatorNames] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const [userFirebaseid, setUserFirebaseid] = useState("");
    const [isArticleCreator, setIsArticleCreator] = useState(false);
    
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const { articleId } = useParams();

    useEffect(() => {
        getArticleById(articleId).then((articleResponse) => {
            setArticleData(articleResponse[0]);
            setAnswerData(articleResponse[0].answers);
            getAnswerCreatorNames(articleResponse[0]._id).then((answerCreatorNameResponse) => {
                setAnswerCreatorNames(answerCreatorNameResponse);
            }).catch((error) => {
                console.log(error);
            });
            firebase.auth().onAuthStateChanged(function(user) {
                getUserByFirebaseid().then((userResponse) => {
                    if (articleResponse[0].creator === userResponse[0]._id) {
                        setIsArticleCreator(true);
                    } else {
                        setIsArticleCreator(false);
                    }
                    setUserFirebaseid(user.uid);
                }).catch((error) => {
                    console.log(error);
                })
            })
        });
    }, [articleId])

    const createNewAnswer = () => {
        getUserByFirebaseid().then((userResponse) => {
            createAnswer(articleId, editorContent, userResponse[0]._id);
            window.location.reload();
        });
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
                creatorid={answer.creator}
                voterid={userFirebaseid} />
        ));
    }

    let articleActions;
    if (isArticleCreator === true) {
        articleActions = (
            <ItemActions
                deleteDialogTitle="Beitrag löschen"
                deleteDialogText="Wollen Sie den Beitrag wirklich löschen?"
                deleteUrl="deleteArticleAndUpdateUser"
                id={articleData?._id} />
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
                <h1>{articleData?.title}</h1>
                <div className="article-content">
                    <Voting
                        articleid={articleData?._id}
                        creatorid={articleData?.creator}
                        updateVotingAxiosUrl="updateArticleVoting"
                        getByIdAxiosUrl="getArticleById"
                        voting={articleData?.voting} 
                        voterid={userFirebaseid} />
                    <div className="article-content-right">
                        <p>{articleData?.content}</p>
                        <TagList tagList={articleData?.tags} />
                        {articleActions}
                    </div>
                </div>
                <h2>Antworten:</h2>
                { displayAnswerData(answerData) }
                { isLoggedIn === true &&
                <div>
                    <h3>Deine Antwort:</h3>
                    <TextEditor parentCallbackEditorContent={callbackEditorContent} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createNewAnswer()}>Antwort erstellen</Button>
                </div> }
            </div>
        </div>
    )
}

export default Article;