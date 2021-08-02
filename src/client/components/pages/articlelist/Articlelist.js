import React, { useState, useEffect } from 'react';

// own component imports
import Articlelistitem from '../../widgets/outputs/articlelistitem/Articlelistitem';
import SortingActions from '../../widgets/outputs/sortingactions/SortingActions';
import Pagination from '../../widgets/outputs/pagination/Pagination';
import { 
    getArticleCount,
    getArticlelist,
    getArticleCreatorNames
} from '../../utils/axios/article/ArticleFunctions';

// material-ui imports
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

// material-ui icon imports
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// third-party imports
import { Link } from 'react-router-dom';

import './Articlelist.css';

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
  }));

function Articlelist() {
    const classes = useStyles();

    const [sortCriteria, setSortCriteria] = useState("createdAt");
    const [articleData, setArticleData] = useState([]);
    const [articleCreatorNames, setArticleCreatorNames] = useState([]);
    const [paginationCount, setPaginationCount] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        getArticleList(page, page);
        getArticleCount().then((articleCountResponse) => {
            setPaginationCount(Math.ceil(articleCountResponse / 10)); 
        }).catch((error) => {
            console.error("Articlecount is not loaded", error);
        });
    }, [sortCriteria])

    const displayArticleData = (articles) => {
        return articles.map((article, index) => (
            <Articlelistitem
                id={article._id}
                index={index}
                title={article.title}
                tags={article.tags}
                voting={article.voting}
                answerCounter={article.answerCounter}
                views={article.views}
                creator={articleCreatorNames[index]}
                creatorId={article.creator}
                created={article.createdAt} />
        ));
    }

    const getArticleList = (event, currentPage) => {
        setPage(currentPage);
        getArticlelist(sortCriteria, currentPage).then((articlelistResponse) => {
            setArticleData(articlelistResponse);
            getArticleCreatorNames(sortCriteria).then((response) => {
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
                        TODO Filter implementieren
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="articlelist-sorting">
                <SortingActions parentCallbackSortCriteria={callbackSortCriteria} />
            </div>
            <div>
                {displayArticleData(articleData)}
            </div>
            <Pagination
                    paginationCount={ paginationCount }
                    page= { page }
                    onChange={ getArticleList } />
            
        </div>
    )
}

export default Articlelist;

/*<div className="articlelist-pagination">
                <Pagination
                    classes={{ ul: classes.ul }}
                    count={paginationCount}
                    page={page}
                    variant="outlined"
                    color="primary"
                    onChange={getArticleList} />
            </div>*/