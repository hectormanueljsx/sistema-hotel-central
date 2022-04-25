import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormEgresos from '@/components/Reportes/Egresos/FormEgresos';
import TableViewEgresos from '@/components/Reportes/Egresos/TableViewEgresos';

const Egresos = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormEgresos />
        <TableViewEgresos />
      </Box>
    </Container>
  );
};

export default Egresos;
