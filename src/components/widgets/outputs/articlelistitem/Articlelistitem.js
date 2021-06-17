import React, { useState, useEffect } from 'react';

// material-ui imports
import {
    Chip,
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

import './Articlelistitem.css';

function Articlelistitem(props) {
    const [formattedCreationDate, setFormattedCreationDate] = useState("");
    
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    useEffect(() => {
        convertCreationDate();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const convertCreationDate = () => {
        const creationDate = new Date(props.created);
        setFormattedCreationDate(creationDate.toLocaleString("de-DE", options));
    }

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
                {
                props.tags.map((tag) => (
                    <Chip 
                        className="tag-title"
                        size="small"
                        color="primary"
                        label={tag} />
                    ))
                }
                <div className="article-list-item-user-info">
                    {formattedCreationDate}<br />
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