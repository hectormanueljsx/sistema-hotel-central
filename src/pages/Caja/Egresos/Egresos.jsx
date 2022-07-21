import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import FormCreateEgresos from '@/pages/Caja/Egresos/FormCreateEgresos';
import TableViewEgresos from '@/pages/Caja/Egresos/TableViewEgresos';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesWrapperGeneral } from '@/pages/Caja/Egresos/EgresosStyles';

const Egresos = () => {
  const [pago, setPago] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const endpointPago = generalEndpoints.pago;
  const endpointCategoria = generalEndpoints.categoria;

  const getPago = async () => {
    const res = await getGeneralSelect(endpointPago);
    setPago(res.data);
  };

  const getCategoria = async () => {
    const res = await getGeneralSelect(endpointCategoria);
    setCategoria(res.data);
  };

  useEffect(() => {
    getPago();
    getCategoria();
  }, []);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormCreateEgresos pago={pago} categoria={categoria} />
      <TableViewEgresos pago={pago} categoria={categoria} />
    </Box>
  );
};

export default Egresos;
