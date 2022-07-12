import React, { useState } from 'react';
import {
  Box,
  Container,
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
  stylesContainerSection,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
  stylesTextDanger,
} from '@/pages/Reportes/HabitacionSaldoPendiente/SaldoPendienteStyles';

const columns = [
  { id: 'llegada', label: 'Llegada', width: 130 },
  { id: 'salida', label: 'Salida', width: 130 },
  { id: 'cliente', label: 'Cliente', width: 350 },
  { id: 'total', label: 'Total a Pagar', width: 150 },
  { id: 'pagado', label: 'Pagado', width: 150 },
  { id: 'restante', label: 'Restante', width: 200},
  { id: 'estado', label: 'Estado', width: 250 },
];

const TableViewSaldoPendiente = ({ search, dataHistorico, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterCliente = dataHistorico.filter(
    item => item.registro.cliente.nombre.toUpperCase().includes(search.toUpperCase()),
  );

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Registros con Saldos Pendientes' />
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
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
             {filterCliente.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
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
                  <TableRow key={id} sx={estado ? { backgroundColor: '#d4edda' } : { backgroundColor: '#fff3cd' }}>
                    <TableCell sx={stylesTableCellBody}>{fecha_hosp}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{fecha_salida}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{tarifa}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{pagado}</TableCell>
                    <TableCell sx={[stylesTableCellBody, stylesTextDanger]}>{tarifa - pagado}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{estado ? 'CHECK-OUT' : 'SIN CHECK-OUT'}</TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      <IconButton color='info' size='small'>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
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
            count={filterCliente.length}
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

export default TableViewSaldoPendiente;
