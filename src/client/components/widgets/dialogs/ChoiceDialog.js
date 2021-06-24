import React, { useState } from 'react';

// material-ui imports
import { 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';

function ChoiceDialog(props) {
    // TODO hier weitermachen openDialog und handleCloseDialog werden nur
    // als Parameter übergeben müsste in diese Komponente verlagert werden können.
    const [openDialog, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: '#212121',
                    color: 'white',
                },
            }}
            keepMounted
            open={props.dialogOpen}
            onClose={props.handleCloseDialog}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{color: 'white'}}>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onYesButton} color="primary">
                    Ja
                </Button>
                <Button onClick={props.onNoButton} color="primary">
                    Nein
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChoiceDialog;