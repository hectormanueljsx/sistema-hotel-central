import React from 'react';
import { Typography } from '@mui/material';

const TitleInput = ({ titleInput }) => {
  return (
    <Typography component='p' sx={{ fontWeight: 500, marginBottom: 0.5 }}>
      {titleInput}
    </Typography>
  );
};

export default TitleInput;
