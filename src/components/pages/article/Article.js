import React, { useState, useEffect } from 'react';

import './Article.css';

// third-party imports
import { useParams } from "react-router-dom";
import axios from 'axios';

function Article() {
    const [articleData, setArticleData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get('/article', {
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
            <h2>Beitrag</h2>
            { articleData.title }
        </div>
    )
}

export default Article;