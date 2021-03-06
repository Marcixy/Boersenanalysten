import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../widgets/outputs/answerlistitem/Answerlistitem';
import ItemActions from '../../widgets/outputs/itemactions/ItemActions';
import TagList from '../../widgets/outputs/taglist/Taglist';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import ArticleVoting from '../../widgets/inputs/articleVoting/ArticleVoting';
import Loading from '../../widgets/outputs/loading/Loading';
import Pagination from '../../widgets/outputs/pagination/Pagination';
import { getUserByFirebaseid } from '../../utils/axios/user/UserFunctions';
import { getArticleById } from '../../utils/axios/article/ArticleFunctions';
import {
    getAnswerCreatorNames,
    createAnswer
} from '../../utils/axios/answer/AnswerFunctions';

// material-ui imports
import { Button } from '@material-ui/core';

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
    const [paginationCount, setPaginationCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userid = useSelector(state => state.user.userid);

    const { articleid } = useParams();

    useEffect(() => {
        getArticleById(articleid, currentPage).then((articleResponse) => {
            setArticleData(articleResponse[0]);
            setAnswerData(articleResponse[0].answers);
            setCurrentPage(currentPage);
            setPaginationCount(Math.ceil(articleResponse[0].answerCounter / 10)); 
            getAnswerCreatorNames(articleResponse[0]._id).then((answerCreatorNameResponse) => {
                setAnswerCreatorNames(answerCreatorNameResponse);
            });
            firebase.auth().onAuthStateChanged(function(user) {
                getUserByFirebaseid().then((userResponse) => {
                    if (articleResponse[0].creator === userResponse[0]._id) {
                        setIsArticleCreator(true);
                    } else {
                        setIsArticleCreator(false);
                    }
                    setUserFirebaseid(user.uid);
                });
            });
        });
    }, [articleid, currentPage])

    // TODO getAnswers nur 1x in Article.js implementieren bisher braucht man diese Funktion hier noch f??r den Seitenwechsel
    const getAnswers = (event, currentPage) => {
        setCurrentPage(currentPage);
        getArticleById(articleid, currentPage).then((articleResponse) => {
            setArticleData(articleResponse[0]);
            setAnswerData(articleResponse[0].answers);
            setPaginationCount(Math.ceil(articleResponse[0].answerCounter / 10)); 
            getAnswerCreatorNames(articleResponse[0]._id).then((answerCreatorNameResponse) => {
                setAnswerCreatorNames(answerCreatorNameResponse);
            });
        });
        window.scrollTo(0, 0);
    }

    const createNewAnswer = () => {
        getUserByFirebaseid().then(() => {
            createAnswer(articleid, editorContent, userid);
            window.location.reload();
        });
    }

    const displayAnswerData = (answers) => {
        return answers?.length !== 0 ? answers?.map((answer, index) => (
            <Answerlistitem
                answerid={answer._id}
                articleid={answer.articleid}
                content={answer.content}
                voting={answer.voting}
                created={answer.created}
                creator={answerCreatorNames[index]}
                creatorid={answer.creator}
                voterid={userFirebaseid} />
        )) : <Loading timeout="1000" />
    }

    let articleActions;
    if (isArticleCreator === true) {
        articleActions = (
            <ItemActions
                deleteDialogTitle="Beitrag l??schen"
                deleteDialogText="Wollen Sie den Beitrag wirklich l??schen?"
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
                    <ArticleVoting
                        articleid={articleData?._id}
                        creatorid={articleData?.creator}
                        articleVoting={articleData?.voting}
                        voterid={userFirebaseid} />
                    <div className="article-content-right">
                        <p>{articleData?.content}</p>
                        <TagList tagList={articleData?.tags} />
                        {articleActions}
                    </div>
                </div>
                <h2>Antworten:</h2>
                { displayAnswerData(answerData) }
                <Pagination
                    paginationCount={ paginationCount }
                    page={ currentPage }
                    onChange={ getAnswers } />
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