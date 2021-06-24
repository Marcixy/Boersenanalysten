import React, { useState } from 'react';

// material-ui imports
import {
    Box,
    Chip,
    TextField
} from '@material-ui/core';

import './TagInput.css';

function TagInput({ tagError, tagErrorText, parentCallbackTags }) {
    const [tags, setTags] = useState([]);

    const addTag = () => {
        let tag = document.getElementById('tag-inputfield').value;
        if (tag !== "") {
            setTags([...tags, tag]);
            parentCallbackTags([...tags, tag]);
            document.getElementById('tag-inputfield').value = "";
        }
    }

    const deleteTag = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div>
            <Box mb={4}>
                <TextField
                    id="tag-inputfield"
                    label="Tags"
                    type="text"
                    variant="outlined"
                    error={tagError}
                    helperText={tagErrorText}
                    inputProps={{ maxLength: 40 }}
                    onKeyDown={(event) => (event.key === "Enter" ? addTag(event) : null)}
                    fullWidth />
            </Box>
            <ul className="tag-list">
                {
                    tags.map((tag, index) => (
                        <li key={index} className="tag-listitem">
                            <Chip 
                                className="tag-title"
                                color="primary"
                                label={tag}
                                onDelete={() => deleteTag(index)} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TagInput;