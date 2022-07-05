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
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Reservas/HistoricoReservaciones/HistoricoReservacionStyles';

const columns = [
  { id: 'num_registro', label: 'No. de Registro', width: 120 },
  { id: 'llegada', label: 'Llegada', width: 175 },
  { id: 'salida', label: 'Salida', width: 175 },
  { id: 'cliente', label: 'Cliente', width: 262 },
  { id: 'estado', label: 'Estado', width: 120 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewHistoricoReservaciones = ({ search, dataReservacion, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterCliente = dataReservacion.filter(item =>
    item.cliente.nombre.toUpperCase().includes(search.toUpperCase()),
  );

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Histórico de Reservaciones' />
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
              {filterCliente.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
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
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{fecha}</TableCell>
                    <TableCell sx={stylesTableCell}>{fecha_salida}</TableCell>
                    <TableCell sx={stylesTableCell}>{nombre}</TableCell>
                    <TableCell sx={stylesTableCell}>{est}</TableCell>
                    <TableCell sx={stylesTableCell}>
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

export default TableViewHistoricoReservaciones;
