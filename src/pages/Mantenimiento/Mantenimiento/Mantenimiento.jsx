import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import FormCreateMantenimiento from '@/pages/Mantenimiento/Mantenimiento/FormCreateMantenimiento';
import TableViewMantenimiento from '@/pages/Mantenimiento/Mantenimiento/TableViewMantenimiento';
import getGeneralSelect from '@/services/getGeneralSelect';
import getSpecificSelect from '@/services/getSpecificSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesWrapperGeneral } from '@/pages/Mantenimiento/Mantenimiento/MantenimientoStyles';

const Mantenimiento = () => {
  const [habitacion, setHabitacion] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);

  const endpointHabitacion = generalEndpoints.habitacion;
  const endpointCategoria = generalEndpoints.categoria;
  const attribute = 'categoria';
  const valueAttribute = 'MANTENIMIENTO';

  const getHabitacion = async () => {
    const res = await getGeneralSelect(endpointHabitacion);
    setHabitacion(res?.data);
  };

  const getCategoria = async () => {
    const res = await getSpecificSelect(endpointCategoria, attribute, valueAttribute);
    const { subcategorias } = res?.data[0];
    setSubcategoria(subcategorias);
  };

  useEffect(() => {
    getHabitacion();
    getCategoria();

    return () => {};
  }, []);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormCreateMantenimiento habitacion={habitacion} subcategoria={subcategoria} />
      <TableViewMantenimiento habitacion={habitacion} subcategoria={subcategoria} />
    </Box>
  );
};

export default Mantenimiento;
