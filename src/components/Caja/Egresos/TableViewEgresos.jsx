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
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import AlertGlobalTables from '@/components/AlertGlobalTables';
import ModalEgreso from '@/components/Caja/Egresos/ModalEgreso';
import useGetSpecific from '@/hooks/useGetSpecific';
import getSpecificSelect from '@/services/getSpecificSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesModal, stylesTableCell } from '@/components/Caja/stylesCaja';

const columns = [
  { id: 'num_gasto', label: 'N° Gasto', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 200 },
  { id: 'categoria', label: 'Categoria', width: 200 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewEgresos = ({ setOpenAlert, setMessageInfo, setMessageSeverity, pago, categoria }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataEgreso, setDataEgreso] = useState('');
  const [dataCategoria, setDataCategoria] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEgreso = generalEndpoints.egreso;
  const endpointCategoria = generalEndpoints.categoria;

  const attribute = 'facturado';
  const valueAttribute = false;
  const attributeCategoria = 'id';

  const handleOpen = async (item, categoriaData) => {
    const result = await getSpecificSelect(identifier, password, endpointCategoria, attributeCategoria, categoriaData);
    setDataCategoria(result.data);
    setDataEgreso(item);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { listGetSpecific, loadingGetSpecific, errorGetSpecific } = useGetSpecific(
    identifier,
    password,
    endpointEgreso,
    attribute,
    valueAttribute,
  );

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Gastos no Incluidos en un Corte de Caja' />
      <Box component='div'>
        {loadingGetSpecific && <Loader />}
        {errorGetSpecific && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loadingGetSpecific || errorGetSpecific
                  ? null
                  : columns.map((column, index) => (
                      <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                        {column.label}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listGetSpecific.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                const { id, fecha, concepto, subcategoria, importe } = item;
                const { descripcion, categoria } = subcategoria;

                return (
                  <TableRow key={index}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
                    <TableCell sx={stylesTableCell}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item, categoria)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loadingGetSpecific || errorGetSpecific ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={listGetSpecific.length}
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
          <ModalEgreso
            dataEgreso={dataEgreso}
            pago={pago}
            categoria={categoria}
            dataCategoria={dataCategoria}
            setOpenAlert={setOpenAlert}
            setMessageInfo={setMessageInfo}
            setMessageSeverity={setMessageSeverity}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewEgresos;
