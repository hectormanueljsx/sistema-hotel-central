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
import { stylesAccordion, stylesContainerSection } from '@/components/Caja/stylesCaja';

const TableViewCategoriaEgresos = () => {
  const [expanded, setExpanded] = useState(false);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpointCategoria = generalEndpoints.categoria;
  const endpointSubategoria = generalEndpoints.subcategoria;

  const handleChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const deleteCategoria = async (id, subcategoria) => {
    if (subcategoria === 0) {
      await deleteGeneralTable(identifier, password, endpointCategoria, id);
      location.reload();
    } else {
      alert('No se puede eliminar una categoria con subcategorias');
    }
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
        {list.map((item, index) => {
          const { categoria, subcategorias, id } = item;

          return (
            <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary key={index} expandIcon={<ExpandMore />}>
                <Box sx={[stylesAccordion, { width: 850 }]}>
                  <Typography key={index} sx={{ fontWeight: '700' }}>
                    {categoria}
                  </Typography>
                  {subcategorias.length === 0 && (
                    <IconButton
                      color='error'
                      size='small'
                      sx={{}}
                      onClick={() => deleteCategoria(id, subcategorias.length)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </AccordionSummary>
              {subcategorias.map((subitem, idx) => {
                const { descripcion, id } = subitem;

                return (
                  <AccordionDetails key={idx} sx={{ padding: 0, marginBottom: 1 }}>
                    <Box sx={[stylesAccordion, { width: 866 }]}>
                      <Box sx={[stylesAccordion, { marginLeft: 5 }]}>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <Typography key={idx} sx={{ fontWeight: '300' }}>
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
