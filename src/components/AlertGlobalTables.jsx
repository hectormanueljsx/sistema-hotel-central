import React from 'react';
import { Alert, Box, CssBaseline } from '@mui/material';

import { stylesLoaderAlertRender } from '@/components/stylesGlobals';

const AlertGlobalTables = ({ messageError }) => {
  return (
    <Box sx={stylesLoaderAlertRender}>
      <CssBaseline />
      <Alert icon={false} variant='filled' severity='error'>
        {messageError}
      </Alert>
    </Box>
  );
};

export default AlertGlobalTables;
