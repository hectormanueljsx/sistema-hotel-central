import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormSearchReservaciones from '@/components/Reservas/HistoricoReservaciones/FormSearchReservaciones';
import TableViewHistoricoReservaciones from '@/components/Reservas/HistoricoReservaciones/TableViewHistoricoReservaciones';
import { stylesBoxHistoricoReservacion } from '@/components/Reservas/HistoricoReservaciones/HistoricoReservacionStyles';

const HistoricoReservaciones = () => {
  const [search, setSearch] = useState('');
  const [dataReservacion, setDataReservacion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxHistoricoReservacion}>
        <FormSearchReservaciones
          setSearch={setSearch}
          dataReservacion={dataReservacion}
          setDataReservacion={setDataReservacion}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewHistoricoReservaciones
          search={search}
          dataReservacion={dataReservacion}
          loading={loading}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default HistoricoReservaciones;
