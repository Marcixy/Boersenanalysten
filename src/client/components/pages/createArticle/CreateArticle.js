import React, { useState } from 'react';

// own imports
import TagInput from '../../widgets/inputs/tagInput/TagInput';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import { getUserByFirebaseid } from '../../utils/axios/user/UserFunctions';
import { createArticle } from '../../utils/axios/article/ArticleFunctions';

// material-ui imports
import {
    Box,
    Radio,
    Button,
    TextField,
    FormLabel,
    RadioGroup,
    FormControl,
    FormControlLabel 
} from '@material-ui/core';

// third-party imports
import { useHistory } from 'react-router-dom';

import './CreateArticle.css';

function CreateArticle() {
    // Eingabefelder für Beitrag erstellen
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [articleType, setArticleType] = useState("question");

    // Errortexte für Beitrag erstellen
    const [titleErrorText, setTitleErrorText] = useState("");
    const [contentErrorText, setContentErrorText] = useState("");
    const [tagErrorText, setTagErrorText] = useState("");

    // Error Farbe für Beitrag erstellen
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [tagError, setTagError] = useState(false);
    
    const toArticle = useHistory();

    const createNewArticle = () => {
        const isTitleValid = checkTitle();
        const isContentValid = checkContent();
        const isTagsValid = checkTags();
        if (isTitleValid === true && isContentValid === true && isTagsValid === true) {
            getUserByFirebaseid().then((userResponse) => {
                const userData = userResponse[0];
                createArticle(title, content, tags, userData._id, articleType).then((articleResponse) => {
                    console.log("Article successfully created");
                    toArticle.push(`/article/${articleResponse._id}`);
                });
            });
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

    const handleArticleType = (event) => {
        setArticleType(event.target.value);
    };

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
            <FormControl component="fieldset">
                <FormLabel style={{ color:"white" }} component="legend">Beitragstyp:</FormLabel>
                <RadioGroup value={articleType} onChange={handleArticleType}>
                    <FormControlLabel value="question" control={<Radio />} label="Frage" />
                    <FormControlLabel value="opinion" control={<Radio />} label="Meinung" />
                    <FormControlLabel value="portfolio" control={<Radio />} label="Portfolio Beitrag" />
                </RadioGroup>
            </FormControl>
            <TagInput
                tagError={tagError}
                tagErrorText={tagErrorText}
                parentCallbackTags={ callbackTagInput } />
            <Button
                variant="contained"
                color="primary"
                id="createAnswerButton"
                onClick={() => createNewArticle()}>Beitrag erstellen</Button>
        </div>
    )
}

export default CreateArticle;