import { useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { postArriendo } from '../../helpers/funcionesFirebase';

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

const ModalForm = ({ open, handleClose, infoSelected, getEventos }) => {

    const [arrendantario, setArrendantario] = useState('');
    const [cabana, setCabana] = useState('');
    const [cantPersonas, setCantPersonas] = useState(0);
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [valorNoche, setValorNoche] = useState(0);
    
    const handleNuevoBtn = async () => {

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
            pago: false
        }

        await postArriendo(data)
        handleClose()
        getEventos()
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
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Agregar Arriendo</Typography>
                    <div className="containerItem">
                        <TextField size='small' variant="standard" type='text' label='Arrendatario' onChange={e => setArrendantario(e.target.value)} value={arrendantario} />
                        <TextField size='small' variant="standard" type='text' label='Fecha Entrada' disabled value={infoSelected.fechaInicio} />
                        <TextField size='small' variant="standard" type='text' label='Fecha Salida' disabled value={infoSelected.fechaTermino} />
                        <TextField size='small' variant="standard" type='text' label='Cabana' onChange={e => setCabana(e.target.value)} value={cabana} />
                        <TextField size='small' variant="standard" type='number' label='Cant. Personas' onChange={e => setCantPersonas(e.target.value)} value={cantPersonas} />
                        <TextField size='small' variant="standard" type='text' label='Celular' onChange={e => setCelular(e.target.value)} value={celular} />
                        <TextField size='small' variant="standard" type='email' label='Correo' onChange={e => setCorreo(e.target.value)} value={correo} />
                        <TextField size='small' variant="standard" type='text' label='Ubicacion' onChange={e => setUbicacion(e.target.value)} value={ubicacion} />
                        <TextField size='small' variant="standard" type='number' label='Precio x Noche' onChange={e => setValorNoche(e.target.value)} value={valorNoche} />
                        <div className="containerBtn">
                            <Button className='button' variant='contained' color='success' onClick={handleNuevoBtn}>Nuevo</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalForm