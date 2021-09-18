import React, { useState, useEffect } from 'react';

// own component imports
import { isAnswerVotedFromUser } from '../../../utils/axios/user/UserFunctions';

// material-ui imports
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { updateShareCounter } from '../../../utils/axios/user/UserFunctions';
import { getAnswerById, updateAnswerVoting } from '../../../utils/axios/answer/AnswerFunctions';

// material-ui icon imports
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// third-party imports
import { useSelector } from 'react-redux';

import './AnswerVoting.css';

function AnswerVoting(props) {
    const [answerVoting, setAnswerVoting] = useState(props.answerVoting);
    const [isAnswerVoted, setIsAnswerVoted] = useState("");     // "upvoted", "downvoted" or ""
    const userid = useSelector(state => state.user.userid); 

    useEffect(() => {
        setAnswerVoting(props.answerVoting);
        async function getIsAnswerUpvotedFromUser() {
            const votedFromUserResponse = await isAnswerVotedFromUser(userid, props.articleid, props.answerid);
            setIsAnswerVoted(votedFromUserResponse);
        }
        getIsAnswerUpvotedFromUser();
    }, [props.answerVoting])

    const updateVoting = (answerVoting, incValue) => {
        updateShareCounter(incValue, props.creatorid);
        updateAnswerVoting(answerVoting, props.articleid, props.voterid, props.answerid).then(() => {
            getAnswerById(props.articleid, props.answerid).then((answerResponse) => {
                setAnswerVoting(answerResponse.voting);
            });
        });
    }
    
    return (
        <div className="answer-voting">
            <Tooltip title="Diese Antwort ist hilfreich und verständlich." placement="left" arrow>
                <IconButton onClick={() => updateVoting(1, 10)}>
                    <ArrowDropUpIcon 
                        iconStyle={{width: '56px', height: '56px'}}
                        style={{width: '56px', height: '56px', color: isAnswerVoted === "upvoted" ? '#F48225' : '#696F75' }} />
                </IconButton>
            </Tooltip>
            <p>{answerVoting}</p>
            <Tooltip title="Diese Antwort ist nicht hilfreich und unverständlich." placement="left" arrow>
                <IconButton onClick={() => updateVoting(-1, -3)}>
                    <ArrowDropDownIcon
                        iconStyle={{width: '56px', height: '56px'}}
                        style={{width: '56px', height: '56px', color: isAnswerVoted === "downvoted" ? '#F48225' : '#696F75' }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AnswerVoting;