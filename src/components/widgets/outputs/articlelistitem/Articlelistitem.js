import React from 'react';

// third-party imports
import { Link } from 'react-router-dom';

import './Articlelistitem.css';

function Articlelistitem(props) {
    return (
        <div className="article-list-item" key={props.index}>
            <div className="article-list-item-left">
                <ul>
                    <li>{props.voting}<br />Voting</li>
                    <li>{props.answerCounter}<br />Antworten</li>
                    <li>{props.views}<br />Ansichten</li>
                </ul>
            </div>
            <div className="article-list-item-right">
                <Link to={{pathname: `/article/${props.id}`}}>
                    <h3>{props.title}</h3>
                </Link>
                <div className="article-list-item-user-info">
                    {props.created}<br />
                    <Link to={{pathname: `/userprofile/${props.creatorId}`}}>
                        <span>{props.creator}</span>
                    </Link>
                    {props.creatorShareCount}
                </div>
            </div>
        </div>
    )
}

export default Articlelistitem;