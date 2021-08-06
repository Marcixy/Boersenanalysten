import React, { useState, useEffect } from 'react';

// own component imports
import Answerlistitem from '../../../widgets/outputs/answerlistitem/Answerlistitem';
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
    const [paginationCount, setPaginationCount] = useState("");
    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        getUserAnswerList(page, page)
        getUserAnswerCount(id).then((answerCountResponse) => {
            setPaginationCount(Math.ceil(answerCountResponse / 10)); 
        }).catch((error) => {
            console.error("Answercount is not loaded", error);
        });
    }, [id])

    const getUserAnswerList = (event, currentPage) => {
        setPage(currentPage);
        getUserAnswers(id).then((answerResponse) => {
            const articlelist = answerResponse;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.error("Article List are not loaded", error);
        });
        window.scrollTo(0, 0);
    }

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
            <Pagination
                paginationCount={ paginationCount }
                page= { page }
                onChange={ getUserAnswerList } />
        </div>
    )
}

export default UserAnswerlist;