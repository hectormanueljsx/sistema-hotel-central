import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormSearchRegistro from '@/components/Reservas/HistoricoRegistro/FormSearchRegistro';
import TableViewHistoricoRegistro from '@/components/Reservas/HistoricoRegistro/TableViewHistoricoRegistro';
import { stylesBoxHistoricoRegistro } from '@/components/Reservas/HistoricoRegistro/HistoricoRegistroStyles';

const HistoricoRegistro = () => {
  const [search, setSearch] = useState('');
  const [dataRegistro, setDataRegistro] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxHistoricoRegistro}>
        <FormSearchRegistro
          setSearch={setSearch}
          dataRegistro={dataRegistro}
          setDataRegistro={setDataRegistro}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewHistoricoRegistro search={search} dataRegistro={dataRegistro} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default HistoricoRegistro;
