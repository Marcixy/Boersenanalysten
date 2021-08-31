import React, { useState, useEffect } from 'react';

// own component imports
import Articlelistitem from '../../widgets/outputs/articlelistitem/Articlelistitem';
import SortingActions from '../../widgets/outputs/sortingactions/SortingActions';
import Pagination from '../../widgets/outputs/pagination/Pagination';
import ArticleTypeSelection from '../../widgets/inputs/articleTypeSelection/ArticleTypeSelection';
import TagInput from '../../widgets/inputs/tagInput/TagInput';
import { 
    getArticleCount,
    getArticlelist,
    getArticleCreatorNames
} from '../../utils/axios/article/ArticleFunctions';

// material-ui imports
import {
    Box,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Typography
} from '@material-ui/core';

// material-ui icon imports
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// third-party imports
import { Link } from 'react-router-dom';

import './Articlelist.css';

function Articlelist() {
    const [title, setTitle] = useState("");
    const [sortCriteria, setSortCriteria] = useState("createdAt");
    const [tags, setTags] = useState([]);
    const [articleData, setArticleData] = useState([]);
    const [articleCreatorNames, setArticleCreatorNames] = useState([]);
    const [paginationCount, setPaginationCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getArticleList(null, currentPage);
        getArticleCount().then((articleCountResponse) => {
            setPaginationCount(Math.ceil(articleCountResponse / 10)); 
        }).catch((error) => {
            console.error("Articlecount is not loaded", error);
        });
    }, [sortCriteria])

    const displayArticleData = (articles) => {
        return articles?.length !== 0 ? articles?.map((article, index) => (
            <Articlelistitem
                id={article._id}
                index={index}
                title={article.title}
                articleType={article.articleType}
                tags={article.tags}
                voting={article.voting}
                answerCounter={article.answerCounter}
                views={article.views}
                creator={articleCreatorNames[index]}
                creatorId={article.creator}
                created={article.createdAt} />
        )) : <p>Noch keine Beiträge vorhanden.</p>;
    }

    const getArticleList = (event, currentPage) => {
        setCurrentPage(currentPage);
        getArticlelist(sortCriteria, currentPage).then((articlelistResponse) => {
            setArticleData(articlelistResponse);
            getArticleCreatorNames(sortCriteria, currentPage).then((response) => {
                setArticleCreatorNames(response);
            });
        });
        window.scrollTo(0, 0);
    }

    // Verbindung zu SortActions Komponente um auf die aktuelle Sortierungs-
    // einstellung Zugriff zu bekommen.
    const callbackSortCriteria = (sortCriteria) => {
        setSortCriteria(sortCriteria);
    }

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackTagInput = (tagInput) => {
        setTags(tagInput);
    }

    return (
        <div className="articlelist-page">
            <div className="articlelist-header">
                <h2>Beiträge</h2>
                <Link to="/createArticle">
                    <Button
                        variant="contained"
                        color="primary">Beitrag erstellen</Button>
                </Link>
            </div>
            <div className="articlelist-filter">
                <Accordion>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }>
                    <Typography>Filter</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        <Box mb={4}>
                            <TextField
                                label="Titel"
                                type="text"
                                variant="outlined"
                                inputProps={{ maxLength: 100 }}
                                onChange={(event) => setTitle(event.target.value)}
                                fullWidth
                                autoFocus />
                        </Box>
                        <ArticleTypeSelection displayTooltip="none" />
                        <TagInput
                            parentCallbackTags={ callbackTagInput } />
                        <Button
                            variant="contained"
                            color="primary">Suchen</Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="articlelist-sorting">
                <SortingActions parentCallbackSortCriteria={callbackSortCriteria} />
            </div>
            <div className="articlelist-articledata">
                {displayArticleData(articleData)}
            </div>
            <Pagination
                paginationCount={ paginationCount }
                page={ currentPage }
                onChange={ getArticleList } />
        </div>
    )
}

export default Articlelist;