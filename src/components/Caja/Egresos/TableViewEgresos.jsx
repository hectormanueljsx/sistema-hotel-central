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
  TableRow,
  TablePagination,
  Modal,
  IconButton,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import useGetSpecific from '@/hooks/useGetSpecific';
import getSpecificSelect from '@/services/getSpecificSelect';
import ModalEgreso from './ModalEgreso';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection, stylesTableCell } from '@/components/Caja/stylesCaja';

const columns = [
  { id: 'num_gasto', label: 'N° Gasto', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 200 },
  { id: 'categoria', label: 'Categoria', width: 200 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewEgresos = ({ pago, categoria }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [dataEgreso, setDataEgreso] = useState('');
  const [dataCategoria, setdataCategoria] = useState('');

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.egreso;
  const attribute = 'facturado';
  const valueAttribute = false;

  const endpointCategoria = generalEndpoints.categoria;
  const attributeCategoria = 'id';

  const handleOpen = async (item, categoriaData) => {
    await getSpecificSelect(identifier, password, endpointCategoria, attributeCategoria, categoriaData).then(result => {
      setdataCategoria(result.data);
    });
    setDataEgreso(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { listGetSpecific, loadingGetSpecific, errorGetSpecific } = useGetSpecific(
    identifier,
    password,
    endpoint,
    attribute,
    valueAttribute,
  );

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Gastos no Incluidos en un Corte de Caja' />
      <Box component='div'>
        {loadingGetSpecific && <Loader />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loadingGetSpecific
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
                    <TableCell sx={stylesTableCell}>{fecha}</TableCell>
                    <TableCell sx={stylesTableCell}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{importe}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item, categoria)}>
                        <VisibilityRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loadingGetSpecific ? null : (
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ top: '50%', left: '50%' }}>
          <ModalEgreso dataEgreso={dataEgreso} pago={pago} categoria={categoria} dataCategoria={dataCategoria} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewEgresos;
