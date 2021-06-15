import React from 'react';

// third-party imports
import { Link } from 'react-router-dom';

// material-ui imports
import {
    Paper,
    Typography
} from '@material-ui/core';

// material-ui lab imports
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import './PortfolioArticleItem.css';

function PortfolioArticleItem(props) {
    return (
        <TimelineItem className="timeline-item">
            <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
            <Paper elevation={3}>
                <Typography variant="h6">{props.title}</Typography>
                <Typography>{props.creationDate}</Typography>
            </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}

export default PortfolioArticleItem;