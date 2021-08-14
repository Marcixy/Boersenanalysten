import React, { useState } from 'react';

// material-ui imports
import {
    Radio,
    FormLabel,
    RadioGroup,
    FormControl,
    FormControlLabel 
} from '@material-ui/core';

import './ArticleTypeSelection.css';

function ArticleTypeSelection() {
    const [articleType, setArticleType] = useState("question");

    const handleArticleType = (event) => {
        setArticleType(event.target.value);
    };

    return (
        <div className="article-type-selection">
            <FormControl component="fieldset">
                <FormLabel style={{ color:"white" }} component="legend">Beitragstyp:</FormLabel>
                <RadioGroup value={articleType} onChange={handleArticleType}>
                    <FormControlLabel value="question" control={<Radio />} label="Frage" />
                    <FormControlLabel value="opinion" control={<Radio />} label="Meinung" />
                    <FormControlLabel value="portfolio" control={<Radio />} label="Portfolio Beitrag" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ArticleTypeSelection;