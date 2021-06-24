import React, { useState } from 'react';

// own component imports
import ChoiceDialog from '../../dialogs/ChoiceDialog';

// third-party imports
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './ItemActions.css';

function ItemActions(props) {
    const [openDialog, setDialogOpen] = useState(false);

    const toArticleList = useHistory();

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const clickOnDelete = () => {
        axios({
            url: `/${props.deleteUrl}/${props.id}`,
            method: 'post',
        });
        toArticleList.push("/articlelist");
    }

    return (
        <div className="function-section">
            <ul>
                <li>Editieren</li>
                <li onClick={handleOpenDialog}>Löschen</li>
                <li>Melden</li>
            </ul>
            <ChoiceDialog 
                dialogOpen={ openDialog }
                handleCloseDialog={ handleCloseDialog }
                title={props.deleteDialogTitle}
                content={props.deleteDialogText}
                onYesButton={ clickOnDelete }
                onNoButton={ handleCloseDialog } />
        </div>
    )
}

export default ItemActions;