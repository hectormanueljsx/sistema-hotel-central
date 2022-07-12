import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormSearchSaldoPendiente from '@/pages/Reportes/HabitacionSaldoPendiente/FormSearchSaldoPendiente';
import TableViewSaldoPendiente from '@/pages/Reportes/HabitacionSaldoPendiente/TableViewSaldoPendiente';
import { stylesWrapperGeneral } from '@/pages/Reportes/HabitacionSaldoPendiente/HabitacionSaldoPendienteStyles';

const HabitacionSaldoPendiente = () => {
  const [search, setSearch] = useState('');
  const [dataHistorico, setDataHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormSearchSaldoPendiente
        setSearch={setSearch}
        dataHistorico={dataHistorico}
        setDataHistorico={setDataHistorico}
        setLoading={setLoading}
        setError={setError}
      />
      <TableViewSaldoPendiente search={search} dataHistorico={dataHistorico} loading={loading} error={error} />
    </Box>
  );
};

export default HabitacionSaldoPendiente;
