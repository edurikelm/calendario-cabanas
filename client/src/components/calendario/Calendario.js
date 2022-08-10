import { useEffect, useState } from 'react'
import FullCalender from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import { format } from 'date-fns';

import './calendario.css'
import Detalle from '../detalle/Detalle'
import { Card } from '@mui/material'
import ModalForm from '../modalForm/ModalForm'
import { sumarDias } from '../../helpers/funciones'
import { getArriendos } from '../../helpers/funcionesFirebase'

const Calendario = () => {

    

    const [infoSelected, setInfoSelected] = useState({
        // id: null,
        fechaInicio: '',
        fechaTermino: '',

    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectEvent, setSelectEvent] = useState({
        // id: null,
        titulo: '',
        fechaInicio: '',
        fechaTermino: '',
        valorNoche: 0,
        cabana: '',
        ubicacion: '',
        arrendatario: '',
        cantPersonas: 0,
        correo: '',
        celular: ''
    });

    const [eventos, setEventos] = useState([]);

    const getEventos = async () => {
        const data = await getArriendos()
        // const data = await JSON.parse(localStorage.getItem("eventos"));
        setEventos(data)
    }

    useEffect(() => {
        getEventos()
    }, [])

    return (
        <div className='containerPrincipal'>
            <Card className="containerCalender">
                <ModalForm open={open} handleClose={handleClose} infoSelected={infoSelected} getEventos={getEventos} />
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
                        // console.log(info.event)
                        const filtro = eventos.filter(item => item.id != info.event.id)
                        filtro.push({
                            // id: info.event.id,
                            title: info.event.title,
                            start: info.event.startStr,
                            end: info.event.endStr,
                            valorNoche: info.event._def.extendedProps.valorNoche,
                            cabana: info.event._def.extendedProps.cabana,
                            ubicacion: info.event._def.extendedProps.ubicacion,
                            arrendatario: info.event._def.extendedProps.arrendatario,
                            cantPersonas: info.event._def.extendedProps.cantPersonas,
                            correo: info.event._def.extendedProps.correo,
                            celular: info.event._def.extendedProps.celular
                        })
                        localStorage.setItem('eventos', JSON.stringify(filtro))
                        getEventos()
                    }}
                    select={(info) => {
                        handleOpen()
                        // const num = Math.round(Math.random() * 65437)

                        setInfoSelected({
                            // id: num,
                            fechaInicio: info.startStr,
                            fechaTermino: info.endStr
                        })
                        
                        // console.log(info)
                        // const result = prompt('Nombre arredador')
                        // const evento = {
                        //     id: num,
                        //     title: result,
                        //     start: info.startStr,
                        //     end: info.endStr,
                        // }

                        // if (evento.title === null || evento.title === '') {
                        //     return
                        // } else {
                        //     eventos.push(evento)
                        //     localStorage.setItem('eventos', JSON.stringify(eventos))
                        //     getEventos()
                        // }

                    }}
                    eventClick={(info) => {
                        // console.log(info.event.end);
                        const fechaFinal = sumarDias(info.event.end)
                        const fecha = format(info.event.end, 'yyyy-MM-dd')

                        setSelectEvent({
                            // id: info.event.id,
                            titulo: info.event.title,
                            fechaInicio: info.event.startStr,
                            fechaTermino: fecha,
                            valorNoche: info.event._def.extendedProps.valorNoche,
                            cabana: info.event._def.extendedProps.cabana,
                            ubicacion: info.event._def.extendedProps.ubicacion,
                            arrendatario: info.event._def.extendedProps.arrendatario,
                            cantPersonas: info.event._def.extendedProps.cantPersonas,
                            correo: info.event._def.extendedProps.correo,
                            celular: info.event._def.extendedProps.celular
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