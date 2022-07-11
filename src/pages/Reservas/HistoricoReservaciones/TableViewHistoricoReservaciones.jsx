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

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/HistoricoReservaciones/HistoricoReservacionStyles';

const columns = [
  { id: 'llegada', label: 'Fecha de Llegada', width: 160 },
  { id: 'salida', label: 'Fecha de Salida', width: 160 },
  { id: 'cliente', label: 'Nombre del Cliente', width: 436 },
  { id: 'estado', label: 'Estado', width: 150 },
  { id: 'acciones', label: 'Acciones', width: 80 },
];

const TableViewHistoricoReservaciones = ({ search, dataReservacion, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterCliente =
    dataReservacion.length > 0
      ? dataReservacion.filter(item => item.cliente.nombre.toUpperCase().includes(search.toUpperCase()))
      : [];

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Históricos de Reservaciones' />
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
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              ) : filterCliente.length > 0 ? (
                filterCliente.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                  const {
                    id,
                    fecha,
                    fecha_salida,
                    cliente: { nombre },
                    est,
                  } = item;

                  return (
                    <TableRow
                      key={id}
                      sx={
                        est === 'CHECK-OUT'
                          ? { backgroundColor: '#d4edda' }
                          : est === 'SIN CHECK-OUT'
                          ? { backgroundColor: '#fff3cd' }
                          : { backgroundColor: '#f8d7da' }
                      }
                    >
                      <TableCell sx={stylesTableCellBody}>{fecha}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{fecha_salida}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{est}</TableCell>
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
                    <AlertGlobalTables messageError='No se encontraron datos para esta tabla' />
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
            count={filterCliente.length}
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

export default TableViewHistoricoReservaciones;
