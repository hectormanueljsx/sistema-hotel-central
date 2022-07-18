import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import { generalEndpoints } from '@/utilities/endpoints';
import useGetSpecific from '@/hooks/useGetSpecific';

import {
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/EmpresaClientes/EmpresaClientesStyles';

const columns = [
  { id: 'nombre', label: 'Nombre del Cliente', width: 100 },
  { id: 'email', label: 'Correo Electrónico', width: 100 },
  { id: 'numero', label: 'Teléfono', width: 100 },
];

const TableViewEmpresaClientes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpoint = generalEndpoints.cliente;
  const atrtibute = 'empresa';

  const { id } = useParams();
  const { listGetSpecific, loadingGetSpecific, errorGetSpecific } = useGetSpecific(
    identifier,
    password,
    endpoint,
    atrtibute,
    id,
  );

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Clientes Relacionados' />
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
              {loadingGetSpecific ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              ) : errorGetSpecific ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageErrorGetData} />
                  </TableCell>
                </TableRow>
              ) : listGetSpecific.length > 0 ? (
                listGetSpecific.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                  const { id, nombre, mail, tel } = item;

                  return (
                    <TableRow key={id}>
                      <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{mail}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{tel}</TableCell>
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
    </Box>
  );
};

export default TableViewEmpresaClientes;