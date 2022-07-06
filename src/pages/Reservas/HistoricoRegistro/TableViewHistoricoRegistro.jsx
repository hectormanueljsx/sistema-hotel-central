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
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesContainerSection,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
} from '@/pages/Reservas/HistoricoRegistro/HistoricoRegistroStyles';

const columns = [
  { id: 'num_registro', label: 'No. de Registro', width: 120 },
  { id: 'llegada', label: 'Fecha de Llegada', width: 175 },
  { id: 'salida', label: 'Fecha de Salida', width: 175 },
  { id: 'cliente', label: 'Nombre del Cliente', width: 277 },
  { id: 'estado', label: 'Estado', width: 130 },
  { id: 'acciones', label: 'Acciones', width: 75 },
];

const TableViewHistoricoEgresos = ({ search, dataRegistro, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterConcepto = dataRegistro.filter(item => item.cliente.nombre.toUpperCase().includes(search.toUpperCase()));

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Histórico de Registros' />
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
              {filterConcepto.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
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
                    <TableCell sx={stylesTableCellBody}>{id}</TableCell>
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loading || error ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={filterConcepto.length}
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

export default TableViewHistoricoEgresos;
