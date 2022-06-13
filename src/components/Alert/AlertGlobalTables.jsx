import React from 'react';
import { Alert, Box } from '@mui/material';

import { stylesErrorTable } from '@/components/Alert/AlertStyles';

const AlertGlobalTables = ({ messageError }) => {
  return (
    <Box sx={stylesErrorTable}>
      <Alert icon={false} variant='filled' severity='error'>
        {messageError}
      </Alert>
    </Box>
  );
};

export default AlertGlobalTables;
