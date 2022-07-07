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
  TableRow,
  TablePagination,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import ModalFallas from '@/pages/Reportes/Fallas/ModalFallas';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
  stylesDateTable,
} from '@/pages/Reportes/Fallas/FallasStyles';

const columns = [
  { id: 'fechaReporte', label: 'Fecha de Reporte', width: 130 },
  { id: 'fechInicio', label: 'Fecha de Inicio', width: 130 },
  { id: 'motivo', label: 'Motivo', width: 250 },
  { id: 'categoria', label: 'Categoría', width: 245 },
  { id: 'estado', label: 'Estado', width: 122 },
  { id: 'acciones', label: 'Acciones', width: 75 },
];

const TableViewMantenimiento = ({ dataSearch, dateTable, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataMantenimiento, setDataMantenimiento] = useState('');

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleCloseModal = () => setOpenModal(false);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = item => {
    setOpenModal(true);
    setDataMantenimiento(item);
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Histórico de Mantenimientos' />
      <Typography sx={stylesDateTable}>{dateTable}</Typography>
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
              {dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const {
                  id,
                  f_inicio,
                  motivo,
                  estado,
                  subcategoria: { descripcion },
                  f_reporte,
                } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCellBody}>{f_reporte}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{f_inicio}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{motivo}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{estado}</TableCell>
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
            count={dataSearch.length}
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
          <ModalFallas dataMantenimiento={dataMantenimiento} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewMantenimiento;
