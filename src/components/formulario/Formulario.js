import { useEffect } from 'react'
import { TextField, Button, Typography, IconButton, Checkbox, FormControl } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { editArriendo } from '../../helpers/funcionesFirebase'
import './formulario.css'
import { calcularValorTotalCondDescuento, cantidadDiasArriendo } from '../../helpers/funciones'
import { DatePicker } from '@mui/x-date-pickers'
import { ListaCabanas } from '../listaCabanas/ListaCabanas'
import { useForm } from '../../hooks/useForm'


const Formulario = ({ selectEvent, getEventos, setEdit, setSelectEvent, recuperarIngresoTotal }) => {

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

    useEffect(() => {

        setDataInput({...selectEvent, start:new Date(selectEvent.start), end: new Date(selectEvent.end)})

    }, [setDataInput, selectEvent])
    
    const handleButton = async () => {

        const cantDias = cantidadDiasArriendo(dataInput.start,dataInput.end) + 1
        const valorTotal = calcularValorTotalCondDescuento(dataInput.descuento, cantDias, dataInput.valorNoche)
        const data = {
            id: selectEvent.id,
            title: dataInput.title,
            start: new Date(dataInput.start).toISOString().slice(0,10),
            end: new Date(dataInput.end).toISOString().slice(0,10),
            cabana: dataInput.cabana,
            cantPersonas: dataInput.cantPersonas,
            celular: dataInput.celular,
            // correo: correo,
            pago: dataInput.pago,
            ubicacion: dataInput.ubicacion,
            valorNoche: dataInput.valorNoche,
            descuento: dataInput.descuento,
            cantDias,
            valorTotal
        }

        await editArriendo(selectEvent.id, data)
        setSelectEvent({})
        getEventos()
        setEdit(false)
        recuperarIngresoTotal()
        resetInput()
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField size='small' variant="standard" type='text' label='Arrendatario' name='title' onChange={handleInputChange} value={dataInput.title} />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <DatePicker label='Desde' slotProps={{textField:{size:'small'}}} format='dd-MM-yyy' name='start' value={new Date(selectEvent.start)} onChange={(date) => setDataInput({...dataInput, start:date})}/>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <DatePicker label='Hasta' slotProps={{textField:{size:'small'}}} format='dd-MM-yyy' name='end' value={new Date(selectEvent.end)} onChange={(date) => setDataInput({...dataInput, end:date})}/>                    
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <ListaCabanas dataInput={dataInput} handleInputChange={handleInputChange} />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField size='small' variant="standard" type='text' label='Cant. Personas' name='cantPersonas' onChange={handleInputChange} value={dataInput.cantPersonas} />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField size='small' variant="standard" type='text' label='Celular' name='celular' onChange={handleInputChange} value={dataInput.celular} />
                </FormControl>
                {/* <TextField size='small' variant="standard" type='text' label='Correo' onChange={e => setCorreo(e.target.value)} value={correo} /> */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField size='small' variant="standard" type='text' label='Ubicacion' name='ubicacion' onChange={handleInputChange} value={dataInput.ubicacion} />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField size='small' variant="standard" type='text' label='Precio x Noche' name='valorNoche' onChange={handleInputChange} value={dataInput.valorNoche} />
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
                        checked={dataInput.descuento}
                        onChange={() =>
                        !dataInput.descuento
                            ? setDataInput({...dataInput, descuento:true})
                            : setDataInput({...dataInput, descuento:false})
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