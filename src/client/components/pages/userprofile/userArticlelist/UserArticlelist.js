import React, { useState, useEffect } from 'react';

// own component imports
import Articlelistitem from '../../../widgets/outputs/articlelistitem/Articlelistitem';
import Pagination from '../../../widgets/outputs/pagination/Pagination';
import {
    getUserArticles,
    getUserArticleCount
} from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserArticlelist.css';

function UserArticlelist(props) {
    const [articlelist, setArticlelist] = useState([]);
    const [paginationCount, setPaginationCount] = useState("");
    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        getUserArticleList(page, page);
        getUserArticleCount(id).then((articleCountResponse) => {
            setPaginationCount(Math.ceil(articleCountResponse / 10)); 
        }).catch((error) => {
            console.error("Article count is not loaded", error);
        });
    }, [id, props.sortCriteria]) 

    const getUserArticleList = (event, currentPage) => {
        setPage(currentPage);
        getUserArticles(id, props.sortCriteria, currentPage).then((articleResponse) => {
            const articlelist = articleResponse;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.error("Article List are not loaded", error);
        });
        window.scrollTo(0, 0);
    }

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
            { displayArticleData(articlelist) }
            <Pagination
                paginationCount={ paginationCount }
                page= { page }
                onChange={ getUserArticleList } />
        </div>
    )
}

export default UserArticlelist;

