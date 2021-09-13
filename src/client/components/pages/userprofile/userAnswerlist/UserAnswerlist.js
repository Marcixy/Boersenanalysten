import React, { useState, useEffect } from 'react';

// own component imports
import Useranswerlistitem from '../../../widgets/outputs/useranswerlistitem/Useranswerlistitem';
import Pagination from '../../../widgets/outputs/pagination/Pagination';
import {
    getUserAnswers,
    getUserAnswerCount
} from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserAnswerlist.css';

function UserAnswerlist(props) {
    const [articlelist, setArticlelist] = useState([]);
    const [paginationCount, setPaginationCount] = useState(0);
    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        getUserAnswerList(page, page)
        getUserAnswerCount(id).then((answerCountResponse) => {
            setPaginationCount(Math.ceil(answerCountResponse / 10)); 
        }).catch((error) => {
            console.error("Answercount is not loaded", error);
        });
    }, [id, page, props.sortCriteria])

    const getUserAnswerList = (event, currentPage) => {
        setPage(currentPage);
        getUserAnswers(id, props.sortCriteria, currentPage).then((answerResponse) => {
            const articlelist = answerResponse;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.error("Article List are not loaded", error);
        });
        window.scrollTo(0, 0);
    }

    const displayArticleData = (articles) => {
        return articles.length !== 0 ? articles.map((article, index) => (
            <Useranswerlistitem
                id={article._id}
                index={index}
                title={article.title}
                articleType={article.articleType}
                tags={article.tags}
                voting={article.voting}
                creatorId={article.creator}
                created={article.createdAt} />
        )) : <p>Noch keine Antworten vorhanden.</p>;
    }

    return (
        <div className="user-answerlist">
            {displayArticleData(articlelist)}
            <Pagination
                paginationCount={ paginationCount }
                page= { page }
                onChange={ getUserAnswerList } />
        </div>
    )
}

export default UserAnswerlist;