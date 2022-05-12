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
  TextField,
} from '@mui/material';

import TitlePage from '@/components/TitlePage';
import { stylesContainerSection, stylesTableCell, stylesContainerInput } from '@/components/Reportes/stylesReportes';

const columns = [
  { id: 'num_registro', label: 'N° de Registro', width: 100 }, //
  { id: 'llegada', label: 'Llegada', width: 130 },
  { id: 'salida', label: 'Salida', width: 130 },
  { id: 'cliente', label: 'Cliente', width: 350 },
  { id: 'total', label: 'Total a Pagar', width: 150 },
  { id: 'pagado', label: 'Pagado', width: 150 },
  { id: 'restante', label: 'Restante', width: 150 },
  { id: 'estado', label: 'Estado', width: 192 },
];

const TableViewHabitacionPendiente = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl' sx={[stylesContainerSection, { width: 1400 }]}>
      <CssBaseline />
      <TitlePage titlePage='Histórico de Egresos' />
      <Box component='div' sx={[stylesContainerInput, { width: 400 }]}>
        <TextField
          variant='outlined'
          type='search'
          margin='none'
          size='small'
          placeholder='Egreso'
          required
          fullWidth
          autoFocus
        />
      </Box>
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
                <TableCell sx={stylesTableCell}>206062</TableCell>
                <TableCell sx={stylesTableCell}>23-02-2022</TableCell>
                <TableCell sx={stylesTableCell}>24-02-2022</TableCell>
                <TableCell sx={stylesTableCell}>RUFINO YTURBE SANTIAGO</TableCell>
                <TableCell sx={stylesTableCell}>10,220.00</TableCell>
                <TableCell sx={stylesTableCell}>7,480.00</TableCell>
                <TableCell sx={stylesTableCell}>1590.00</TableCell>
                <TableCell sx={stylesTableCell}>CHECK-OUT</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewHabitacionPendiente;
