import React, { useState } from 'react';

// own imports
import TagInput from '../../widgets/inputs/tagInput/TagInput';
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import ArticleTypeSelection from '../../widgets/inputs/articleTypeSelection/ArticleTypeSelection';
import { getUserByFirebaseid } from '../../utils/axios/user/UserFunctions';
import { createArticle } from '../../utils/axios/article/ArticleFunctions';

// material-ui imports
import {
    Box,
    Button,
    TextField
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

    // Callbacks: Verbindung zu Child Komponenten um auf die Eingaben Zugriff zu bekommen.
    const callbackTagInput = (tagInput) => { setTags(tagInput); }
    const callbackEditorContent = (editorContent) => { setContent(editorContent); }
    const callbackArticleType = (articleType) => { setArticleType(articleType); }

    const createNewArticle = () => {
        const isTitleValid = checkTitle();
        const isContentValid = checkContent();
        const isTagsValid = checkTags();
        if (isTitleValid === true && isContentValid === true && isTagsValid === true) {
            getUserByFirebaseid().then((userResponse) => {
                const userData = userResponse[0];
                createArticle(title, content, tags, userData._id, articleType).then((articleResponse) => {
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
        } else if (tags.length > 8) {
            setTagError(true);
            setTagErrorText("Es sind maximal 8 Tags erlaubt.");
            return false;
        }
        setTagError(false);
        setTagErrorText("");
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
                    inputProps={{ maxLength: 50 }}
                    onChange={(event) => setTitle(event.target.value)}
                    fullWidth
                    autoFocus />
            </Box>
            <TextEditor
                contentError={ contentError }
                contentErrorText={ contentErrorText }
                parentCallbackEditorContent={ callbackEditorContent } />
            <ArticleTypeSelection
                displayTooltip="inline-block"
                displayRadioButtonAll="none"
                selectedRadioButton="question"
                parentCallbackArticleType={ callbackArticleType } />
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