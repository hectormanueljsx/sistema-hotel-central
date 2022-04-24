import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { stylesContainerSection, stylesContainerBox } from '@/components/Caja/stylesCaja';

const columns = [
  { id: 'num_gasto', label: 'N° Gasto', width: 252 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 300 },
  { id: 'importe', label: 'Importe', width: 300 },
  { id: 'detalle', label: 'Detalle', width: 300 },
];

const TableViewHistoricoEgresos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = 'egresos';
  const atribute = 'facturado';
  const parameter = 1;
  const { list, loading, error } = useGetSpecific(identifier, password, endpoint, atribute, parameter);
  console.log(list);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='HISTORICO DE EGRESOS' />
      <Box component='div'>
        <Box component='form' sx={[stylesContainerBox, { width: 200 }]}>
          <TitleInput titleInput='Buscar' />
          //AQUI VA BUSCAR Y N° DE REGISTROS
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={{ width: column.width }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && console.log('Cargando')}
              {error && console.log('Error')}
              //Aqui va la Renderizacion de datos
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component='div'
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default TableViewHistoricoEgresos;
