import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import AlertGlobalTables from '@/components/AlertGlobalTables';
import ModalUsuario from '@/components/Administracion/Usuario/ModalUsuario';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesModal, stylesTableCell } from '@/components/Administracion/stylesAdministracion';

const columns = [
  { id: 'username', label: 'Nombre', width: 462 },
  { id: 'role', label: 'Rol', width: 165 },
  { id: 'ult_ingreso', label: 'Último Ingreso', width: 225 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewUsuarios = ({ setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataUsuario, setDataUsuario] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointUsuario = generalEndpoints.usuario;

  const handleOpen = item => {
    setOpenModal(true);
    setDataUsuario(item);
  };

  const handleClose = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteRegistro = async id => {
    await deleteGeneralTable(identifier, password, endpointUsuario, id);
    location.reload();
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointUsuario);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000, height: 711 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Usuarios' />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loading || error
                  ? null
                  : columns.map((column, index) => (
                      <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                        {column.label}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const {
                  id,
                  username,
                  role: { name },
                  ult_ingreso,
                } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{username}</TableCell>
                    <TableCell sx={stylesTableCell}>{name}</TableCell>
                    <TableCell sx={stylesTableCell}>{ult_ingreso}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <EditIcon />
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
        {loading || error ? null : (
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
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={stylesModal}>
          <ModalUsuario
            dataUsuario={dataUsuario}
            setOpenAlert={setOpenAlert}
            setMessageInfo={setMessageInfo}
            setMessageSeverity={setMessageSeverity}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewUsuarios;
