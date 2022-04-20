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
} from '@mui/material';
import TitlePage from '../../TitlePage';
import { stylesContainerSection } from '../stylesCaja';
import useGetGeneralTable from '../../../hooks/useGetGeneralTable';

const columns = [
  { id: 'categoria', label: 'Categorías', width: 252 },
  /* { id: 'subcategoria', label: 'SubCategoria', width: 100 }, */
  // { id: 'acciones', label: 'Acciones', width: 300 },
];

const TableViewCategorias = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = 'users';
  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);
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
      <TitlePage titlePage='Lista de Categorías Registradas' />
      <Box component='div'>
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
              {/* {list &&
                list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    {
                      const { nombre, rol, ultimoIngreso } = row
                      // <TableCell key={row.id}>{row}</TableCell>
                    }
                  </TableRow>
                ))} */}
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

export default TableViewCategorias;
