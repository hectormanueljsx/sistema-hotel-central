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

import TitlePage from '../../TitlePage';
import { stylesContainerSection, stylesTableCell } from '../stylesHabitaciones';

const columns = [
  { id: 'nombre', label: 'Nombre', width: 412 },
  { id: 'rol', label: 'Rol', width: 140 },
  { id: 'ultimo_ingreso', label: 'Último Ingreso', width: 200 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewUsuarios = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Usuarios' />
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
                <TableCell sx={stylesTableCell}>Anna</TableCell>
                <TableCell sx={stylesTableCell}>1</TableCell>
                <TableCell sx={stylesTableCell}>2022-04-22 13:47:14</TableCell>
                <TableCell sx={stylesTableCell}>Acciones</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewUsuarios;
