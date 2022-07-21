import React, { useState } from 'react';
import {
  Box,
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
import LoaderSkeleton from '@/components/Loader/LoaderSkeleton';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalMantenimiento from '@/pages/Mantenimiento/Mantenimiento/ModalMantenimiento';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import {
  stylesSuperpositionModal,
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Mantenimiento/Mantenimiento/MantenimientoStyles';

const columns = [
  { id: 'fechaReporte', label: 'Fecha de Reporte', width: 125 },
  { id: 'fechInicio', label: 'Fecha de Inicio', width: 125 },
  { id: 'motivo', label: 'Motivo', width: 280 },
  { id: 'categoria', label: 'Categoría', width: 256 },
  { id: 'estado', label: 'Estado', width: 120 },
  { id: 'acciones', label: 'Acciones', width: 80 },
];

const TableViewMantenimiento = ({ habitacion, subcategoria }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataMantenimiento, setDataMantenimiento] = useState('');

  const endpointMantenimiento = generalEndpoints.mantenimiento;

  const handleOpen = item => {
    setOpenModal(true);
    setDataMantenimiento(item);
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { list, loading, error } = useGetGeneralTable(endpointMantenimiento);

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Mantenimientos' />
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
              {loading ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <LoaderSkeleton />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageErrorGetData} />
                  </TableCell>
                </TableRow>
              ) : list.length > 0 ? (
                list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
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
                })
              ) : (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageEmptyGetData} />
                  </TableCell>
                </TableRow>
              )}
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
      <Modal open={openModal}>
        <Box component='div' sx={stylesSuperpositionModal}>
          <ModalMantenimiento
            dataMantenimiento={dataMantenimiento}
            handleCloseModal={handleCloseModal}
            habitacion={habitacion}
            subcategoria={subcategoria}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TableViewMantenimiento;
