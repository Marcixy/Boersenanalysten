// third-party imports
import { Link } from 'react-router-dom';

// material-ui imports
import { Chip } from '@material-ui/core';

// material-ui icon imports
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import './Blog.css';

function Blog() {
    return (
        <div className="blog-page">
            <h2>Blog</h2>
            <div className="blog-page-article-section">
                <Link to="/blogarticle">
                    <h3>Vermögensaufbau und Marathon - Gemeinsamkeiten und Unterschiede</h3>
                </Link>
                <Chip
                    size="small"
                    color="primary"
                    label="ETFs" />
                <Chip 
                    size="small"
                    color="primary"
                    label="Börse" />
                <p>27. September 2021 - <AccessTimeIcon className="time-icon" /> Geschätzte Lesezeit 5 Min</p>
            </div>
            <div className="blog-page-article-section">
                <Link to="/blogarticle">
                    <h3>Vermögensaufbau und Marathon - Gemeinsamkeiten und Unterschiede</h3>
                </Link>
                <Chip
                    size="small"
                    color="primary"
                    label="ETFs" />
                <Chip 
                    size="small"
                    color="primary"
                    label="Börse" />
                <p>27. September 2021 - <AccessTimeIcon className="time-icon" /> Geschätzte Lesezeit 5 Min</p>
            </div>
        </div>
    )
}

export default Blog;