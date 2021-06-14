import React, { useState } from 'react';

// own imports
import TagInput from '../../widgets/inputs/tagInput/TagInput';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';

// material-ui imports
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField
} from '@material-ui/core';

// third-party imports
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import axios from 'axios';

import './CreateArticle.css';

function CreateArticle() {
    // Eingabefelder für Beitrag erstellen
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [isPortfolioArticle, setIsPortfolioArticle] = useState(false);

    // Errortexte für Beitrag erstellen
    const [titleErrorText, setTitleErrorText] = useState("");
    const [contentErrorText, setContentErrorText] = useState("");
    const [tagErrorText, setTagErrorText] = useState("");

    // Error Farbe für Beitrag erstellen
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [tagError, setTagError] = useState(false);
    
    const toArticle = useHistory();

    const createArticle = () => {
        const isTitleValid = checkTitle();
        const isContentValid = checkContent();
        const isTagsValid = checkTags();
        if (isTitleValid === true && isContentValid === true && isTagsValid === true) {
            axios.get('/getUserByFirebaseid', {
                params: {
                    firebaseid: firebase.auth().currentUser.uid
                }
            })
            .then((response) => {
                const userData = response.data[0];
                axios({
                    url: '/createArticle',
                    method: 'post',
                    data: {
                        title: title,
                        content: content,
                        tags: tags,
                        creator: userData._id,
                        isPortfolioArticle: isPortfolioArticle
                    }
                }).then(() => {
                    console.log("Article successfully created");
                    toArticle.push("/article");
                }).catch((error) => {
                    console.error("Article is not successfully created", error);
                });
            })
            .catch((error) => {
                console.error("Userdata are not loaded", error);
            })
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

    const checkContent = () => {
        if (content === "") {
            setContentError(true);
            setContentErrorText("Bitte gib einen Beitragstext ein.");
            return false;
        }
        setContentError(false);
        setContentErrorText("");
        return true;
    }

    const checkTags = () => {
        if (tags.length === 0) {
            setTagError(true);
            setTagErrorText("Es muss mindestens ein Tag angegeben werden damit dein Beitrag besser gefunden werden kann.");
            return false;
        } else if (tags.length > 10) {
            setTagError(true);
            setTagErrorText("Es sind maximal 10 Tags erlaubt.");
            return false;
        }
        setTagError(false);
        setTagErrorText("");
        return true;
    }

    const handleIsPortfolioArticle = () => {
        setIsPortfolioArticle(!isPortfolioArticle);
    }

    // Verbindung zu TextEditor Komponente um auf den eingegebenen Editor Content 
    // Zugriff zu bekommen.
    const callbackEditorContent = (editorContent) => {
        setContent(editorContent);
    }

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackTagInput = (tagInput) => {
        setTags(tagInput);
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
            <TextEditor
                contentError={ contentError }
                contentErrorText={ contentErrorText }
                parentCallbackEditorContent={ callbackEditorContent } />
            <FormControlLabel
                id="is-portfolio-article-checkbox"
                control={
                    <Checkbox
                        checked={isPortfolioArticle}
                        color="primary"
                        onChange={handleIsPortfolioArticle} />
                }
                label="Portfolio Beitrag" />
            <TagInput
                tagError={tagError}
                tagErrorText={tagErrorText}
                parentCallbackTags={ callbackTagInput } />
            <Button
                variant="contained"
                color="primary"
                id="createAnswerButton"
                onClick={() => createArticle()}>Beitrag erstellen</Button>
        </div>
    )
}

export default CreateArticle;