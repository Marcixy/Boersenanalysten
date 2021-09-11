import React, { useState, useEffect } from 'react';

// own component imports
import Taglistitem from '../../widgets/outputs/taglistitem/Taglistitem';
import Pagination from '../../widgets/outputs/pagination/Pagination';
import { 
    getTaglist,
    getTagCount
} from '../../utils/axios/tag/TagFunctions';

// material-ui imports
import {
    Button
} from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Taglist.css';

function Taglist() {
    const [tagList, setTagList] = useState([]);
    const [paginationCount, setPaginationCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    useEffect(() => {
        getNewTagList(null, currentPage);
    }, []);

    const getNewTagList = (event, currentPage) => {
        setCurrentPage(currentPage);
        getTaglist(currentPage).then((tagList) => {
            setTagList(tagList);
        });
        getTagCount().then((tagCount) => {
            setPaginationCount(Math.ceil(tagCount / 10)); 
        });
        window.scrollTo(0, 0);
    }

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
            <div className="taglist-header">
                <h2>Tags</h2>
                { isLoggedIn === true &&
                <Link to="/createTag">
                    <Button variant="contained" color="primary">Tag erstellen</Button>
                </Link> }
            </div>
            <div className="taglist-section">
                { displayTagList(tagList) }
            </div>
            <Pagination
                paginationCount={ paginationCount }
                page={ currentPage }
                onChange={ getNewTagList } />
        </div>
    )
}

export default Taglist;