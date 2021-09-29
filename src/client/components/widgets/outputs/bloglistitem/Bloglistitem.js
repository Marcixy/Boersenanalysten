// third-party imports
import { Link } from 'react-router-dom';

// material-ui imports
import { Chip } from '@material-ui/core';

// material-ui icon imports
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import './Bloglistitem.css';

function Bloglistitem(props) {
    return (
        <div className="blog-page-article-section">
            <Link to={props.blogarticlelink}>
                <h3>{props.blogtitle}</h3>
            </Link>
            <Chip
                size="small"
                color="primary"
                label="ETFs" />
            <Chip 
                size="small"
                color="primary"
                label="Börse" />
            <p>{props.creationDate} - <AccessTimeIcon className="time-icon" /> Geschätzte Lesezeit {props.estimatedReadTime}</p>
        </div>
    )
}

export default Bloglistitem;