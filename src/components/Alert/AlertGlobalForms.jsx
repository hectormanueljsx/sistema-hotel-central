import React, { forwardRef } from 'react';
import { Alert as MuiAlert, Slide, Snackbar } from '@mui/material';

import { stylesMuiAlert } from '@/components/Alert/AlertStyles';

const AlertGlobalForms = ({ open, setOpen, messageInfo, messageSeverity }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    open ? setOpen(false) : setOpen(true);
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert sx={stylesMuiAlert} ref={ref} variant='filled' severity={messageSeverity}>
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
