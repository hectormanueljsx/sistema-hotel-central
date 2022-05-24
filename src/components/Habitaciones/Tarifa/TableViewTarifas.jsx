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
import ModalTarifa from '@/components/Habitaciones/Tarifa/ModalTarifa';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesModal, stylesTableCell } from '@/components/Habitaciones/stylesHabitaciones';

const columns = [
  { id: 'desc_tarifa', label: 'Descripción Tarifa', width: 432 },
  { id: 'num_personas', label: 'Número de Personas', width: 160 },
  { id: 'precio_aplicado', label: 'Precio Aplicado', width: 160 },
  { id: 'acciones', label: 'Acciones', width: 200 },
];

const TableViewTarifas = ({ setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataTarifa, setDataTarifa] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpoint = generalEndpoints.tarifa;

  const handleOpen = item => {
    setOpenModal(true);
    setDataTarifa(item);
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
      <TitlePage titlePage='Lista de Tarifas' />
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
                const { id, descripcion, no_personas, precio } = item;

                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{no_personas}</TableCell>
                    <TableCell sx={stylesTableCell}>${precio}</TableCell>
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
          <ModalTarifa
            dataTarifa={dataTarifa}
            setOpenAlert={setOpenAlert}
            setMessageInfo={setMessageInfo}
            setMessageSeverity={setMessageSeverity}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewTarifas;
