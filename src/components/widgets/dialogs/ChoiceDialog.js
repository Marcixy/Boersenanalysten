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
            open={props.dialogOpen}
            keepMounted
            onClose={props.handleCloseDialog}>
            <DialogTitle>Ausloggen?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Wollen Sie sich wirklich ausloggen?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.signOut} color="primary">
                    Ja
                </Button>
                <Button onClick={props.handleCloseDialog} color="primary">
                    Nein
                </Button>
                </DialogActions>
        </Dialog>
    )
}

export default ChoiceDialog;