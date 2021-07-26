import React, { useState, useEffect } from 'react';

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
            <p>{props.tagname}</p>
            <p>{props.description}</p>
            <p>{props.articleCounter}</p>
            <p>{props.status}</p>
            <p>{formattedCreationDate}</p>
        </div>
    )
}

export default Taglistitem;