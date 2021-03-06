import React, { useEffect, useState } from 'react';

// own component imports
import ArticleLink from '../articlelink/ArticleLink';
import ArticleStatistics from '../articlestatistics/ArticleStatistics';

// material-ui imports
import { Paper } from '@material-ui/core';

// material-ui lab imports
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import './PortfolioArticleItem.css';

function PortfolioArticleItem(props) {
    const [formattedCreationDate, setFormattedCreationDate] = useState("");

    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    
    useEffect(() => {
        convertCreationDate();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const convertCreationDate = () => {
        const creationDate = new Date(props.creationDate);
        setFormattedCreationDate(creationDate.toLocaleString("de-DE", options));
    }

    return (
        <TimelineItem className="timeline-item">
            <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <Paper elevation={3} style={{color: 'white', backgroundColor: '#333333'}}>
                <ArticleLink 
                    id={props.id}
                    title={props.title} />
                <ArticleStatistics
                    voting={props.voting}
                    answerCounter={props.answerCounter}
                    views={props.views} />
                <p>{formattedCreationDate}</p>
            </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}

export default PortfolioArticleItem;