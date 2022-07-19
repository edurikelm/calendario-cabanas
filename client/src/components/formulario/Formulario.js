import React, { useEffect, useState } from 'react'

const Formulario = ({nuevoArriendo}) => {

    const [id, setId] = useState(null);
    const [arrendantario, setArrendantario] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');

    useEffect(()=>{
        setArrendantario(nuevoArriendo.titulo)
        setFechaInicio(nuevoArriendo.fechaInicio)
        setFechaTermino(nuevoArriendo.fechaTermino)
        setId(Number(nuevoArriendo.id))
    },[nuevoArriendo])
    
    const local = JSON.parse(localStorage.getItem('eventos'))
    const filterLocal = local.filter(item => item.id != nuevoArriendo.id)

    const handleButton = () => {

        const data = {
            title: arrendantario,
            start: fechaInicio,
            end: fechaTermino,
            id: id
        }

        filterLocal.push(data)

        localStorage.setItem('eventos', JSON.stringify(filterLocal))

        // console.log(filterLocal);
    }

    const deleteBtn = () => {
        localStorage.setItem('eventos', JSON.stringify(filterLocal))  
    }

    return (
        <div>
            <input type="text" placeholder='Arrendatario' onChange={e => setArrendantario(e.target.value)} value={arrendantario}/>
            <input type="text" placeholder='Fecha Entrada' onChange={e => setFechaInicio(e.target.value)} value={fechaInicio}/>
            <input type="text" placeholder='Fecha Salida' onChange={e => setFechaTermino(e.target.value)} value={fechaTermino}/>
            <button onClick={handleButton}>Ingresar</button>
            <button onClick={deleteBtn}>Eliminar</button>
        </div>
    )
}

export default Formulario