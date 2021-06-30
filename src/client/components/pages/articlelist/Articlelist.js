import React, { useState, useEffect } from 'react';

// own component imports
import Articlelistitem from '../../widgets/outputs/articlelistitem/Articlelistitem';

// material-ui imports
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    ButtonGroup,
    Typography
} from '@material-ui/core';

// material-ui icon imports
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// third-party imports
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Articlelist.css';

function Articlelist() {
    const [sortCriteria, setSortCriteria] = useState("createdAt");
    const [articleData, setArticleData] = useState([]);
    const [articleCreatorNames, setArticleCreatorNames] = useState([]);

    useEffect(() => {
        axios.get(`/getArticlelist/${sortCriteria}`)
        .then((response) => {
            const articleData = response.data;
            setArticleData(articleData);
            axios.get(`/getArticleCreatorNames/${sortCriteria}`)
            .then((response) => {
                setArticleCreatorNames(response.data);
            })
        }).catch((error) => {
            console.error("Articledata are not loaded", error);
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
                        TODO
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="articlelist-sorting">
                <ButtonGroup variant="text" size="small" color="primary">
                    <Button onClick={() => setSortCriteria("createdAt")}>Neuste</Button>
                    <Button onClick={() => setSortCriteria("voting")}>Voting</Button>
                    <Button onClick={() => setSortCriteria("answerCounter")}>Antworten</Button>
                </ButtonGroup>
            </div>
            <div>
                { displayArticleData(articleData) }
            </div>
        </div>
    )
}

export default Articlelist;