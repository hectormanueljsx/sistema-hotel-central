import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import LoaderSkeleton from '@/components/Loader/LoaderSkeleton';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import {
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/HistoricoRegistro/HistoricoRegistroStyles';

const columns = [
  { id: 'llegada', label: 'Fecha de Llegada', width: 180 },
  { id: 'salida', label: 'Fecha de Salida', width: 180 },
  { id: 'cliente', label: 'Nombre del Cliente', width: 396 },
  { id: 'estado', label: 'Estado', width: 150 },
  { id: 'acciones', label: 'Acciones', width: 80 },
];

const TableViewHistoricoEgresos = ({ search, dataRegistro, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterCliente =
    dataRegistro?.length > 0
      ? dataRegistro?.filter(item => item?.cliente?.nombre?.toUpperCase()?.includes(search?.toUpperCase()))
      : [];

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Históricos de Registros' />
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
                    <LoaderSkeleton />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageErrorGetData} />
                  </TableCell>
                </TableRow>
              ) : filterCliente?.length > 0 ? (
                filterCliente?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(item => {
                  const {
                    id,
                    fecha,
                    fecha_salida,
                    cliente: { nombre },
                    estado,
                    hora_llegada,
                    hora_salida,
                  } = item;

                  return (
                    <TableRow key={id} sx={estado ? { backgroundColor: '#d4edda' } : { backgroundColor: '#fff3cd' }}>
                      <TableCell sx={stylesTableCellBody}>{`${fecha} ${moment(hora_llegada, 'hh:mm:ss').format(
                        'hh:mm:ss a',
                      )}`}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{`${fecha_salida} ${moment(hora_salida, 'hh:mm:ss').format(
                        'hh:mm:ss a',
                      )}`}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{estado ? 'CHECK-OUT' : 'SIN CHECK-OUT'}</TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        <IconButton color='info' size='small'>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
        {loading ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={filterCliente?.length}
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

export default TableViewHistoricoEgresos;
