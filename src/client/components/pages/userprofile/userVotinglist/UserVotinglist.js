import React, { useState, useEffect } from 'react';

// own component imports
import Votinglistitem from '../../../widgets/outputs/votinglistitem/Votinglistitem';

// third-party imports
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './UserVotinglist.css';

function UserVotinglist(props) {
    const [articlelist, setArticlelist] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get('/getUserVotings', {
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
            <Votinglistitem
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
        <div className="user-votinglist">
            {displayArticleData(articlelist)}
        </div>
    )
}

export default UserVotinglist;