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
        fechaInicio: '',
        fechaTermino: '',

    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectEvent, setSelectEvent] = useState({
        id: null,
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
                        setInfoSelected({
                            fechaInicio: info.startStr,
                            fechaTermino: info.endStr
                        })

                    }}
                    eventClick={(info) => {
                        // console.log(info.event);
                        const fechaFinal = sumarDias(info.event.end)
                        const fecha = format(info.event.end, 'yyyy-MM-dd')

                        setSelectEvent({
                            id: info.event.id,
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