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
    const [articleData, setArticleData] = useState([]);
    let [creatorData, setCreatorData] = useState("");

    useEffect(() => {
        // TODO hier weitermachen und getArticlelist und getUserById zusammenlegen in eine get Route überlegen?
        axios.get('/getArticlelist')
        .then((response) => {
            const articleData = response.data;
            setArticleData(articleData);
            console.log(articleData);
            articleData.forEach((article) => {
                axios.get('/getUserById', {
                    params: {
                        _id: article.creator
                    }
                })
                .then((userResponse) => {
                    const creatorData = userResponse.data;
                    console.log(creatorData);
                    setCreatorData(creatorData);
                })
            });
        })
        .catch((error) => {
            console.error("Articledata are not loaded", error);
        });
    }, [])

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
                creator={creatorData.username}
                creatorId={creatorData._id}
                creatorShareCount={creatorData.shareCounter}
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
                    <Button>Neuste</Button>
                    <Button>Voting</Button>
                    <Button>Antworten</Button>
                </ButtonGroup>
            </div>
            <div>
                { displayArticleData(articleData) }
            </div>
        </div>
    )
}

export default Articlelist;