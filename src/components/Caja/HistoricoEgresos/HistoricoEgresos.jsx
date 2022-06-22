import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormSearchHistoricoEgresos from '@/components/Caja/HistoricoEgresos/FormSearchHistoricoEgresos';
import TableViewHistoricoEgresos from '@/components/Caja/HistoricoEgresos/TableViewHistoricoEgresos';
import { stylesBoxHistoricoEgreso } from '@/components/Caja/HistoricoEgresos/HistoricoEgresosStyles';

const HistoricoEgresos = () => {
  const [search, setSearch] = useState('');
  const [dataEgreso, setDataEgreso] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxHistoricoEgreso}>
        <FormSearchHistoricoEgresos
          setSearch={setSearch}
          dataEgreso={dataEgreso}
          setDataEgreso={setDataEgreso}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewHistoricoEgresos search={search} dataEgreso={dataEgreso} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default HistoricoEgresos;
