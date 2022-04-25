import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormAnticipo from '@/components/Reportes/Anticipo/FormAnticipo';
import TableViewAnticipo from '@/components/Reportes/Anticipo/TableViewAnticipo';

const Anticipo = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormAnticipo />
        <TableViewAnticipo />
      </Box>
    </Container>
  );
};

export default Anticipo;
