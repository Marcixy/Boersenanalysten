import React, { useState, useEffect } from 'react';

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

    return (
        <div className="article-page">
            <div className="article-page-content">
                <h1>{articleData.title}</h1>
                <p>{articleData.content}</p>
                <p>{articleData.tags}</p>
            </div>
        </div>
    )
}

export default Article;