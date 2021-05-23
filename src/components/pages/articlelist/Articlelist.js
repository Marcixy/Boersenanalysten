import './Articlelist.css';

// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

function Articlelist() {
    return (
        <div className="articlelist-page">
            <div className="articlelist-header">
                <h2>Beiträge</h2>
                <Link to="/createArticle">
                    <Button
                        variant="contained"
                        color="primary">Beitrag erstellen</Button>
                </Link>
            </div>
            <div>
                <p>Beitrag 1</p>
                <p>Beitrag 2</p>
            </div>
        </div>
    )
}

export default Articlelist;