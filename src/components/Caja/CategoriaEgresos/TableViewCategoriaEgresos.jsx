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

  const deleteCategoria = async id => {
    await deleteGeneralTable(identifier, password, endpointCategoria, id);
    location.reload();
  };

  const deleteSubcategoria = async id => {
    await deleteGeneralTable(identifier, password, endpointSubategoria, id);
    location.reload();
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
