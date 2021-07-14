import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../../widgets/outputs/answerlistitem/Answerlistitem';

// third-party imports
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './UserAnswerlist.css';

function UserAnswerlist(props) {
    const [articlelist, setArticlelist] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get('/getUserAnswers', {
            params: {
                _id: id
            }
        }).then((response) => {
            const articlelist = response.data;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]) 

    const displayArticleData = (articles) => {
        return articles.map((article, index) => (
            <Answerlistitem
                id={article._id}
                index={index}
                title={article.title}
                tags={article.tags}
                voting={article.voting}
                creatorId={article.creator}
                created={article.createdAt} />
        ));
    }

    return (
        <div className="user-answerlist">
            {displayArticleData(articlelist)}
        </div>
    )
}

export default UserAnswerlist;