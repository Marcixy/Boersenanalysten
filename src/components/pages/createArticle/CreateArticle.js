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
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './CreateArticle.css';

function CreateArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const [titleErrorText, setTitleErrorText] = useState("");

    const [titleError, setTitleError] = useState(false);
    
    const toArticle = useHistory();

    const createArticle = () => {
        const isTitleValid = checkTitle();
        //const isTagsValid = checkTags();
        if (isTitleValid === true) {
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
            toArticle.push("/article");
        }
    }

    const checkTitle = () => {
        if (title === "") {
            setTitleError(true);
            setTitleErrorText("Bitte gib einen Titel ein.");
            return false;
        } else if (title.length < 5) {
            setTitleError(true);
            setTitleErrorText("Der Titel muss mindestens 5 Zeichen lang sein.");
            return false;
        }
        setTitleError(false);
        setTitleErrorText("");
        return true;
    }

    return (
        <div className="create-article-page">
            <h2>Beitrag erstellen</h2>
            <Box mb={4}>
                <TextField
                    label="Titel"
                    type="text"
                    variant="outlined"
                    error={titleError}
                    helperText={titleErrorText}
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
            <Button
                variant="contained"
                color="primary"
                onClick={() => createArticle()}>Beitrag erstellen</Button>
        </div>
    )
}

export default CreateArticle;