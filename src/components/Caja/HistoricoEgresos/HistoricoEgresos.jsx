import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormSearchHistoricoEgresos from '@/components/Caja/HistoricoEgresos/FormSearchHistoricoEgresos';
import TableViewHistoricoEgresos from '@/components/Caja/HistoricoEgresos/TableViewHistoricoEgresos';

const HistoricoEgresos = () => {
  const [search, setSearch] = useState('');
  const [dataEgreso, setDataEgreso] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormSearchHistoricoEgresos
          setSearch={setSearch}
          setDataEgreso={setDataEgreso}
          setLoading={setLoading}
          setError={setError}
          dataEgreso={dataEgreso}
        />
        <TableViewHistoricoEgresos search={search} dataEgreso={dataEgreso} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default HistoricoEgresos;
