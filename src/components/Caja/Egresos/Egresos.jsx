import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateEgresos from '@/components/Caja/Egresos/FormCreateEgresos';
import TableViewEgresos from '@/components/Caja/Egresos/TableViewEgresos';

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
