import FullCalender from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import { useEffect, useState } from 'react'

import './calendario.css'
import Detalle from '../detalle/Detalle'
import { Card } from '@mui/material'

const Calendario = () => {

    const [selectEvent, setSelectEvent] = useState({
        id: null,
        titulo: '',
        fechaInicio: '',
        fechaTermino: '',
        valorNoche: 20000,
        cabana: 'Cabana 1',
        ubicacion: 'Isla Teja',
        arrendatario: 'Gladys Mayorga',
        cantPersonas: 4,
        correo: 'gmayof@gmail.com',
        celular: '79579507'
    });

    const [eventos, setEventos] = useState([]);

    const getEventos = async () => {
        const data = await JSON.parse(localStorage.getItem("eventos"));
        setEventos(data)
    }

    useEffect(() => {
        getEventos()
    }, [])


    return (
        <div className='containerPrincipal'>
            <Card className="containerCalender">
                <FullCalender
                    events={eventos}
                    editable={true}
                    contentHeight='550px'
                    plugins={[interactionPlugin, dayGridPlugin]}
                    initialView='dayGridMonth'
                    locale={esLocale}
                    selectable={true}
                    // select={(info) => prompt('selected ' + info.startStr + ' to ' + info.endStr) }
                    eventDrop={(info) => {
                        const filtro = eventos.filter(item => item.id != info.event.id)
                        filtro.push({
                            id: info.event.id,
                            title: info.event.title,
                            start: info.event.startStr,
                            end: info.event.endStr,
                            cabana: info.event.cabana,
                            cantPersonas: info.event.cantPersonas,
                            celular: info.event.celular,
                            correo: info.event.correo,
                            ubicacion: info.event.ubicacion,
                            valorNoche: info.event.valorNoche,
                        })
                        localStorage.setItem('eventos', JSON.stringify(filtro))
                        getEventos()
                    }}
                    select={(info) => {
                        console.log(info)
                        const result = prompt('Nombre arredador')
                        const num = Math.round(Math.random() * 65437)
                        const evento = {
                            id: num,
                            title: result,
                            start: info.startStr,
                            end: info.endStr,
                        }

                        if (evento.title === null || evento.title === '') {
                            return
                        } else {
                            eventos.push(evento)
                            localStorage.setItem('eventos', JSON.stringify(eventos))
                            getEventos()
                        }

                    }}
                    eventClick={(info) => {
                        // console.log(info.event);
                        setSelectEvent({
                            id: info.event.id,
                            titulo: info.event.title,
                            fechaInicio: info.event.startStr,
                            fechaTermino: info.event.endStr,
                            valorNoche: 20000,
                            cabana: 'Cabana 1',
                            ubicacion: 'Isla Teja',
                            arrendatario: 'Gladys Mayorga',
                            cantPersonas: 4,
                            correo: 'gmayof@gmail.com',
                            celular: '79579507'
                        })
                    }}
                />
            </Card>
            {/* <Formulario nuevoArriendo={nuevoArriendo} getEventos={getEventos}/> */}
            <Detalle selectEvent={selectEvent} getEventos={getEventos} />
        </div>
    )
}

export default Calendario