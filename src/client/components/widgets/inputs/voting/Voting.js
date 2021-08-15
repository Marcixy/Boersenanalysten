import React, { useState, useEffect } from 'react';

// material-ui imports
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { updateShareCounter } from '../../../utils/axios/user/UserFunctions';

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

    const updateVoting = (voting, incValue) => {
        updateShareCounter(incValue, props.creatorid);
        axios({
            url: `/${props.updateVotingAxiosUrl}/${props.articleid}`,
            method: 'post',
            params: {
                voting: voting,
                answerid: props.answerid,
                voterid: props.voterid
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
            <Tooltip title="Dieser Beitrag ist hilfreich und verständlich." placement="left" arrow>
                <IconButton onClick={() => updateVoting(1, 10)}>
                    <ArrowDropUpIcon 
                        iconStyle={{width: '56px', height: '56px'}}
                        style={{width: '56px', height: '56px' }} />
                </IconButton>
            </Tooltip>
            <p>{voting}</p>
            <Tooltip title="Dieser Beitrag ist nicht hilfreich und unverständlich." placement="left" arrow>
                <IconButton onClick={() => updateVoting(-1, -3)}>
                    <ArrowDropDownIcon
                        iconStyle={{width: '56px', height: '56px'}}
                        style={{width: '56px', height: '56px' }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default Voting;