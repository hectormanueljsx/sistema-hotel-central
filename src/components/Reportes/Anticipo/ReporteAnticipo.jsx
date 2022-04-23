import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormConsultAnticipo from './FormConsultAnticipo'
import TableViewAnicipo from './TableViewAnicipo';

const Anticipo = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormConsultAnticipo />
        <TableViewAnicipo />
      </Box>
    </Container>
  );
};

export default Anticipo;
