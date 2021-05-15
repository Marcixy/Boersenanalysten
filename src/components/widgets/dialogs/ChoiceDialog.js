import React from 'react';

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
            <DialogTitle>Ausloggen?</DialogTitle>
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