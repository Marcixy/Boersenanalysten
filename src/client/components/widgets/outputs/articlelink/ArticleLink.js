import React, { useState, useEffect } from 'react';

// third-party imports
import { Link } from 'react-router-dom';

import './ArticleLink.css';

function ArticleLink(props) {
    const [articleType, setArticleType] = useState("");

    useEffect(() => {
        convertArticleTypeText();
    });

    const convertArticleTypeText = () => {
        switch (props.articleType) {
            case "question":
                setArticleType("[Frage]");
                break;
            case "opinion":
                setArticleType("[Meinung]");
                break;
            case "portfolio":
                setArticleType("[Portfolio]");
                break;
            default:
                console.log("Article Type wird nicht unterstützt.");
        }
    }

    return (
        <div className="article-link">
            <Link to={{pathname: `/article/${props.id}`}}>
                <h3>{articleType} {props.title}</h3>
            </Link>
        </div>
    )
}

export default ArticleLink;