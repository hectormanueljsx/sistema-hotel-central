import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormSearchReservaciones from '@/pages/Reservas/HistoricoReservaciones/FormSearchReservaciones';
import TableViewHistoricoReservaciones from '@/pages/Reservas/HistoricoReservaciones/TableViewHistoricoReservaciones';
import { stylesWrapperGeneral } from '@/pages/Reservas/HistoricoReservaciones/HistoricoReservacionStyles';

const HistoricoReservaciones = () => {
  const [search, setSearch] = useState('');
  const [dataReservacion, setDataReservacion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
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
  );
};

export default HistoricoReservaciones;
