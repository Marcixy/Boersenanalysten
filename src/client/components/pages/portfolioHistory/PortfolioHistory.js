import React, { useState, useEffect } from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';
import PortfolioArticleItem from '../../widgets/outputs/portfolioarticleitem/PortfolioArticleItem';
import { getUserPortfolioArticles } from '../../utils/axios/user/UserFunctions';

// material-ui lab imports
import Timeline from '@material-ui/lab/Timeline';

// third-party imports
import { useParams } from "react-router-dom";

import './PortfolioHistory.css';

function PortfolioHistory() {
    const [portfolioArticleData, setPortfolioArticleData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getUserPortfolioArticles(id).then((portfolioArticleListResponse) => {
            setPortfolioArticleData(portfolioArticleListResponse);
        });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const displayPortfolioArticles = (portfolioArticles) => {
        return portfolioArticles.map((portfolioArticle) => (
            <PortfolioArticleItem
                id={portfolioArticle._id}
                title={portfolioArticle.title}
                voting={portfolioArticle.voting}
                answerCounter={portfolioArticle.answerCounter}
                views={portfolioArticle.views}
                creationDate={portfolioArticle.createdAt} />
        ));
    }

    return (
        <div className="portfolio-history-page">
            <UserNavigationbar userid={id} />
            <h2>Portfolio Historie</h2>
            <Timeline align="alternate">
                { displayPortfolioArticles(portfolioArticleData) }
            </Timeline>
        </div>
    )
}

export default PortfolioHistory;