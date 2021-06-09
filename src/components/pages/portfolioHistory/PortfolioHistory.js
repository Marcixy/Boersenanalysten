import React from 'react';

// own-component imports
import UserNavigationbar from '../../widgets/outputs/usernavigationbar/UserNavigationbar';

// third-party imports
import { useParams } from "react-router-dom";

import './PortfolioHistory.css';

function PortfolioHistory() {
    const { id } = useParams();

    return (
        <div className="portfolio-history-page">
            <UserNavigationbar userid={id} />
            <h2>Portfolio Historie</h2>
        </div>
    )
}

export default PortfolioHistory;