import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormIngresoBruto from '@/components/Reportes/IngresoBruto/FormIngresoBruto';
import TableViewIngresoBruto from '@/components/Reportes/IngresoBruto/TableViewIngresoBruto';

const IngresoBruto = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dataPago, setDataPago] = useState([]);
  const [dataRegistro, setDataRegistro] = useState([]);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container maxWidth='xl'>
      <Box sx={{ display: 'flex' }}>
        <FormIngresoBruto
          setDataSearch={setDataSearch}
          setStatus={setStatus}
          setLoading={setLoading}
          setError={setError}
          setDataPago={setDataPago}
          setDataRegistro={setDataRegistro}
        />
        <TableViewIngresoBruto
          dataSearch={dataSearch}
          status={status}
          loading={loading}
          error={error}
          dataPago={dataPago}
          dataRegistro={dataRegistro}
        />
      </Box>
    </Container>
  );
};

export default IngresoBruto;
