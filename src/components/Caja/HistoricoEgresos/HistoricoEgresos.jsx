import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import TableViewHistoricoEgresos from './TableViewHistoricoEgresos';

const HistoricoEgresos = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TableViewHistoricoEgresos />
      </Box>
    </Container>
  );
};

export default HistoricoEgresos;
