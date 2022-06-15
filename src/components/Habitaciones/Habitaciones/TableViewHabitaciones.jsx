import React, { useState } from 'react';
import {
  Box,
  Container,
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import TitlePage from '@/components/Title/TitlePage';
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalHabitaciones from '@/components/Habitaciones/Habitaciones/ModalHabitacion';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Habitaciones/Habitaciones/HabitacionesStyles';

const columns = [
  { id: 'num', label: 'N° Habitación', width: 300 },
  { id: 'servicios', label: 'Servicios', width: 552 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

let dataServices = [];
let dataSelectTarifas = [];

const TableViewHabitaciones = ({ setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataHabitaciones, setDataHabitaciones] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;

  const services = {
    clima: '',
    tv: '',
  };

  const handleOpen = item => {
    item.tv === true ? dataServices.push('TV') : null;
    item.clima === true ? dataServices.push('CLIMA') : null;
    dataSelectTarifas = item.tarifas.map(element => {
      return element.descripcion;
    });

    setOpenModal(true);
    setDataHabitaciones(item);
  };

  const handleCloseModal = () => {
    dataServices = [];
    setOpenModal(false);
  };

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
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Habitaciones' />
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
                const { id, clima, tv, num_hab } = item;

                let arrayServices = [];

                clima === true ? (services.clima = 'Clima') : (services.clima = '');
                tv === true ? (services.tv = 'TV') : (services.tv = '');

                services.clima !== '' ? arrayServices.push(services.clima) : null;
                services.tv !== '' ? arrayServices.push(services.tv) : null;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{num_hab}</TableCell>
                    <TableCell sx={stylesTableCell}>{arrayServices.join(', ')}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityIcon />
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
      <Modal open={openModal}>
        <Box sx={stylesModal}>
          <ModalHabitaciones
            dataHabitaciones={dataHabitaciones}
            dataServices={dataServices}
            dataSelectTarifas={dataSelectTarifas}
            handleCloseModal={handleCloseModal}
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
