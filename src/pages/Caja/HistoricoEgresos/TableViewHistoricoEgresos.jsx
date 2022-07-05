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
} from '@/pages/Caja/HistoricoEgresos/HistoricoEgresosStyles';

const columns = [
  { id: 'num_gasto', label: 'No. de Gasto', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 270 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'detalles', label: 'Detalles', width: 130 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewHistoricoEgresos = ({ search, dataEgreso, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterConcepto = dataEgreso.filter(item => item.concepto.toUpperCase().includes(search.toUpperCase()));

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Histórico de Egresos' />
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
                const { id, fecha, concepto, importe, p_caja } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                    <TableCell sx={stylesTableCell}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCell}>{p_caja ? 'EN CAJA' : 'CORTE DE CAJA'}</TableCell>
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
