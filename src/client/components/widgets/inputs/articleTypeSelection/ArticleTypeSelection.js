import React, { useState } from 'react';

// material-ui imports
import {
    Radio,
    FormLabel,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Tooltip
} from '@material-ui/core';

// material-ui icon imports
import HelpIcon from '@material-ui/icons/Help';

import './ArticleTypeSelection.css';

function ArticleTypeSelection({ displayTooltip, displayRadioButtonAll, selectedRadioButton, parentCallbackArticleType }) {
    const [articleType, setArticleType] = useState(selectedRadioButton);

    const handleArticleType = (event) => {
        setArticleType(event.target.value);
        parentCallbackArticleType(event.target.value);
    };

    return (
        <div className="article-type-selection">
            <FormControl component="fieldset">
                <div className="article-type-header">
                    <Tooltip style={{display: displayTooltip}} title={<div>Frage: Stelle der Community eine Frage zum Thema Finanzen.<br />Meinung: Frage andere Mitglieder nach ihrer Meinung zu einer Aktie, ETF, Versicherung, etc.<br />Erklärung: Erkläre anderen Mitgliedern ein Thema rund um Finanzen.</div>} placement="right" arrow>
                        <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <FormLabel style={{ color:"white" }} component="legend">Beitragstyp:</FormLabel>
                </div>
                <RadioGroup value={articleType} onChange={handleArticleType}>
                    <FormControlLabel value="all" control={<Radio />} label="Alles" style={{display: displayRadioButtonAll}} />
                    <FormControlLabel value="question" control={<Radio />} label="Frage" />
                    <FormControlLabel value="opinion" control={<Radio />} label="Meinung" />
                    <FormControlLabel value="explanation" control={<Radio />} label="Erklärung" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ArticleTypeSelection;