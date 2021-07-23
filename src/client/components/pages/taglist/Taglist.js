// material-ui imports
import {
    Button,
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

import './Taglist.css';

function Taglist() {
    return (
        <div className="taglist-page">
            <div className="articlelist-header">
                <h2>Tags</h2>
                <Link to="/createTag">
                    <Button
                        variant="contained"
                        color="primary">Tag erstellen</Button>
                </Link>
            </div>
        </div>
    )
}

export default Taglist;