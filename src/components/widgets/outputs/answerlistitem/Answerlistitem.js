import React from 'react';

// own-component imports
import Voting from '../../inputs/voting/ArticleVoting';

// third-party imports
import { Link } from 'react-router-dom';

import './Answerlistitem.css';

function Answerlistitem(props) {
    return (
        <div className="answer-list-item" key={props.index}>
            <p>{props.content}</p>
            {/*<Voting voting={props.voting} />*/}
            <p>{props.created}</p>
            <p>{props.creator}</p>
        </div>
    )
}

export default Answerlistitem;