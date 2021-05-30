import React, { useState, useEffect } from 'react';

// own component imports
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';

// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { useParams } from "react-router-dom";
import axios from 'axios';

import './Article.css';

function Article() {
    const [articleData, setArticleData] = useState([]);
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
        })
        .catch((error) => {
            console.error("Articledata are not loaded", error);
        });
    }, [id])

    const createAnswer = () => {
        // TODO hier weitermachen
    }

    return (
        <div className="article-page">
            <div className="article-page-content">
                <h1>{articleData.title}</h1>
                <p>{articleData.content}</p>
                <p>{articleData.tags}</p>
                <h2>Antworten:</h2>
                <TextEditor />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createAnswer()}>Antwort erstellen</Button>
            </div>
        </div>
    )
}

export default Article;