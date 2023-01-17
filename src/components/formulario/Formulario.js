import { useEffect, useState } from 'react'
import { TextField, Button, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { editArriendo } from '../../helpers/funcionesFirebase'

import './formulario.css'

const Formulario = ({ selectEvent, getEventos, setEdit, setSelectEvent }) => {

    const [arrendantario, setArrendantario] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [cabana, setCabana] = useState('');
    const [cantPersonas, setCantPersonas] = useState(0);
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [id, setId] = useState('');
    const [pagado, setPagado] = useState('');
    const [valorNoche, setValorNoche] = useState(0);


    useEffect(() => {
        setArrendantario(selectEvent.title)
        setFechaInicio(selectEvent.start)
        setFechaTermino(selectEvent.end)
        setCabana(selectEvent.cabana)
        setCantPersonas(selectEvent.cantPersonas)
        setCelular(selectEvent.celular)
        setUbicacion(selectEvent.ubicacion)
        setValorNoche(selectEvent.valorNoche)
        setCorreo(selectEvent.correo)
        setId(selectEvent.id)
        setPagado(selectEvent.pago)
    }, [selectEvent])

    const handleButton = async () => {

        const data = {
            id: id,
            title: arrendantario,
            start: fechaInicio,
            end: fechaTermino,
            cabana: cabana,
            cantPersonas: cantPersonas,
            celular: celular,
            correo: correo,
            pago: pagado,
            ubicacion: ubicacion,
            valorNoche: valorNoche,
        }

        await editArriendo(selectEvent.id, data)
        setSelectEvent(data)
        getEventos()
        setEdit(false)
        // console.log(filterLocal);
    }

    return (
        <div className='containerForm'>
            <div className='cerrarEditar'>
                <IconButton aria-label="close" onClick={() => setEdit(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Editar Arriendo</Typography>
            <div className="containerItem">
                <TextField size='small' variant="standard" type='text' label='Arrendatario' onChange={e => setArrendantario(e.target.value)} value={arrendantario} />
                <TextField size='small' variant="standard" type='text' label='Fecha Entrada' onChange={e => setFechaInicio(e.target.value)} value={fechaInicio} />
                <TextField size='small' variant="standard" type='text' label='Fecha Salida' onChange={e => setFechaTermino(e.target.value)} value={fechaTermino} />
                <TextField size='small' variant="standard" type='text' label='Cabana' onChange={e => setCabana(e.target.value)} value={cabana} />
                <TextField size='small' variant="standard" type='text' label='Cant. Personas' onChange={e => setCantPersonas(e.target.value)} value={cantPersonas} />
                <TextField size='small' variant="standard" type='text' label='Celular' onChange={e => setCelular(e.target.value)} value={celular} />
                <TextField size='small' variant="standard" type='text' label='Correo' onChange={e => setCorreo(e.target.value)} value={correo} />
                <TextField size='small' variant="standard" type='text' label='Ubicacion' onChange={e => setUbicacion(e.target.value)} value={ubicacion} />
                <TextField size='small' variant="standard" type='text' label='Precio x Noche' onChange={e => setValorNoche(e.target.value)} value={valorNoche} />
                <div className="containerBtn">
                    <Button className='button' variant='contained' color='info' onClick={handleButton}>Editar</Button>
                </div>
            </div>
        </div>
    )
}

export default Formulario