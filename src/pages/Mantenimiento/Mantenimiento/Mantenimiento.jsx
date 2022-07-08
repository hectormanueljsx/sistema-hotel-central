import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';

import FormCreateMantenimiento from '@/pages/Mantenimiento/Mantenimiento/FormCreateMantenimiento';
import TableViewMantenimiento from '@/pages/Mantenimiento/Mantenimiento/TableViewMantenimiento';
import getGeneralSelect from '@/services/getGeneralSelect';
import getSpecificSelect from '@/services/getSpecificSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesBoxMantenimiento } from '@/pages/Mantenimiento/Mantenimiento/MantenimientoStyles';

const Mantenimiento = () => {
  const [habitacion, setHabitacion] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;
  const endpointCategoria = generalEndpoints.categoria;
  const attribute = 'categoria';
  const valueAttribute = 'MANTENIMIENTO';

  const getHabitacion = async () => {
    const res = await getGeneralSelect(identifier, password, endpointHabitacion);
    setHabitacion(res.data);
  };

  const getCategoria = async () => {
    const res = await getSpecificSelect(identifier, password, endpointCategoria, attribute, valueAttribute);
    const { subcategorias } = res.data[0];
    setSubcategoria(subcategorias);
  };

  useEffect(() => {
    getHabitacion();
    getCategoria();
  }, []);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxMantenimiento}>
        <FormCreateMantenimiento habitacion={habitacion} subcategoria={subcategoria} />
        <TableViewMantenimiento habitacion={habitacion} subcategoria={subcategoria} />
      </Box>
    </Container>
  );
};

export default Mantenimiento;
