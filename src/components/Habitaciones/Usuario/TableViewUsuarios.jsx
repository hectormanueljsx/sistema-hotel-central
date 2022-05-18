import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import UpdateUsuario from './UpdateUsuario';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesTableCell } from '@/components/Habitaciones/stylesHabitaciones';

const columns = [
  { id: 'username', label: 'Nombre', width: 412 },
  { id: 'role', label: 'Rol', width: 140 },
  { id: 'ult_ingreso', label: 'Último Ingreso', width: 200 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewUsuarios = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState('');

  const handleOpen = (item) => {
    setOpen(true);
    setDataUser(item);
  };
  const handleClose = () => setOpen(false);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.usuario;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteRegistro = async id => {
    await deleteGeneralTable(identifier, password, endpoint, id);
    location.reload();
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000, height: 711 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Usuarios' />
      <Box component='div'>
        {loading && <Loader />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loading
                  ? null
                  : columns.map((column, index) => (
                      <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                        {column.label}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                const { id, username, role, ult_ingreso, identifier } = item;
                const { name } = role;

                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{username}</TableCell>
                    <TableCell sx={stylesTableCell}>{name}</TableCell>
                    <TableCell sx={stylesTableCell}>{ult_ingreso}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton color='error' size='small' onClick={() => deleteRegistro(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loading ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        )}
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ top: '50%', left: '50%' }}>
          <UpdateUsuario datos={(dataUser)} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewUsuarios;
