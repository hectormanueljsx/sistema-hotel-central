import React from 'react';
import { Typography } from '@mui/material';

import { stylesTitleInput } from './stylesGlobals';

const TitleInput = ({ titleInput }) => {
  return (
    <Typography component='p' sx={stylesTitleInput}>
      {titleInput}
    </Typography>
  );
};

export default TitleInput;
