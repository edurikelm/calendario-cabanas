import { useEffect, useState } from 'react'
import { TextField, Button, Typography, IconButton, Checkbox, FormControl } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { editArriendo } from '../../helpers/funcionesFirebase'
import './formulario.css'
import { calcularValorTotalCondDescuento, cantidadDiasArriendo } from '../../helpers/funciones'
import { DatePicker } from '@mui/x-date-pickers'


const Formulario = ({ selectEvent, getEventos, setEdit, setSelectEvent, recuperarIngresoTotal }) => {

    const [arrendantario, setArrendantario] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaTermino, setFechaTermino] = useState(new Date());
    const [cabana, setCabana] = useState('');
    const [cantPersonas, setCantPersonas] = useState(0);
    const [celular, setCelular] = useState('');
    // const [correo, setCorreo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [id, setId] = useState('');
    const [pagado, setPagado] = useState('');
    const [valorNoche, setValorNoche] = useState(0);
    const [descuento, setDescuento] = useState(false);

    useEffect(() => {
        setArrendantario(selectEvent.title)
        setFechaInicio(new Date(selectEvent.start))
        setFechaTermino(new Date(selectEvent.end))
        setCabana(selectEvent.cabana)
        setCantPersonas(selectEvent.cantPersonas)
        setCelular(selectEvent.celular)
        setUbicacion(selectEvent.ubicacion)
        setValorNoche(selectEvent.valorNoche)
        // setCorreo(selectEvent.correo)
        setId(selectEvent.id)
        setPagado(selectEvent.pago)
        setDescuento(selectEvent.descuento)
    }, [selectEvent])

    // console.log(cantidadDiasArriendo(fechaInicio,fechaTermino))

    const handleButton = async () => {

        const cantDias = cantidadDiasArriendo(fechaInicio,fechaTermino) + 1
        const valorTotal = calcularValorTotalCondDescuento(descuento, cantDias, valorNoche)
        const data = {
            id: id,
            title: arrendantario,
            start: new Date(fechaInicio).toISOString().slice(0,10),
            end: new Date(fechaTermino).toISOString().slice(0,10),
            cabana: cabana,
            cantPersonas: cantPersonas,
            celular: celular,
            // correo: correo,
            pago: pagado,
            ubicacion: ubicacion,
            valorNoche: valorNoche,
            descuento: descuento,
            cantDias,
            valorTotal
        }
        console.log(data)

        await editArriendo(selectEvent.id, data)
        setSelectEvent({})
        getEventos()
        setEdit(false)
        recuperarIngresoTotal()
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
                <DatePicker label='Desde' slotProps={{textField:{size:'small'}}} format='dd-MM-yyy' value={fechaInicio} onChange={(date) => setFechaInicio(date)}/>
                <DatePicker label='Hasta' slotProps={{textField:{size:'small'}}} format='dd-MM-yyy' value={fechaTermino} onChange={(date) => setFechaTermino(date)}/>
                <TextField size='small' variant="standard" type='text' label='Cabana' onChange={e => setCabana(e.target.value)} value={cabana} />
                <TextField size='small' variant="standard" type='text' label='Cant. Personas' onChange={e => setCantPersonas(e.target.value)} value={cantPersonas} />
                <TextField size='small' variant="standard" type='text' label='Celular' onChange={e => setCelular(e.target.value)} value={celular} />
                {/* <TextField size='small' variant="standard" type='text' label='Correo' onChange={e => setCorreo(e.target.value)} value={correo} /> */}
                <TextField size='small' variant="standard" type='text' label='Ubicacion' onChange={e => setUbicacion(e.target.value)} value={ubicacion} />
                <TextField size='small' variant="standard" type='text' label='Precio x Noche' onChange={e => setValorNoche(e.target.value)} value={valorNoche} />
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
                        checked={descuento}
                        onChange={() =>
                        !descuento
                            ? setDescuento(true)
                            : setDescuento(false)
                        }
                    />
                    <label htmlFor="">20% Gringo</label>
                </FormControl>
                <div className="containerBtn">
                    <Button className='button' variant='contained' color='info' onClick={handleButton}>Editar</Button>
                </div>
            </div>
        </div>
    )
}

export default Formulario