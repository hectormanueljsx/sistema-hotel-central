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
  { id: 'desc_categoria', label: 'Descripción Categoría', width: 352 },
  { id: 'desc_subcategoria', label: 'Descripción Subcategoría', width: 600 },
];

const TableViewCategoriaEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Categorías Registradas' />
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
                <TableCell sx={stylesTableCell}>CONSUMIBLES</TableCell>
                <TableCell sx={stylesTableCell}>REFRESCOS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewCategoriaEgresos;
