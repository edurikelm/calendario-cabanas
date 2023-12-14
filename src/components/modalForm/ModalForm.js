import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { postArriendo } from '../../helpers/funcionesFirebase';
import { cantidadDiasArriendo } from '../../helpers/funciones';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalForm = ({ open, handleClose, infoSelected, getEventos, recuperarIngresoTotal }) => {
  const [arrendantario, setArrendantario] = useState('');
  const [cabana, setCabana] = useState('');
  const [cantPersonas, setCantPersonas] = useState(0);
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [valorNoche, setValorNoche] = useState(0);
  const [error, setError] = useState('');

  const handleNuevoBtn = async () => {
    if (cabana === '') {
      return setError('Debe seleccionar una cabana');
    }
    const data = {
      title: arrendantario,
      start: infoSelected.fechaInicio,
      end: infoSelected.fechaTermino,
      cabana: cabana,
      cantPersonas: cantPersonas,
      celular: celular,
      correo: correo,
      ubicacion: ubicacion,
      valorNoche: valorNoche,
      pago: false,
      cantDias: cantidadDiasArriendo(infoSelected.fechaInicio, infoSelected.fechaTermino)
    };

    await postArriendo(data);
    handleClose();
    getEventos();
    recuperarIngresoTotal()
  };

  const handleChangeCabana = (e) => {
    setCabana(e.target.value)
    setError('')
  }

  const MsgError = () => {
    return(
      <span style={{color: 'red'}}>{error}</span>
    )

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
          >
            Agregar Arriendo
          </Typography>
          <div className="containerItem">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Arrendatario"
                onChange={(e) => setArrendantario(e.target.value)}
                value={arrendantario}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Fecha Entrada"
                disabled
                value={infoSelected.fechaInicio}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Fecha Salida"
                disabled
                value={infoSelected.fechaTermino}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Cabaña
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cabana}
                onChange={handleChangeCabana}
                label="Age"
              >
                <MenuItem value="Regional Uno">Regional Uno</MenuItem>
                <MenuItem value="Regional Dos">Regional Dos</MenuItem>
                <MenuItem value="Regional Tres">Regional Tres</MenuItem>
                <MenuItem value="Regional Cuatro">Regional Cuatro</MenuItem>
                <MenuItem value="Teja Uno">Teja Uno</MenuItem>
                <MenuItem value="Teja Dos">Teja Dos</MenuItem>
                <MenuItem value="Teja Tres">Teja Tres</MenuItem>
              </Select>
            </FormControl>
            <MsgError/>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="number"
                label="Cant. Personas"
                onChange={(e) => setCantPersonas(e.target.value)}
                value={cantPersonas}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Celular"
                onChange={(e) => setCelular(e.target.value)}
                value={celular}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="email"
                label="Correo"
                onChange={(e) => setCorreo(e.target.value)}
                value={correo}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Ubicacion"
                onChange={(e) => setUbicacion(e.target.value)}
                value={ubicacion}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="number"
                label="Precio x Noche"
                onChange={(e) => setValorNoche(e.target.value)}
                value={valorNoche}
              />
            </FormControl>
            <div className="containerBtn">
              <Button
                className="button"
                variant="contained"
                color="success"
                onClick={handleNuevoBtn}
              >
                Nuevo
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalForm;
