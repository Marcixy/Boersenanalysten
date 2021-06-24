import React from 'react';

// third-party imports
import { Link } from 'react-router-dom';

import './ArticleLink.css';

function ArticleLink(props) {
    return (
        <div className="article-link">
            <Link to={{pathname: `/article/${props.id}`}}>
                <h3>{props.title}</h3>
            </Link>
        </div>
    )
}

export default ArticleLink;