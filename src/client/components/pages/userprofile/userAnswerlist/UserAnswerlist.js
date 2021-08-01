import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../../widgets/outputs/answerlistitem/Answerlistitem';
import { getUserAnswers } from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserAnswerlist.css';

function UserAnswerlist(props) {
    const [articlelist, setArticlelist] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getUserAnswers(id).then((answerResponse) => {
            const articlelist = answerResponse;
            setArticlelist(articlelist);
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