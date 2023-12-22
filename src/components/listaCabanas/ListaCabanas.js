import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { cabanas } from '../../helpers/constantes';

export const ListaCabanas = ({dataInput, handleInputChange}) => {
  return (
    <>
      <InputLabel id="demo-simple-select-standard-label">Cabaña</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={dataInput.cabana}
        onChange={handleInputChange}
        label="Age"
        name="cabana"
        size='small'
      >
        {cabanas.map((cabana, index) => (
          <MenuItem key={index} value={cabana}>
            {cabana}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
