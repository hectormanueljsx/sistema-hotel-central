import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormSearchHistoricoEgresos from '@/pages/Caja/HistoricoEgresos/FormSearchHistoricoEgresos';
import TableViewHistoricoEgresos from '@/pages/Caja/HistoricoEgresos/TableViewHistoricoEgresos';
import { stylesWrapperGeneral } from '@/pages/Caja/HistoricoEgresos/HistoricoEgresosStyles';

const HistoricoEgresos = () => {
  const [search, setSearch] = useState('');
  const [dataEgreso, setDataEgreso] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormSearchHistoricoEgresos
        setSearch={setSearch}
        dataEgreso={dataEgreso}
        setDataEgreso={setDataEgreso}
        setLoading={setLoading}
        setError={setError}
      />
      <TableViewHistoricoEgresos search={search} dataEgreso={dataEgreso} loading={loading} error={error} />
    </Box>
  );
};

export default HistoricoEgresos;
