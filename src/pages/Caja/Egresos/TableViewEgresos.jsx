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
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalEgreso from '@/pages/Caja/Egresos/ModalEgreso';
import useGetSpecific from '@/hooks/useGetSpecific';
import getSpecificSelect from '@/services/getSpecificSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
} from '@/pages/Caja/Egresos/EgresosStyles';

const columns = [
  { id: 'num_gasto', label: 'No. de Gasto', width: 95 },
  { id: 'fecha', label: 'Fecha', width: 180 },
  { id: 'concepto', label: 'Concepto', width: 245 },
  { id: 'categoria', label: 'Categoría', width: 245 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'acciones', label: 'Acciones', width: 75 },
];

const TableViewEgresos = ({ pago, categoria }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataEgreso, setDataEgreso] = useState('');
  const [dataCategoria, setDataCategoria] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEgreso = generalEndpoints.egreso;
  const endpointCategoria = generalEndpoints.categoria;

  const attribute = 'p_caja';
  const valueAttribute = false;
  const attributeCategoria = 'id';

  const handleOpen = async (item, categoriaData) => {
    const result = await getSpecificSelect(identifier, password, endpointCategoria, attributeCategoria, categoriaData);
    setDataCategoria(result.data);
    setDataEgreso(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);
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
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Gastos no Incluidos en un Corte de Caja' />
      <Box component='div'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={[stylesTableCellHeader, { width: column.width }]}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingGetSpecific && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {errorGetSpecific && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {listGetSpecific.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const {
                  id,
                  fecha,
                  concepto,
                  subcategoria: { descripcion, categoria },
                  importe,
                } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCellBody}>{id}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCellBody}>
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
      <Modal open={openModal}>
        <Box sx={stylesModal}>
          <ModalEgreso
            dataEgreso={dataEgreso}
            pago={pago}
            categoria={categoria}
            dataCategoria={dataCategoria}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewEgresos;