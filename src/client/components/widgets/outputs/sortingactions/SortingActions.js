import React from 'react';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

import './SortingActions.css';

function SortingActions({ parentCallbackSortCriteria }) {

    const setNewSortCriteria = (newSortCriteria) => { parentCallbackSortCriteria(newSortCriteria); }

    return (
        <ButtonGroup variant="text" size="small" color="primary">
            <Button onClick={() => setNewSortCriteria("createdAt")}>Neuste</Button>
            <Button onClick={() => setNewSortCriteria("voting")}>Voting</Button>
            <Button onClick={() => setNewSortCriteria("answerCounter")}>Antworten</Button>
        </ButtonGroup>
    )
}

export default SortingActions;