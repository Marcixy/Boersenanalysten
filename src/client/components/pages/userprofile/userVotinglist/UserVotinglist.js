import React, { useState, useEffect } from 'react';

// own component imports
import Votinglistitem from '../../../widgets/outputs/votinglistitem/Votinglistitem';
import Pagination from '../../../widgets/outputs/pagination/Pagination';
import { 
    getUserVotings,
    getUserVotingCount
} from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserVotinglist.css';

function UserVotinglist(props) {
    const [articlelist, setArticlelist] = useState([]);
    const [paginationCount, setPaginationCount] = useState("");
    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        getUserVotingList(page, page);
        getUserVotingCount(id, "upvotings").then((votingCountResponse) => {
            setPaginationCount(Math.ceil(votingCountResponse / 10));
        });
        /*getUserVotingCount(id, "downvotings").then((votingCountResponse) => {
            setPaginationCount(Math.ceil(votingCountResponse / 10)); 
        });*/
    }, [id, props.upOrDownvoting, page])

    const getUserVotingList = (event, currentPage) => {
        setPage(currentPage);
        getUserVotings(id, currentPage, props.upOrDownvoting).then((votingResponse) => {
            const articlelist = votingResponse;
            setArticlelist(articlelist);
        }).catch((error) => {
            console.error("Voting List are not loaded", error);
        });
        window.scrollTo(0, 0);
    }

    const displayArticleData = (articles) => {
        return articles.map((article, index) => (
            <Votinglistitem
                id={article._id}
                index={index}
                title={article.title}
                upOrDownvoting={props.upOrDownvoting} />
        ));
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