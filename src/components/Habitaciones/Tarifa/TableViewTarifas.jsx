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

const columns = [
  { id: 'desc_tarifa', label: 'Descripción Tarifa', width: 432 },
  { id: 'num_personas', label: 'Número de Personas', width: 160 },
  { id: 'precio_aplicado', label: 'Precio Aplicado', width: 160 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewTarifas = () => {
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
              <TableRow>
                <TableCell sx={stylesTableCell}>AUXILIAR PROMO</TableCell>
                <TableCell sx={stylesTableCell}>1</TableCell>
                <TableCell sx={stylesTableCell}>400</TableCell>
                <TableCell sx={stylesTableCell}>Acciones</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewTarifas;
