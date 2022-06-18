import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesAccordion,
  stylesAccordionDetails,
  stylesBoxCategoria,
  stylesBoxSubcategoria,
  stylesContainerSection,
  stylesFontCategoria,
  stylesFontSubcategoria,
  stylesWidthAcordion,
} from '@/components/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const TableViewCategoriaEgresos = () => {
  const [expanded, setExpanded] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointCategoria = generalEndpoints.categoria;
  const endpointSubategoria = generalEndpoints.subcategoria;

  const handleChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const deleteByIdCategoria = async id => {
    const { status } = await deleteGeneralTable(identifier, password, endpointCategoria, id);
    return status;
  };

  const deleteByIdSubcategoria = async id => {
    const { status } = await deleteGeneralTable(identifier, password, endpointSubategoria, id);
    return status;
  };

  const deleteCategoria = async id => {
    Swal.fire({
      icon: 'warning',
      text: '¿Estás seguro de eliminar esta categoría?',
      showCancelButton: true,
      allowOutsideClick: false,
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
              text: 'Categoría eliminada correctamente',
              allowOutsideClick: false,
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
              text: 'Error al eliminar categoría',
              allowOutsideClick: false,
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
      text: '¿Estás seguro de eliminar esta subcategoría?',
      showCancelButton: true,
      allowOutsideClick: false,
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
              text: 'Subcategoría eliminada correctamente',
              allowOutsideClick: false,
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
              text: 'Error al eliminar subcategoría',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      }
    });
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointCategoria);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthAcordion]}>
      <TitlePage titlePage='Lista de Categorías Registradas' />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        {list.map(item => {
          const { categoria, subcategorias, id } = item;

          return (
            <Accordion key={id} expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
              <AccordionSummary key={id} expandIcon={<ExpandMore />}>
                <Box sx={[stylesAccordion, stylesBoxCategoria]}>
                  <Typography key={id} sx={stylesFontCategoria}>
                    {categoria}
                  </Typography>
                  {subcategorias.length === 0 && (
                    <IconButton color='error' size='small' onClick={() => deleteCategoria(id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </AccordionSummary>
              {subcategorias.map(subitem => {
                const { descripcion, id } = subitem;

                return (
                  <AccordionDetails key={id} sx={stylesAccordionDetails}>
                    <Box sx={[stylesAccordion, stylesBoxSubcategoria]}>
                      <Box sx={[stylesAccordion, { marginLeft: 5 }]}>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <Typography key={id} sx={stylesFontSubcategoria}>
                          {descripcion}
                        </Typography>
                      </Box>
                      <IconButton color='error' size='small' onClick={() => deleteSubcategoria(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </AccordionDetails>
                );
              })}
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
};

export default TableViewCategoriaEgresos;
