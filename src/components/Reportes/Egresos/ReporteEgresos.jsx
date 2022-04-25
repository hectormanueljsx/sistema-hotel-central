import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormConsultEgresos from './FormConsultEgresos'
import TableViewEgresos from './TableViewEgresos';

const Anticipo = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormConsultEgresos />
        <TableViewEgresos />
      </Box>
    </Container>
  );
};

export default Anticipo;
