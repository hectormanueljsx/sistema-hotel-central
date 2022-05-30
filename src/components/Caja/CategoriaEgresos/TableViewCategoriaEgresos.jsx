import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Box,
  Container,
  CssBaseline,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader';
import AlertGlobalTables from '@/components/AlertGlobalTables';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesAccordion, stylesContainerSection } from '@/components/Caja/stylesCaja';

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
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Categorías Registradas' />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        {list.map(item => {
          const { categoria, subcategorias, id } = item;

          return (
            <Accordion key={id} expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
              <AccordionSummary key={id} expandIcon={<ExpandMore />}>
                <Box sx={[stylesAccordion, { width: 850 }]}>
                  <Typography key={id} sx={{ fontWeight: '700' }}>
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
                  <AccordionDetails key={id} sx={{ padding: 0, marginBottom: 1 }}>
                    <Box sx={[stylesAccordion, { width: 866 }]}>
                      <Box sx={[stylesAccordion, { marginLeft: 5 }]}>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <Typography key={id} sx={{ fontWeight: '300' }}>
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
