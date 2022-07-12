import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormSearchSaldoPendiente from '@/pages/Reportes/HabitacionSaldoPendiente/FormSearchSaldoPendiente';
import TableViewSaldoPendiente from '@/pages/Reportes/HabitacionSaldoPendiente/TableViewSaldoPendiente';
import { stylesBoxHistoricoReservacion } from '@/pages/Reportes/HabitacionSaldoPendiente/SaldoPendienteStyles';

const HabitacionSaldoPendiente = () => {
  const [search, setSearch] = useState('');
  const [dataHistorico, setDataHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxHistoricoReservacion}>
        <FormSearchSaldoPendiente
          setSearch={setSearch}
          dataHistorico={dataHistorico}
          setDataHistorico={setDataHistorico}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewSaldoPendiente
          search={search}
          dataHistorico={dataHistorico}
          loading={loading}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default HabitacionSaldoPendiente;
