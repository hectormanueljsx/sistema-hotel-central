import React from 'react';
import { Alert } from '@mui/material';

const AlertGlobalForms = ({ messageError, severity }) => {
  return (
    <Alert variant='outlined' severity={severity}>
      {messageError}
    </Alert>
  );
};

export default AlertGlobalForms;
