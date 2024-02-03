import { FormControl, MenuItem, Select } from '@mui/material';
import { cabanas, meses } from '../../helpers/constantes';
import { ordenarDataArriendos } from '../../helpers/funciones';
import { getArriendosPorCabana, getTotalIngresosPorMes } from '../../helpers/funcionesFirebase';
import { useState } from 'react';

const Filtro = ({ setEventos, setIngresoTotal, tipo }) => {
  const [inputTarget, setInputTarget] = useState('Todos');

  const handleChangeOption = async (e) => {
    const value = e.target.value;
    setInputTarget(value);
    if(tipo === 'Todas las Cabanas'){
      const cabanasFiltradas = await getArriendosPorCabana(value);
      setEventos(ordenarDataArriendos(cabanasFiltradas));
      console.log(cabanasFiltradas)
    }else{
      const total = await getTotalIngresosPorMes(value);
      setIngresoTotal(total)
    }
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={inputTarget}
        onChange={handleChangeOption}
        label="Age"
        name="cabana"
        size="small"
      >
        <MenuItem value="Todos">{tipo}</MenuItem>
        {tipo === 'Todas las Cabanas'
          ? cabanas.map((cabana, index) => (
              <MenuItem key={index} value={cabana}>
                {cabana}
              </MenuItem>
            ))
          : meses.map((cabana, index) => (
              <MenuItem key={index} value={cabana}>
                {cabana}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
    // <div>
    //   <select name="filtro" onChange={handleChangeOption}>
    //     <option value="Todos">Todos</option>
    //     {
    //       cabanas.map((item, index) => (<option key={index} value={item}>{item}</option>))
    //     }
    //   </select>
    // </div>
  );
};

export default Filtro;
