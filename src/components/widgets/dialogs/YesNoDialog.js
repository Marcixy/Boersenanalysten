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


function YesNoDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Dialog open={dialogOpen} keepMounted onClose={handleCloseDialog}>
            <DialogTitle>Ausloggen?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Wollen Sie sich wirklich ausloggen?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={signOut} color="primary">
                    Ja
                </Button>
                <Button onClick={handleCloseDialog} color="primary">
                    Nein
                </Button>
                </DialogActions>
        </Dialog>
    )
}

export default YesNoDialog;