import React, { useState, useEffect } from 'react';

// material-ui icon imports
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// third-party imports
import axios from 'axios';

import './ArticleVoting.css';

function ArticleVoting(props) {
    const [articleVoting, setArticleVoting] = useState(props.voting);

    useEffect(() => {
        setArticleVoting(props.voting);
        console.log("Test");
    }, [props.voting])

    const upVoting = () => {
        console.log("Test 2");
        axios({
            url: `/articleVotingUpdate/${props.articleid}`,
            method: 'post',
        })
        axios.get('/getArticleById', {
            params: {
                id: props.articleid
            }
        })
        .then((response) => {
            const articleVoting = response.data[0].voting;
            setArticleVoting(articleVoting);
        })
        .catch((error) => {
            console.error("Articledata are not loaded", error);
        });
    }

    const downVoting = () => {
        console.log("Downvote");
    }
    
    return (
        <div className="voting">
            <button onClick={upVoting}><ArrowDropUpIcon /></button>
            <p>{articleVoting}</p>
            <button onClick={downVoting}><ArrowDropDownIcon /></button>
        </div>
    )
}

export default ArticleVoting;