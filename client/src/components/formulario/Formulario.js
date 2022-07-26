import React, { useEffect, useState } from 'react'
import { Card, TextField, Button } from '@mui/material'

import './formulario.css'

const Formulario = ({ selectEvent, getEventos }) => {


    const [id, setId] = useState(null);
    const [arrendantario, setArrendantario] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [cabana, setCabana] = useState('');
    const [cantPersonas, setCantPersonas] = useState(0);
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [valorNoche, setValorNoche] = useState(0);


    console.log(selectEvent);

    useEffect(() => {
        setArrendantario(selectEvent.titulo)
        setFechaInicio(selectEvent.fechaInicio)
        setFechaTermino(selectEvent.fechaTermino)
        setId(Number(selectEvent.id))
        setCabana(selectEvent.cabana)
        setCantPersonas(selectEvent.cantPersonas)
        setCelular(selectEvent.celular)
        setUbicacion(selectEvent.ubicacion)
        setValorNoche(selectEvent.valorNoche)
        setCorreo(selectEvent.correo)
    }, [selectEvent])

    const local = JSON.parse(localStorage.getItem('eventos'))
    const filterLocal = local.filter(item => item.id != selectEvent.id)

    const handleButton = () => {

        const data = {
            id: id,
            title: arrendantario,
            start: fechaInicio,
            end: fechaTermino,
            cabana: cabana,
            cantPersonas: cantPersonas,
            celular: celular,
            correo: correo,
            ubicacion: ubicacion,
            valorNoche: valorNoche,
        }

        filterLocal.push(data)

        localStorage.setItem('eventos', JSON.stringify(filterLocal))
        getEventos()
        // console.log(filterLocal);
    }

    return (
        <div className='containerForm'>
            <div className="containerItem">
                <TextField type={'text'} placeholder='Arrendatario' onChange={e => setArrendantario(e.target.value)} value={arrendantario} />
                <TextField type={'text'} placeholder='Fecha Entrada' onChange={e => setFechaInicio(e.target.value)} value={fechaInicio} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setFechaTermino(e.target.value)} value={fechaTermino} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setCabana(e.target.value)} value={cabana} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setCantPersonas(e.target.value)} value={cantPersonas} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setCelular(e.target.value)} value={celular} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setCorreo(e.target.value)} value={correo} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setUbicacion(e.target.value)} value={ubicacion} />
                <TextField type={'text'} placeholder='Fecha Salida' onChange={e => setValorNoche(e.target.value)} value={valorNoche} />
                <div className="containerBtn">
                    <Button className='button' variant='contained' color='info' onClick={handleButton}>Editar</Button>
                </div>
            </div>
        </div>
    )
}

export default Formulario