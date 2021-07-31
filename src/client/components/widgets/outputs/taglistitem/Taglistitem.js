import React, { useState, useEffect } from 'react';

// material-ui imports
import { Chip } from '@material-ui/core';

import './Taglistitem.css';

function Taglistitem(props) {
    const [formattedCreationDate, setFormattedCreationDate] = useState("");
    
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    useEffect(() => {
        convertCreationDate();
    }, [props.createdAt])  // eslint-disable-line react-hooks/exhaustive-deps

    const convertCreationDate = () => {
        const creationDate = new Date(props.createdAt);
        setFormattedCreationDate(creationDate.toLocaleString("de-DE", options));
    }

    return (
        <div className="tag-list-item" key={props.index}>
            <Chip 
                className="tag-title"
                size="small"
                color="primary"
                label={props.tagname} />
            <p>{props.description}</p>
            <p>{props.articleCounter}</p>
            <p>{props.status}</p>
            <p>{formattedCreationDate}</p>
        </div>
    )
}

export default Taglistitem;