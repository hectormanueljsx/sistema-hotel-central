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
import ModalHabitaciones from '@/components/Habitaciones/Habitaciones/ModalHabitacion';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesModal, stylesTableCell } from '@/components/Habitaciones/stylesHabitaciones';

const columns = [
  { id: 'num', label: 'N° Habitacion', width: 400 },
  { id: 'servicios', label: 'Servicios', width: 600 },
  { id: 'acciones', label: 'Acciones', width: 400 },
];
let dataServices = [];
let dataSelectTarifas = [];
const TableViewHabitaciones = ({ setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataHabitaciones, setDataHabitaciones] = useState('');

  const services = {
    clima: '',
    tv: '',
  };

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;

  const handleOpen = item => {
    item.tv === true ? dataServices.push('TV') : null;
    item.clima === true ? dataServices.push('CLIMA') : null;
    dataSelectTarifas = item.tarifas.map(element => {
      return element.descripcion;
    });
    setOpenModal(true);
    setDataHabitaciones(item);
  };

  const handleClose = () => setOpenModal(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteHabitacion = async id => {
    await deleteGeneralTable(identifier, password, endpointHabitacion, id);
    location.reload();
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointHabitacion);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000, height: 711 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Habitaciones' />
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
                const { id, clima, tv, num_hab } = item;
                clima === true ? (services.clima = 'Clima') : (services.clima = '');
                tv === true ? (services.tv = 'TV') : (services.tv = '');
                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{num_hab}</TableCell>
                    <TableCell sx={stylesTableCell}>{`${services.clima} ${services.tv}`}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color='error' size='small' onClick={() => deleteHabitacion(id)}>
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
          <ModalHabitaciones
            dataHabitaciones={dataHabitaciones}
            dataServices={dataServices}
            dataSelectTarifas={dataSelectTarifas}
            setOpenAlert={setOpenAlert}
            setMessageInfo={setMessageInfo}
            setMessageSeverity={setMessageSeverity}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewHabitaciones;
