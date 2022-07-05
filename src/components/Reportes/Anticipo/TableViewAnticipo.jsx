import React, { useState } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesContainerSection,
  stylesDateTable,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Reportes/Anticipo/AnticipoStyles';

const columns = [
  { id: 'id', label: 'No. de Anticipo', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'cantidad', label: 'Forma de Pago', width: 300 },
  { id: 'no_reservacion', label: 'Cantidad Pagada', width: 172 },
  { id: 'f_pago', label: 'Reserva', width: 140 },
];

const TableViewAnticipo = ({ dataSearch, dateTable, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let totalCantidad = 0;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Histórico de Anticipos' />
      <Typography sx={stylesDateTable}>{dateTable}</Typography>
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
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCell}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCell}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const {
                  id,
                  fecha,
                  cantidad,
                  pago: { f_pago },
                  reservacion,
                } = item;
                totalCantidad += cantidad;
                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                    <TableCell sx={stylesTableCell}>{f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>{cantidad}</TableCell>
                    <TableCell sx={stylesTableCell}>{reservacion.id}</TableCell>
                  </TableRow>
                );
              })}
              {totalCantidad === 0 ? null : (
                <TableRow>
                  <TableCell sx={stylesTableCell}>Total</TableCell>
                  <TableCell sx={stylesTableCell}></TableCell>
                  <TableCell sx={stylesTableCell}></TableCell>
                  <TableCell sx={stylesTableCell}>
                    {totalCantidad.toLocaleString('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              )}
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
