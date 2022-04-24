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
import { stylesContainerSection, stylesContainerBox } from '@/components/Reportes/stylesReportes';

const columns = [
  { id: 'num_registro', label: 'N° Registro', width: 150 },
  { id: 'llegada', label: 'Llegada', width: 200 },
  { id: 'salida', label: 'Salida', width: 200 },
  { id: 'cliente', label: 'Cliente', width: 350 },
  { id: 'total', label: 'Total a pagar', width: 200 },
  { id: 'pagado', label: 'Pagado', width: 150 },
  { id: 'restante', label: 'Restante', width: 150 },
  { id: 'estado', label: 'Estado', width: 300 },
];

const TableViewHabitacionPendiente = () => {
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
      <TitlePage titlePage='Registros con saldos pendientes' />
      <Box component='div'>
        <Box component='form' sx={[stylesContainerBox, { width: 200 }]}>
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
              //AQUI SE RENDERIZAN LOS DATOS
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

export default TableViewHabitacionPendiente;
