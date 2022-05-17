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
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection } from '@/components/Caja/stylesCaja';

const TableViewCategoriaEgresos = () => {
  const [expanded, setExpanded] = useState(false);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpointCategoria = generalEndpoints.categoria;
  const endpointSubategoria = generalEndpoints.subcategoria;

  const handleChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointCategoria);

  const deleteSubcategoria = async id => {
    await deleteGeneralTable(identifier, password, endpointSubategoria, id);
    location.reload();
  };

  const deleteCategoria = async (id, subcategoria) => {
    subcategoria == 0
      ? await deleteGeneralTable(identifier, password, endpointCategoria, id)
      : alert('No se puede eliminar una categoria con subcategorias');
    location.reload();
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Categorías Registradas' />
      <Box component='div'>
        {loading && <Loader />}
        {list.map((item, index) => {
          const { categoria, subcategorias, id } = item;

          return (
            <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary key={index} expandIcon={<ExpandMore />}>
                <Typography key={index} sx={{ fontWeight: '700' }}>
                  {categoria}
                </Typography>
                <IconButton color='error' size='small' onClick={() => deleteCategoria(id, subcategorias.length)}>
                  <DeleteIcon />
                </IconButton>
              </AccordionSummary>
              {subcategorias.map((value, idx) => {
                return (
                  <AccordionDetails
                    key={idx}
                    sx={{ display: 'flex', alignItems: 'center', padding: 0, marginBottom: 2 }}
                  >
                    <ListItemIcon>
                      <ArrowRightIcon sx={{ marginLeft: 5 }} />
                    </ListItemIcon>
                    <Typography key={idx} sx={{ fontWeight: '300' }}>
                      {value.descripcion}
                    </Typography>
                    <IconButton color='error' size='small' onClick={() => deleteSubcategoria(value.id)}>
                      <DeleteIcon />
                    </IconButton>
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
