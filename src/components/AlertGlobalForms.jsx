import React from 'react';
import { Alert } from '@mui/material';

const AlertGlobalForms = ({ message, severity }) => {
  return (
    <Alert variant='outlined' severity={severity}>
      {message}
    </Alert>
  );
};

export default AlertGlobalForms;
