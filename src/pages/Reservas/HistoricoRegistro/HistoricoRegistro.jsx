import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormSearchRegistro from '@/pages/Reservas/HistoricoRegistro/FormSearchRegistro';
import TableViewHistoricoRegistro from '@/pages/Reservas/HistoricoRegistro/TableViewHistoricoRegistro';
import { stylesWrapperGeneral } from '@/pages/Reservas/HistoricoRegistro/HistoricoRegistroStyles';

const HistoricoRegistro = () => {
  const [search, setSearch] = useState('');
  const [dataRegistro, setDataRegistro] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormSearchRegistro
        setSearch={setSearch}
        dataRegistro={dataRegistro}
        setDataRegistro={setDataRegistro}
        setLoading={setLoading}
        setError={setError}
      />
      <TableViewHistoricoRegistro search={search} dataRegistro={dataRegistro} loading={loading} error={error} />
    </Box>
  );
};

export default HistoricoRegistro;
