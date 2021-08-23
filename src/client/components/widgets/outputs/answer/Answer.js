import React from 'react';

// own-component imports
import Voting from '../../inputs/voting/Voting';

// third-party imports
import { Link } from 'react-router-dom';

import './Answer.css';

function Answer(props) {
    return (
        <div className="answer" key={props.index}>
            <Voting
                answerid={props.answerid}
                articleid={props.articleid}
                creatorid={props.creatorid}
                updateVotingAxiosUrl="updateAnswerVoting"
                getByIdAxiosUrl="getAnswerById"
                voting={props.voting}
                voterid={props.voterid} />
            <div className="answer-content-right">
                <p>{props.content}</p>
                <p>{props.created}</p>
                {/* TODO in eigene Komponente auslagern und auch in Articlelistitem aufrufen */}
                <Link to={{pathname: `/userprofile/${props.creatorid}`}}>
                    <span>{props.creator}</span>
                </Link>
                {props.creatorShareCounter}
            </div>
        </div>
    )
}

export default Answer;