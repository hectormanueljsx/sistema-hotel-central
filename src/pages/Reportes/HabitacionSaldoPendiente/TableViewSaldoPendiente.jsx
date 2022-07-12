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
  stylesTextDanger,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/HabitacionSaldoPendiente/HabitacionSaldoPendienteStyles';

const columns = [
  { id: 'llegada', label: 'Fecha de Llegada', width: 125 },
  { id: 'salida', label: 'Fecha de Salida', width: 125 },
  { id: 'cliente', label: 'Cliente', width: 241 },
  { id: 'total', label: 'Total a Pagar', width: 100 },
  { id: 'pagado', label: 'Pagado', width: 100 },
  { id: 'restante', label: 'Restante', width: 100 },
  { id: 'estado', label: 'Estado', width: 115 },
  { id: 'acciones', label: 'Acciones', width: 80 },
];

const TableViewSaldoPendiente = ({ search, dataHistorico, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterCliente =
    dataHistorico.length > 0
      ? dataHistorico.filter(item => item.registro.cliente.nombre.toUpperCase().includes(search.toUpperCase()))
      : [];

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Habitaciones con Saldos Pendientes' />
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
                    fecha_hosp,
                    tarifa,
                    pagado,
                    registro: {
                      fecha_salida,
                      estado,
                      cliente: { nombre },
                    },
                  } = item;

                  const totalRestante = tarifa - pagado;

                  return (
                    <TableRow key={id} sx={estado ? { backgroundColor: '#d4edda' } : { backgroundColor: '#fff3cd' }}>
                      <TableCell sx={stylesTableCellBody}>{fecha_hosp}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{fecha_salida}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        {tarifa.toLocaleString('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        {pagado.toLocaleString('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell sx={[stylesTableCellBody, stylesTextDanger]}>
                        {totalRestante.toLocaleString('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
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

export default TableViewSaldoPendiente;
