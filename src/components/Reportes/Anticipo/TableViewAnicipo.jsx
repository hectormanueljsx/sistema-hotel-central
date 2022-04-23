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
import { stylesContainerSection, stylesTableCell } from '../stylesReporte';

const columns = [
  { id: 'id', label: 'N° Anticipo', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'cantidad', label: 'Cantidad', width: 200 },
  { id: 'no_reservacion', label: 'Reservacion', width: 152 },
  { id: 'f_pago', label: 'Forma de Pago', width: 200 },
];

const TableViewAnicipo = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Historico de Anticipos' />
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
                <TableCell sx={stylesTableCell}>16913</TableCell>
                <TableCell sx={stylesTableCell}>2022-02-23 12:08:35</TableCell>
                <TableCell sx={stylesTableCell}>250.22</TableCell>
                <TableCell sx={stylesTableCell}>1</TableCell>
                <TableCell sx={stylesTableCell}>EFECTIVO</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewAnicipo;
