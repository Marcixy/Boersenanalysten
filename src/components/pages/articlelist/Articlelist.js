import './Articlelist.css';

// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

function Articlelist() {
    return (
        <div className="articlelist-page">
            <h2>Beitragsliste</h2>
            <Link to="/createArticle">
                <Button
                    variant="contained"
                    color="primary">Beitrag erstellen</Button>
            </Link>
        </div>
    )
}

export default Articlelist;