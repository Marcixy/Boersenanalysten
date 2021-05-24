import React, { useState, useEffect } from 'react';

// own component imports
import Articlelistitem from '../../widgets/outputs/articlelistitem/Articlelistitem';

// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Articlelist.css';

function Articlelist() {
    const [articleData, setArticleData] = useState([]);

    useEffect(() => {
        axios.get('/articlelist')
        .then((response) => {
            const articleData = response.data;
            setArticleData(articleData);
        })
        .catch((error) => {
            console.error("Articledata are not loaded", error);
        });
    }, [])

    const displayArticleData = (articles) => {
        return articles.map((article, index) => (
            <Articlelistitem
                index={index}
                title={article.title}
                voting={article.voting}
                answerCounter={article.answerCounter}
                views={article.views} />
        ));
    }

    return (
        <div className="articlelist-page">
            <div className="articlelist-header">
                <h2>Beiträge</h2>
                <Link to="/createArticle">
                    <Button
                        variant="contained"
                        color="primary">Beitrag erstellen</Button>
                </Link>
            </div>
            <div>
                { displayArticleData(articleData) }
            </div>
        </div>
    )
}

export default Articlelist;