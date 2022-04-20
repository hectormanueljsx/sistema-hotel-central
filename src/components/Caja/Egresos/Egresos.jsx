import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateEgresos from './FormCreateEgresos';
import TableViewEgresos from './TableViewEgresos';

const Egresos = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormCreateEgresos />
        <TableViewEgresos />
      </Box>
    </Container>
  );
};

export default Egresos;
