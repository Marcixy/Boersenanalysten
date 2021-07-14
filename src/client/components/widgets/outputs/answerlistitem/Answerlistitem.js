import React, { useState, useEffect } from 'react';

// own component imports
import ArticleLink from '../articlelink/ArticleLink';
import TagList from '..//taglist/Taglist';

import './Answerlistitem.css';

function Answerlistitem(props) {
    const [formattedCreationDate, setFormattedCreationDate] = useState("");
    
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    useEffect(() => {
        convertCreationDate();
    }, [props.created])  // eslint-disable-line react-hooks/exhaustive-deps

    const convertCreationDate = () => {
        const creationDate = new Date(props.created);
        setFormattedCreationDate(creationDate.toLocaleString("de-DE", options));
    }

    return (
        <div className="answer-list-item" key={props.index}>
            <p>{props.voting}<br />Voting</p>
            <div className="answer-list-item-right">
                <ArticleLink id={props.id} title={props.title} />
                <TagList tagList={props.tags} />
                <div className="answer-list-item-creation-date">
                    {formattedCreationDate}<br />
                </div>
            </div>
        </div>
    )
}

export default Answerlistitem;