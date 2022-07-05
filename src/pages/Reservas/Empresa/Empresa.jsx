import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormCreateEmpresas from '@/pages/Reservas/Empresa/FormCreateEmpresas';
import FormSearchEmpresa from '@/pages/Reservas/Empresa/FormSearchEmpresa';
import TableViewEmpresas from '@/pages/Reservas/Empresa/TableViewEmpresas';
import { stylesBoxEmpresa, stylesBoxSearchTable } from '@/pages/Reservas/Empresa/EmpresaStyle';

const Empresa = () => {
  const [search, setSearch] = useState('');
  const [dataEmpresa, setDataEmpresa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxEmpresa}>
        <FormCreateEmpresas />
        <Box sx={stylesBoxSearchTable}>
          <FormSearchEmpresa
            setSearch={setSearch}
            setDataEmpresa={setDataEmpresa}
            dataEmpresa={dataEmpresa}
            setLoading={setLoading}
            setError={setError}
          />
          <TableViewEmpresas search={search} dataEmpresa={dataEmpresa} loading={loading} error={error} />
        </Box>
      </Box>
    </Container>
  );
};

export default Empresa;
