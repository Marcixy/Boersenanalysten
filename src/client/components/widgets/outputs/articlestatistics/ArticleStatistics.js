import React from 'react';

import './ArticleStatistics.css';

function ArticleStatistics(props) {
    return (
        <div className="article-statistics">
            <ul>
                <li>{props.voting}<br />Voting</li>
                <li>{props.answerCounter}<br />Antworten</li>
                <li>{props.views}<br />Ansichten</li>
            </ul>
        </div>
    )
}

export default ArticleStatistics;