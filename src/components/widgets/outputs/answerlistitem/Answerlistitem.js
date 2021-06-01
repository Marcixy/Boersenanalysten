import React from 'react';

// third-party imports
import { Link } from 'react-router-dom';

import './Answerlistitem.css';

function Answerlistitem(props) {
    return (
        <div className="answer-list-item" key={props.index}>
            <p>{props.content}</p>
            <p>{props.voting}</p>
            <p>{props.created}</p>
        </div>
    )
}

export default Answerlistitem;