import React, { useState, useEffect } from 'react';

// own component imports
import Votinglistitem from '../../../widgets/outputs/votinglistitem/Votinglistitem';
import Pagination from '../../../widgets/outputs/pagination/Pagination';
import Loading from '../../../widgets/outputs/loading/Loading';
import { 
    getUserVotings,
    getUserVotingCount
} from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserVotinglist.css';

function UserVotinglist(props) {
    const [articlelist, setArticlelist] = useState([]);
    const [paginationCount, setPaginationCount] = useState(0);
    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        getUserVotingList(page, page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        setPage(1);
        getUserVotingList(page, 1);
        if (props.upOrDownvoting === "Upvoting") {
            getUserVotingCount(id, "upvotings").then((votingCountResponse) => {
                setPaginationCount(Math.ceil(votingCountResponse / 10));
            });
        } else if (props.upOrDownvoting === "Downvoting") {
            getUserVotingCount(id, "downvotings").then((votingCountResponse) => {
                setPaginationCount(Math.ceil(votingCountResponse / 10)); 
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, props.upOrDownvoting])

    const getUserVotingList = (event, currentPage) => {
        setPage(currentPage);
        getUserVotings(id, currentPage, props.upOrDownvoting).then((votingResponse) => {
            const articlelist = votingResponse;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.error("Voting List are not loaded", error);
        });
    }

    const displayArticleData = (articles) => {
        return articles.length !== 0 ? articles.map((article, index) => (
            <Votinglistitem
                id={article._id}
                index={index}
                title={article.title}
                articleType={article.articleType}
                upOrDownvoting={props.upOrDownvoting} />
        )) : <Loading />
    }

    return (
        <div className="user-votinglist">
            { displayArticleData(articlelist) }
            <Pagination
                paginationCount={ paginationCount }
                page= { page }
                onChange={ getUserVotingList } />
        </div>
    )
}

export default UserVotinglist;