import React, { useState } from 'react';
import {
  Box,
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
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import {
  stylesDateTable,
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/Anticipo/AnticipoStyles';

const columns = [
  { id: 'fecha', label: 'Fecha', width: 240 },
  { id: 'cantidad', label: 'Forma de Pago', width: 364 },
  { id: 'no_reservacion', label: 'Cantidad Pagada', width: 212 },
  { id: 'f_pago', label: 'Reserva', width: 170 },
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
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Históricos de Anticipos' />
      <Typography component='p' sx={stylesDateTable}>
        {dateTable}
      </Typography>
      <Box component='div'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={[stylesTableCellHeader, { width: column.width }]}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageErrorGetData} />
                  </TableCell>
                </TableRow>
              ) : dataSearch.length > 0 ? (
                dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
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
                      <TableCell sx={stylesTableCellBody}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{f_pago}</TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        {cantidad.toLocaleString('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell sx={stylesTableCellBody}>{reservacion.id}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageEmptyGetData} />
                  </TableCell>
                </TableRow>
              )}
              {totalCantidad === 0 ? null : (
                <TableRow>
                  <TableCell sx={[stylesTableCellBody, { fontWeight: '500' }]}>Total</TableCell>
                  <TableCell sx={stylesTableCellBody}></TableCell>
                  <TableCell sx={stylesTableCellBody}>
                    {totalCantidad.toLocaleString('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell sx={stylesTableCellBody}></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {loading ? null : (
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
    </Box>
  );
};

export default TableViewAnticipo;
