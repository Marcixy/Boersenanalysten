import React, { useState, useEffect } from 'react';

// own component imports
import Articlelistitem from '../../../widgets/outputs/articlelistitem/Articlelistitem';
import { getUserArticles } from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserArticlelist.css';

function UserArticlelist(props) {
    const [articlelist, setArticlelist] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getUserArticles(id, props.sortCriteria, props.currentPage).then((articleResponse) => {
            const articlelist = articleResponse;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.error("Article List are not loaded", error);
        });
    }, [id, props.sortCriteria]) 

    const displayArticleData = (articles) => {
        return articles.map((article, index) => (
            <Articlelistitem
                id={article._id}
                index={index}
                title={article.title}
                tags={article.tags}
                voting={article.voting}
                answerCounter={article.answerCounter}
                views={article.views}
                creatorId={article.creator}
                created={article.createdAt} />
        ));
    }

    return (
        <div className="user-articlelist">
            {displayArticleData(articlelist)}
        </div>
    )
}

export default UserArticlelist;

