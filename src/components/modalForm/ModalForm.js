import { useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { postArriendo } from '../../helpers/funcionesFirebase';
import {
  calcularValorTotalCondDescuento,
  cantidadDiasArriendo,
} from '../../helpers/funciones';

import 'react-datepicker/dist/react-datepicker.css';
import { ListaCabanas } from '../listaCabanas/ListaCabanas';
import { useForm } from '../../hooks/useForm';

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

const ModalForm = ({
  open,
  handleClose,
  infoSelected,
  getEventos,
  recuperarIngresoTotal,
  setSelectEvent
}) => {
  const {error, setError, handleInputChange, dataInput, setDataInput, resetInput} = useForm({
    title: '',
    start: '',
    end: '',
    cabana: '',
    cantPersonas: 0,
    celular: '',
    ubicacion: '',
    valorNoche: '',
    pago: false,
    cantDias: 0,
    descuento: false,
    valorTotal: 0,
  })

  const handleNuevoBtn = async () => {
    if (dataInput.cabana === '') {
      return setError('Debe seleccionar una cabana');
    }

    await postArriendo(dataInput);
    handleClose();
    getEventos();
    recuperarIngresoTotal();
    setSelectEvent({})
    resetInput()
  };

  const MsgError = () => {
    return <span style={{ color: 'red' }}>{error}</span>;
  };

  useEffect(() => {
    setDataInput({
      ...dataInput,
      cantDias: cantidadDiasArriendo(
        infoSelected.fechaInicio,
        infoSelected.fechaTermino
      ) + 1,
      start: infoSelected.fechaInicio,
      end: infoSelected.fechaTermino,
      valorTotal: calcularValorTotalCondDescuento(
        dataInput.descuento,
        dataInput.cantDias,
        dataInput.valorNoche
      ),
    });
    if (!open) {
      return resetInput()
    }
  }, [
    infoSelected.fechaInicio,
    infoSelected.fechaTermino,
    dataInput.descuento,
    dataInput.cantDias,
    dataInput.valorNoche,
    open,
  ]);

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
                onChange={handleInputChange}
                value={dataInput.arrendantario}
                name="title"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Desde"
                disabled
                value={new Date(infoSelected.fechaInicio).toLocaleDateString()}
                name="start"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Hasta"
                disabled
                value={new Date(infoSelected.fechaTermino).toLocaleDateString()}
                name="end"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <ListaCabanas dataInput={dataInput} handleInputChange={handleInputChange} />
            </FormControl>
            <MsgError />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="number"
                label="Cant. Personas"
                onChange={handleInputChange}
                value={dataInput.cantPersonas}
                name="cantPersonas"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Celular"
                onChange={handleInputChange}
                value={dataInput.celular}
                name="celular"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="text"
                label="Ubicacion"
                onChange={handleInputChange}
                value={dataInput.ubicacion}
                name="ubicacion"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                size="small"
                variant="standard"
                type="number"
                label="Precio x Noche"
                onChange={handleInputChange}
                value={dataInput.valorNoche}
                name="valorNoche"
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Checkbox
                onChange={() =>
                  !dataInput.descuento
                    ? setDataInput({ ...dataInput, descuento: true })
                    : setDataInput({ ...dataInput, descuento: false })
                }
              />
              <label htmlFor="">20% Gringo</label>
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
