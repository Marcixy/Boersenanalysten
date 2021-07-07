import React, { useState, useEffect } from 'react';

// material-ui imports
import { IconButton } from '@material-ui/core';

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

    const updateVoting = (voting) => {
        axios({
            url: `/${props.updateVotingAxiosUrl}/${props.articleid}`,
            method: 'post',
            params: {
                voting: voting,
                answerid: props.answerid
            }
        }).then(() => {
            axios.get(`/${props.getByIdAxiosUrl}`, {
                params: {
                    articleid: props.articleid,
                    answerid: props.answerid
                }
            }).then((response) => {
                let voting = "";
                if (props.answerid === undefined) {
                    voting = response.data[0].voting;
                } else {
                    voting = response.data.voting;
                }
                setVoting(voting);
            }).catch((error) => {
                console.error("Data are not loaded. " + error);
            });
        }).catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div className="voting">
            <IconButton onClick={() => updateVoting(1)}>
                <ArrowDropUpIcon 
                    iconStyle={{width: '56px', height: '56px'}}
                    style={{width: '56px', height: '56px' }} />
            </IconButton>
            <p>{voting}</p>
            <IconButton onClick={() => updateVoting(-1)}>
                <ArrowDropDownIcon
                    iconStyle={{width: '56px', height: '56px'}}
                    style={{width: '56px', height: '56px' }} />
            </IconButton>
        </div>
    )
}

export default Voting;