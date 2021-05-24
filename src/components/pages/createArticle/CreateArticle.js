import React, { useState } from 'react';

// own imports
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';

// material-ui imports
import {
    Box,
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';
import axios from 'axios';

import './CreateArticle.css';

function CreateArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    
    const createArticle = () => {
        axios({
            url: '/createArticle',
            method: 'post',
            data: {
                title: title,
                content: content,
                tags: tags,
                voting: 0,
                answerCounter: 0,
                views: 0
            }
        }).then(() => {
            console.log("Article successfully created");
        }).catch((error) => {
            console.error("Article is not successfully created", error);
        });
    }

    return (
        <div className="create-article-page">
            <h2>Beitrag erstellen</h2>
            <Box mb={4}>
                <TextField
                    label="Titel"
                    type="text"
                    variant="outlined"
                    //error={emailError}
                    //helperText={emailErrorText}
                    inputProps={{ maxLength: 100 }}
                    onChange={(event) => setTitle(event.target.value)}
                    fullWidth
                    autoFocus />
            </Box>
            <TextEditor />
            <Box mb={4}>
                <TextField
                    label="Tags"
                    type="text"
                    variant="outlined"
                    //error={tagsError}
                    //helperText={tagsErrorText}
                    inputProps={{ maxLength: 40 }}
                    onChange={(event) => setTags(event.target.value)} 
                    fullWidth />
            </Box>
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