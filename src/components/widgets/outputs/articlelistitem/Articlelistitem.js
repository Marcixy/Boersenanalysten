import React from 'react';

import { Link } from 'react-router-dom';

import './Articlelistitem.css';

function Articlelistitem(props) {
    return (
        <div className="article-list-item" key={props.index}>
            <Link to={{pathname: `/article/${props.id}`}}>
                <h3>{props.title}</h3>
            </Link>
            <p>{props.voting} Voting {props.answerCounter} Antworten {props.views} Ansichten</p>
            <Link to={{pathname: `/userprofile/${props.id}`}}>
                <p>{props.creator}</p>
            </Link>
            <p>{props.created}</p>
        </div>
    )
}

export default Articlelistitem;