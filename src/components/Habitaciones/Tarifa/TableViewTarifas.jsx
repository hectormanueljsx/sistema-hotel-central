import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import TitlePage from '@/components/TitlePage';
import { stylesContainerSection, stylesTableCell } from '@/components/Habitaciones/stylesHabitaciones';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '../../../utilities/endpoints';

const columns = [
  { id: 'desc_tarifa', label: 'Descripción Tarifa', width: 432 },
  { id: 'num_personas', label: 'Número de Personas', width: 160 },
  { id: 'precio_aplicado', label: 'Precio Aplicado', width: 160 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewTarifas = () => {
  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.tarifa;

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);
  console.log(list);

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Tarifas' />
      <Box component='div'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, index) => {
                const { descripcion, no_personas, precio } = item;
                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{no_personas}</TableCell>
                    <TableCell sx={stylesTableCell}>{precio}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewTarifas;
