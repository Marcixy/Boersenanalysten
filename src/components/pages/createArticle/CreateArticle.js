import React, { useState } from 'react';

// own imports
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';

// material-ui imports
import { 
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

import './CreateArticle.css';

function CreateArticle() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    
    const createArticle = () => {

    }

    return (
        <div className="create-article-page">
            <h2>Beitrag erstellen</h2>
            <TextField
                label="Titel..."
                type="text"
                variant="outlined"
                //error={emailError}
                //helperText={emailErrorText}
                inputProps={{ maxLength: 100 }}
                onChange={(event) => setTitle(event.target.value)}
                autoFocus />
            <TextEditor />
            <Link to="/article">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createArticle()}>Beitrag erstellen</Button>
            </Link>
        </div>
    )
}

export default CreateArticle;