import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormCreateEmpresas from '@/components/Reservas/Empresa/FormCreateEmpresas';
import FormSearchEmpresa from '@/components/Reservas/Empresa/FormSearchEmpresa';
import TableViewEmpresas from '@/components/Reservas/Empresa/TableViewEmpresas';
import { stylesBoxEmpresa, stylesBoxSearchTable } from '@/components/Reservas/Empresa/EmpresaStyle';

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
