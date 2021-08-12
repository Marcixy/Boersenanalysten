import React from 'react';

// own component imports
import ArticleLink from '../articlelink/ArticleLink';

import './Votinglistitem.css';

function Votinglistitem(props) {
    return (
        <div className="voting-list-item" key={props.index}>
            <div className="voting-list-item-left" id="votingText">
                <span style={ props.upOrDownvoting === "Upvoting" ? { color: 'green' } : { color: 'red' }}>{ props.upOrDownvoting }</span>
            </div>
            <div className="voting-list-item-right">
                <ArticleLink id={props.id} title={props.title} />
            </div>
        </div>
    )
}

export default Votinglistitem;