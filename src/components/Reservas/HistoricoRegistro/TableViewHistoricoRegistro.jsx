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
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Reservas/HistoricoRegistro/HistoricoRegistroStyles';

const columns = [
  { id: 'num_registro', label: 'No. de Registro', width: 120 },
  { id: 'llegada', label: 'Llegada', width: 175 },
  { id: 'salida', label: 'Salida', width: 175 },
  { id: 'cliente', label: 'Cliente', width: 262 },
  { id: 'estado', label: 'Estado', width: 120 },
  { id: 'acciones', label: 'Acciones', width: 100 },
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
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{`${fecha} ${moment(hora_llegada, 'hh:mm:ss').format(
                      'hh:mm:ss a',
                    )}`}</TableCell>
                    <TableCell sx={stylesTableCell}>{`${fecha_salida} ${moment(hora_salida, 'hh:mm:ss').format(
                      'hh:mm:ss a',
                    )}`}</TableCell>
                    <TableCell sx={stylesTableCell}>{nombre}</TableCell>
                    <TableCell sx={stylesTableCell}>{estado ? 'CHECK-OUT' : 'SIN CHECK-OUT'}</TableCell>
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
