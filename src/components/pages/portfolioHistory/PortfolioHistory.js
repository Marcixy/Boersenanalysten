import React from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';
import PortfolioArticleItem from '../../widgets/outputs/portfolioarticleitem/PortfolioArticleItem';

 // material-ui lab imports
import Timeline from '@material-ui/lab/Timeline';

// third-party imports
import { useParams } from "react-router-dom";

import './PortfolioHistory.css';

function PortfolioHistory() {
    const { id } = useParams();

    return (
        <div className="portfolio-history-page">
            <UserNavigationbar userid={id} />
            <h2>Portfolio Historie</h2>
            <Timeline align="alternate">
                <PortfolioArticleItem 
                    title="Portfolio Beitrag 4"
                    creationDate="01.07.2021"/>
                <PortfolioArticleItem 
                    title="Portfolio Beitrag 3"
                    creationDate="15.06.2021"/>
                <PortfolioArticleItem 
                    title="Portfolio Beitrag 2"
                    creationDate="08.06.2021"/>
                <PortfolioArticleItem 
                    title="Portfolio Beitrag 1"
                    creationDate="01.06.2021"/>
            </Timeline>
        </div>
    )
}

export default PortfolioHistory;