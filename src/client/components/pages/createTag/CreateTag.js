import React, { useState } from 'react';

// material-ui imports
import {
    Box,
    Button,
    TextField
} from '@material-ui/core';

// third-party imports
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import axios from 'axios';

import './CreateTag.css';

function CreateTag() {
    const [tagname, setTagname] = useState("");
    const [tagErrorText, setTagErrorText] = useState("");

    const [tagError, setTagError] = useState(false);

    const toTaglist = useHistory();

    const createTag = () => {
        if (checkTag() === true) {
            axios.get('/getUserByFirebaseid', {
                params: {
                    firebaseid: firebase.auth().currentUser.uid
                }
            }).then((response) => {
                const userData = response.data[0];
                console.log(userData);
                axios({
                    url: '/createTag',
                    method: 'post',
                    data: {
                        tagname: tagname,
                        creatorId: userData._id,
                        description: 'TODO',
                        status: 'In Prüfung'
                    }
                }).then(() => {
                    console.log("Tag successfully created");
                    toTaglist.push('/taglist');
                }).catch((error) => {
                    console.error("Tag is not successfully created", error);
                    alert("Serverfehler: Tag konnte nicht erstellt werden bitte versuchen Sie es später erneut.");
                });
            }).catch((error) => {
                console.error("Userdata are not loaded", error);
            });
        }
    }

    const checkTag = () => {
        if (tagname.length === 0) {
            setTagError(true);
            setTagErrorText("Bitte gib einen Tagnamen ein.");
            return false;
        }
        setTagError(false);
        setTagErrorText("");
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
                    inputProps={{ maxLength: 40 }}
                    onChange={(event) => setTagname(event.target.value)}
                    fullWidth
                    autoFocus />
            </Box>
            <Button
                variant="contained"
                color="primary"
                id="createTagButton"
                onClick={() => createTag()}>Tag erstellen</Button>
        </div>
    )
}

export default CreateTag;