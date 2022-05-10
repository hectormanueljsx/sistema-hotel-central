import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Utilities/Loader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesTableCell } from '@/components/Habitaciones/stylesHabitaciones';

const columns = [
  { id: 'desc_tarifa', label: 'Descripción Tarifa', width: 432 },
  { id: 'num_personas', label: 'Número de Personas', width: 160 },
  { id: 'precio_aplicado', label: 'Precio Aplicado', width: 160 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewTarifas = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.tarifa;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000, height: 571.16 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Tarifas' />
      <Box component='div'>
        {loading && <Loader />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loading
                  ? null
                  : columns.map((column, index) => (
                      <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                        {column.label}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                const { descripcion, no_personas, precio } = item;
                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{no_personas}</TableCell>
                    <TableCell sx={stylesTableCell}>{precio}</TableCell>
                    <TableCell sx={stylesTableCell}></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loading ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        )}
      </Box>
    </Container>
  );
};

export default TableViewTarifas;
