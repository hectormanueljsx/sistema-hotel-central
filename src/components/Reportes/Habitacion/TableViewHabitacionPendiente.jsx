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
  TextField,
} from '@mui/material';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { historicalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesTableCell, stylesContainerInput } from '@/components/Reportes/stylesReportes';

const columns = [
  { id: 'num_registro', label: 'N° de Registro', width: 100 },
  { id: 'llegada', label: 'Llegada', width: 130 },
  { id: 'salida', label: 'Salida', width: 130 },
  { id: 'cliente', label: 'Cliente', width: 350 },
  { id: 'total', label: 'Total a Pagar', width: 150 },
  { id: 'pagado', label: 'Pagado', width: 150 },
  { id: 'restante', label: 'Restante', width: 150 },
  { id: 'estado', label: 'Estado', width: 192 },
];

const TableViewHabitacionPendiente = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const start = '0';
  const endpoint = `${historicalEndpoints.historicoHistorial}${start}`;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);

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
                const {
                  id,
                  fecha_hosp,
                  tarifa,
                  pagado,
                  registro: {
                    fecha_salida,
                    estado,
                    cliente: { nombre },
                  },
                } = item;

                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{fecha_hosp}</TableCell>
                    <TableCell sx={stylesTableCell}>{fecha_salida}</TableCell>
                    <TableCell sx={stylesTableCell}>{nombre}</TableCell>
                    <TableCell sx={stylesTableCell}>{tarifa}.00</TableCell>
                    <TableCell sx={stylesTableCell}>{pagado}.00</TableCell>
                    <TableCell sx={stylesTableCell}>{tarifa - pagado}.00</TableCell>
                    <TableCell sx={stylesTableCell}>{estado === '0' ? 'CHECK-OUT' : 'CHECK-IN'}</TableCell>
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

export default TableViewHabitacionPendiente;
