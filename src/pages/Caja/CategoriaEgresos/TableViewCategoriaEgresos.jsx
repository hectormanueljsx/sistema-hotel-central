import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import LoaderImage from '@/components/Loader/LoaderImage';
import LoaderSkeleton from '@/components/Loader/LoaderSkeleton';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import {
  stylesAccordionDetails,
  stylesAccordionSummary,
  stylesRemovePaddingButton,
  stylesTextFontCategoria,
  stylesTextFontSubcategoria,
  stylesWidthCategoria,
  stylesWidthHeightTable,
  stylesWidthSubcategoria,
  stylesWrapperBoxShadow,
} from '@/pages/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const TableViewCategoriaEgresos = () => {
  const [expanded, setExpanded] = useState(false);
  const [loaderRequest, setLoaderRequest] = useState(false);

  const endpointCategoria = generalEndpoints.categoria;
  const endpointSubategoria = generalEndpoints.subcategoria;

  const handleChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const deleteByIdCategoria = async id => {
    const generalData = { status: false };
    setLoaderRequest(true);
    const { status } = await putGeneralTable(endpointCategoria, id, generalData);
    setLoaderRequest(false);
    return status;
  };

  const deleteByIdSubcategoria = async id => {
    const generalData = { status: false };
    setLoaderRequest(true);
    const { status } = await putGeneralTable(endpointSubategoria, id, generalData);
    setLoaderRequest(false);
    return status;
  };

  const deleteCategoria = async id => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmación de eliminación',
      text: '¿Estás seguro de eliminar este registro?',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#d32f2f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        deleteByIdCategoria(id).then(res => {
          if (res >= 200 && res <= 299) {
            Swal.fire({
              icon: 'success',
              title: 'Eliminación con éxito',
              text: 'El registro se ha eliminado con éxito',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            }).then(result => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ah ocurrido un error',
              text: 'Lo sentimos, no se pudo eliminar el registro debido a un problema internamente',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      }
    });
  };

  const deleteSubcategoria = async id => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmación de eliminación',
      text: '¿Estás seguro de eliminar este registro?',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#d32f2f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        deleteByIdSubcategoria(id).then(res => {
          if (res >= 200 && res <= 299) {
            Swal.fire({
              icon: 'success',
              title: 'Eliminación con éxito',
              text: 'El registro se ha eliminado con éxito',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            }).then(result => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ah ocurrido un error',
              text: 'Lo sentimos, no se pudo eliminar el registro debido a un problema internamente',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      }
    });
  };

  const { list, loading, error } = useGetGeneralTable(`${endpointCategoria}?status=true`);

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Categorías y Subcategorías' />
      <Box component='div'>
        {loading ? (
          <LoaderSkeleton />
        ) : error ? (
          <AlertGlobalTables messageError={messageErrorGetData} />
        ) : list.length > 0 ? (
          list.map(item => {
            const { categoria, subcategorias, id } = item;

            return (
              <Accordion key={id} expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                <AccordionSummary key={id} expandIcon={<ExpandMore />}>
                  <Box sx={[stylesAccordionSummary, stylesWidthCategoria]}>
                    <Typography key={id} sx={stylesTextFontCategoria}>
                      {categoria}
                    </Typography>
                    {subcategorias.length > 0 ? (
                      subcategorias.map(option => {
                        return option.status ? null : (
                          <IconButton
                            color='error'
                            size='small'
                            onClick={() => deleteCategoria(id)}
                            sx={stylesRemovePaddingButton}
                          >
                            <DeleteIcon />
                          </IconButton>
                        );
                      })
                    ) : (
                      <IconButton
                        color='error'
                        size='small'
                        onClick={() => deleteCategoria(id)}
                        sx={stylesRemovePaddingButton}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </AccordionSummary>
                {subcategorias.length > 0
                  ? subcategorias.map(subitem => {
                      const { descripcion, id, status } = subitem;

                      return (
                        <AccordionDetails key={id} sx={stylesAccordionDetails}>
                          {status ? (
                            <Box sx={[stylesAccordionSummary, stylesWidthSubcategoria]}>
                              <Box sx={[stylesAccordionSummary, { marginLeft: 5 }]}>
                                <ListItemIcon sx={{ minWidth: 0 }}>
                                  <ArrowRightIcon />
                                </ListItemIcon>
                                <Typography key={id} sx={stylesTextFontSubcategoria}>
                                  {descripcion}
                                </Typography>
                              </Box>
                              <IconButton
                                color='error'
                                size='small'
                                onClick={() => deleteSubcategoria(id)}
                                sx={stylesRemovePaddingButton}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ) : null}
                        </AccordionDetails>
                      );
                    })
                  : null}
              </Accordion>
            );
          })
        ) : (
          <AlertGlobalTables messageError={messageEmptyGetData} />
        )}
      </Box>
    </Box>
  );
};

export default TableViewCategoriaEgresos;
