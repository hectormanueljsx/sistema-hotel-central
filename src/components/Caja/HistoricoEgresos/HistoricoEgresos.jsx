import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormSearchHistoricoEgresos from '@/components/Caja/HistoricoEgresos/FormSearchHistoricoEgresos';
import TableViewHistoricoEgresos from '@/components/Caja/HistoricoEgresos/TableViewHistoricoEgresos';

const HistoricoEgresos = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormSearchHistoricoEgresos />
        <TableViewHistoricoEgresos />
      </Box>
    </Container>
  );
};

export default HistoricoEgresos;
