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

import TitlePage from '@/components/Title/TitlePage';
import ModalEmpresa from '@/pages/Reservas/Empresa/ModalEmpresa';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesContainerNoMarginTop,
  stylesContainerSection,
  stylesModal,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
} from '@/pages/Reservas/Empresa/EmpresaStyle';

const columns = [
  { id: 'rfc', label: 'RFC de la Empresa', width: 130 },
  { id: 'nombre', label: 'Nombre de la Empresa', width: 280 },
  { id: 'estado', label: 'Estado', width: 160 },
  { id: 'ciudad', label: 'Ciudad', width: 307 },
  { id: 'acciones', label: 'Acciones', width: 75 },
];

const TableViewEmpresas = ({ search, dataEmpresa, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectEmpresa, setSelectEmpresa] = useState('');

  const handleOpen = item => {
    setOpenModal(true);
    setSelectEmpresa(item);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterName = dataEmpresa.filter(item => item.nombre.toUpperCase().includes(search.toUpperCase()));

  return (
    <Container
      component='section'
      disableGutters
      sx={[stylesContainerSection, stylesContainerNoMarginTop, stylesWidthHeightTable]}
    >
      <TitlePage titlePage='Histórico de Empresas' />
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
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {filterName.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const { id, rfc, nombre, ciudad, estado } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCellBody}>{rfc}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{estado}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{ciudad}</TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityIcon />
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
            count={filterName.length}
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
          <ModalEmpresa selectEmpresa={selectEmpresa} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewEmpresas;