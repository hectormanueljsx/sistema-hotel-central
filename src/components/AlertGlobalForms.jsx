import React, { forwardRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const AlertGlobalForms = ({ open, setOpen, messageInfo, messageSeverity }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    open ? setOpen(false) : setOpen(true);
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert sx={{ marginTop: 7 }} ref={ref} variant='filled' severity={messageSeverity}>
        {messageInfo}
      </MuiAlert>
    );
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={1300}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Slide}
    >
      <Alert />
    </Snackbar>
  );
};

export default AlertGlobalForms;
