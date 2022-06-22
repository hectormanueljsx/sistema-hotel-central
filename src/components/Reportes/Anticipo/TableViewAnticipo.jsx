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
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import { stylesContainerSection, stylesTableCell } from '@/components/Reportes/Anticipo/AnticipoStyles';

const columns = [
  { id: 'id', label: 'N° Anticipo', width: 120 },
  { id: 'fecha', label: 'Fecha', width: 250 },
  { id: 'cantidad', label: 'Forma de pago', width: 250 },
  { id: 'no_reservacion', label: 'Cantidad Pagada', width: 200 },
  { id: 'f_pago', label: 'Reserva', width: 120 },
];

const TableViewAnticipo = ({ dataSearch, status, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(dataSearch);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Historico de Anticipos' />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loading || error
                  ? null
                  : columns.map((column, index) => (
                      <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                        {column.label}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const {
                  id,
                  fecha,
                  cantidad,
                  pago: { f_pago },
                  reservacion,
                } = item;
                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                    <TableCell sx={stylesTableCell}>{cantidad}</TableCell>
                    <TableCell sx={stylesTableCell}>{f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>{reservacion.id}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loading || error ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={dataSearch.length}
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

export default TableViewAnticipo;
