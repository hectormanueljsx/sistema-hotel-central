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
  { id: 'num_gasto', label: 'N° Gasto', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 200 },
  { id: 'categoria', label: 'Categoria', width: 200 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Historico de Egresos' />
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
                <TableCell sx={stylesTableCell}>IMPRESIONES</TableCell>
                <TableCell sx={stylesTableCell}>PAPELERIA</TableCell>
                <TableCell sx={stylesTableCell}>1.00</TableCell>
                <TableCell sx={stylesTableCell}>Ver</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewEgresos;
