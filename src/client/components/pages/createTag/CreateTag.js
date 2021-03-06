import React, { useState } from 'react';

// own imports
import TextEditor from '../../widgets/inputs/textEditor/TextEditor';
import { getUserByFirebaseid } from '../../utils/axios/user/UserFunctions';
import { createTag } from '../../utils/axios/tag/TagFunctions';

// material-ui imports
import {
    Box,
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { useHistory } from 'react-router-dom';

import './CreateTag.css';

function CreateTag() {
    const [tagname, setTagname] = useState("");
    const [tagDescription, setTagDescription] = useState("");

    const [tagErrorText, setTagErrorText] = useState("");
    const [tagDescriptionErrorText, setTagDescriptionErrorText] = useState("");

    const [tagError, setTagError] = useState(false);
    const [tagDescriptionError, setTagDescriptionError] = useState(false);

    const toTaglist = useHistory();

    // Verbindung zu TextEditor Komponente um auf die eingegebene Tag Beschreibung Zugriff zu bekommen.
    const callbackTagDescription = (tagDescription) => { setTagDescription(tagDescription); }

    const createNewTag = () => {
        const isTagTitelValid = checkTagTitle();
        const isTagDescriptionValid = checkTagDescription();
        if (isTagTitelValid === true && isTagDescriptionValid === true) {
            getUserByFirebaseid().then((userResponse) => {
                createTag(tagname, tagDescription, userResponse[0]._id).then(() => {
                    toTaglist.push('/taglist');
                });
            });
        }
    }

    const checkTagTitle = () => {
        if (tagname.length === 0) {
            setTagError(true);
            setTagErrorText("Bitte gib einen Tagnamen ein.");
            return false;
        }
        setTagError(false);
        setTagErrorText("");
        return true;
    }

    const checkTagDescription = () => {
        if (tagDescription.length === 0) {
            setTagDescriptionError(true);
            setTagDescriptionErrorText("Bitte gib eine Tag Beschreibung ein.");
            return false;
        }
        setTagDescriptionError(false);
        setTagDescriptionErrorText("");
        return true;
    }

    return (
        <div className="create-tag-page">
            <h2>Neuen Tag erstellen</h2>
            <p>TODO Beschreibung schreiben</p>
            <Box mb={4}>
                <TextField
                    label="Neuer Tag"
                    type="text"
                    variant="outlined"
                    error={tagError}
                    helperText={tagErrorText}
                    inputProps={{ maxLength: 30 }}
                    onChange={(event) => setTagname(event.target.value)}
                    fullWidth
                    autoFocus />
                <TextEditor 
                    title={ "Beschreibung" }
                    contentError={ tagDescriptionError }
                    contentErrorText={ tagDescriptionErrorText }
                    parentCallbackEditorContent={ callbackTagDescription } 
                    isMenuebarVisible = { false } />   
            </Box>
            <Button
                variant="contained"
                color="primary"
                id="createTagButton"
                onClick={() => createNewTag()}>Tag erstellen</Button>
        </div>
    )
}

export default CreateTag;