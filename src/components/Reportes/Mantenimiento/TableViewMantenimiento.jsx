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
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesTableCell, stylesModal } from '@/components/Reportes/stylesReportes';
import ModalMantenimiento from './ModalMantenimiento';

const columns = [
  { id: 'fechInicio', label: 'Fecha de Inicio', width: 180 },
  { id: 'motivo', label: 'Motivo', width: 322 },
  { id: 'categoria', label: 'Categorias', width: 180 },
  { id: 'estado', label: 'Estado', width: 260 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewMantenimiento = ({ setOpenAlert, setMessageInfo, setMessageSeverity, habitacion, subcategoria }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataMantenimiento, setDataMantenimiento] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');

  const endpoint = generalEndpoints.mantenimiento;

  const handleOpen = item => {
    setOpenModal(true);
    setDataMantenimiento(item);
  };

  const handleClose = () => setOpenModal(false);
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
      <TitlePage titlePage='Lista de Mantenimientos' />
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
                const { id, f_inicio, f_fin, motivo, estado, subcategoria } = item;
                const { descripcion } = subcategoria;
                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{f_inicio}</TableCell>
                    <TableCell sx={stylesTableCell}>{motivo}</TableCell>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{estado ? 'Finalizado' : 'No finalizado'}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityRoundedIcon />
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
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={stylesModal}>
          <ModalMantenimiento
            dataMantenimiento={dataMantenimiento}
            setOpenAlert={setOpenAlert}
            setMessageInfo={setMessageInfo}
            setMessageSeverity={setMessageSeverity}
            habitacion={habitacion}
            subcategoria={subcategoria}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewMantenimiento;
