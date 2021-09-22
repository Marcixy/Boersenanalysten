import React, { useState } from 'react';

// material-ui imports
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import './Snackbar.css';

// TODO muss noch fertig implementiert werden
function SnackbarAction({ message, severity, parentCallbackShowSnackbar }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    //const showSnackbar = () => { setOpenSnackbar(true); };
    const handleClose = () => { setOpenSnackbar(false); };
    const setShowSnackbar = (showSnackbar) => { parentCallbackShowSnackbar(showSnackbar); }

    return (
        <div className="snackbar">
            <Snackbar
                //open={openSnackbar}
                open={setShowSnackbar(true)}
                autoHideDuration={2000}
                onClose={handleClose}>
                <Alert 
                    severity={severity}
                    onClose={() => handleClose()}
                    style={{backgroundColor: '#4D9A51', color: 'white'}}>{message}</Alert>
            </Snackbar>
        </div>
    )
}

export default SnackbarAction;