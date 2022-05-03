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
import { stylesContainerSection, stylesTableCell } from '@/components/Caja/stylesCaja';

const columns = [
  { id: 'num_gasto', label: 'N° Gasto', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 250 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'detalles', label: 'Detalles', width: 250 },
];

const TableViewHistoricoEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Histórico de Egresos' />
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
                <TableCell sx={stylesTableCell}>1.00</TableCell>
                <TableCell sx={stylesTableCell}>EN CAJA</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewHistoricoEgresos;
