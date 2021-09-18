import React from 'react';

// own-component imports
import AnswerVoting from '../../inputs/answerVoting/AnswerVoting';

// third-party imports
import { Link } from 'react-router-dom';

import './Answerlistitem.css';

function Answerlistitem(props) {
    return (
        <div className="answer" key={props.index}>
            <AnswerVoting
                answerid={props.answerid}
                articleid={props.articleid}
                creatorid={props.creatorid}
                answerVoting={props.voting}
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

export default Answerlistitem;