import React from 'react';

// own component imports
import ArticleLink from '../articlelink/ArticleLink';

import './Votinglistitem.css';

// TODO Votinglistitems sollen andere Informationen anzeigen als Antwortenlistitems
// siehe als Inspiration Stack Overflow --> Votes Sektion
function Votinglistitem(props) {
    return (
        <div className="voting-list-item" key={props.index}>
            <div className="voting-list-item-left" id="votingText">
                { props.upOrDownvoting }
            </div>
            <div className="voting-list-item-right">
                <ArticleLink id={props.id} title={props.title} />
            </div>
        </div>
    )
}

export default Votinglistitem;