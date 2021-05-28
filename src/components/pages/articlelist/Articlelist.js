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
    const [creatorData, setCreatorData] = useState("");

    useEffect(() => {
        axios.get('/getArticlelist')
        .then((response) => {
            const articleData = response.data;
            setArticleData(articleData);
            axios.get('/getUserById', {
                params: {
                    _id: articleData[0].creator
                }
            })
            .then((userResponse) => {
                const creatorData = userResponse.data[0];
                setCreatorData(creatorData);
            })
        })
        .catch((error) => {
            console.error("Articledata are not loaded", error);
        });
    }, [])

    const displayArticleData = (articles) => {
        return articles.map((article, index) => (
            <Articlelistitem
                id={article._id}
                index={index}
                title={article.title}
                voting={article.voting}
                answerCounter={article.answerCounter}
                views={article.views}
                creator={creatorData.username}
                creatorId={creatorData._id}
                creatorShareCount={creatorData.shareCounter}
                created={article.created} />
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