import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  CssBaseline,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import TitlePage from '@/components/TitlePage';
import Loader from '@/components/Loader/Loader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerSection } from '@/components/Caja/stylesCaja';

const TableViewCategoriaEgresos = () => {
  const [expanded, setExpanded] = useState(false);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.categoria;

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);

  const handleChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Lista de Categorías Registradas' />
      <Box component='div'>
        {loading && <Loader />}
        {list.map((item, index) => {
          const { categoria, subcategorias } = item;

          return (
            <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary key={index} expandIcon={<ExpandMore />}>
                <Typography key={index} sx={{ fontWeight: '700' }}>
                  {categoria}
                </Typography>
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
