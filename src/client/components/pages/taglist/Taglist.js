import React, { useState, useEffect } from 'react';

// own component imports
import Taglistitem from '../../widgets/outputs/taglistitem/Taglistitem';

// material-ui imports
import {
    Button
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Taglist.css';

function Taglist() {
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        axios.get(`/getTaglist/`, {
            params: {

            }
        }).then((tagListResponse) => {
            const tagList = tagListResponse.data;
            setTagList(tagList);
        }).catch((error) => {
            console.error("Taglist are not loaded", error);
        });
        window.scrollTo(0, 0);
    }, [])

    const displayTagList = (tags) => {
        return tags.map((tag, index) => (
            <Taglistitem 
                id={tag._id}
                index={index}
                tagname={tag.tagname}
                articleCounter={tag.articleCounter}
                status={tag.status}
                createdAt={tag.createdAt} />
        ));
    }

    return (
        <div className="taglist-page">
            <div className="articlelist-header">
                <h2>Tags</h2>
                <Link to="/createTag">
                    <Button
                        variant="contained"
                        color="primary">Tag erstellen</Button>
                </Link>
            </div>
            <div className="taglist-section">
                {displayTagList(tagList)}
            </div>
        </div>
    )
}

export default Taglist;