import React, { useState, useEffect } from 'react';

// own component imports
import Votinglistitem from '../../../widgets/outputs/votinglistitem/Votinglistitem';
import { getUserVotings } from '../../../utils/axios/user/UserFunctions';

// third-party imports
import { useParams } from 'react-router-dom';

import './UserVotinglist.css';

function UserVotinglist(props) {
    const [articlelist, setArticlelist] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getUserVotings(id).then((votingResponse) => {
            const articlelist = votingResponse;
            setArticlelist(articlelist);
        });
    }, [id]) 

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
            {displayArticleData(articlelist)}
        </div>
    )
}

export default UserVotinglist;