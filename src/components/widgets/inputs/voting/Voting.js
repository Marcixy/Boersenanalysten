import React, { useState, useEffect } from 'react';

// material-ui icon imports
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// third-party imports
import axios from 'axios';

import './Voting.css';

function Voting(props) {
    const [voting, setVoting] = useState(props.voting);

    useEffect(() => {
        setVoting(props.voting);
    }, [props.voting])

    const upVoting = () => {
        axios({
            url: `/${props.axiosUrl}/${props.articleid}`,
            method: 'post',
        }).then(() => {
            axios.get('/getArticleById', {
                params: {
                    id: props.articleid
                }
            })
            .then((response) => {
                const voting = response.data[0].voting;
                setVoting(voting);
            })
            .catch((error) => {
                console.error("Articledata are not loaded", error);
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    const downVoting = () => {
        console.log("Downvote");
    }
    
    return (
        <div className="voting">
            <button onClick={upVoting}><ArrowDropUpIcon fontSize="large" /></button>
            <p>{voting}</p>
            <button onClick={downVoting}><ArrowDropDownIcon fontSize="large" /></button>
        </div>
    )
}

export default Voting;