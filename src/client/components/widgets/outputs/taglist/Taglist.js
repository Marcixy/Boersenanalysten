import React from 'react';

// material-ui imports
import { Chip } from '@material-ui/core';

import './Taglist.css';

function Taglist(props) {

    const displayTagList = (tags) => {
        return tags?.map((tagName) => (
            <Chip 
                className="tag-title"
                size="small"
                color="primary"
                label={tagName} />
        ));
    }

    return (
        <div className="tag-list">
            {displayTagList(props.tagList)}
        </div>
    )
}

export default Taglist;