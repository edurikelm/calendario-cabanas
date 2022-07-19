import FullCalender from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import { useEffect, useState } from 'react'
import Formulario from '../formulario/Formulario'

const Calendario = () => {

    const [nuevoArriendo, setNuevoArriendo] = useState({
        id: null,
        titulo: '',
        fechaInicio: '',
        fechaTermino: ''
    });

    const [eventos, setEventos] = useState(JSON.parse(localStorage.getItem("eventos"))); 


    return (
        <div>
            <Formulario nuevoArriendo={nuevoArriendo}/>
            <FullCalender
                events={eventos}
                editable={true}
                plugins={[interactionPlugin, dayGridPlugin]}
                initialView='dayGridMonth'
                locale={esLocale}
                selectable={true}
                // select={(info) => prompt('selected ' + info.startStr + ' to ' + info.endStr) }
                select={(info) => {

                    const result = prompt('Nombre arredador')
                    const num = Math.random() * 345123
                    const evento = { title: result, start: info.startStr, end: info.endStr, id: num }

                    if (evento.title === null || evento.title === '') {
                        return
                    } else {
                        eventos.push(evento)
                        localStorage.setItem('eventos', JSON.stringify(eventos))
                    }

                }}
                eventClick={(info) => {    
                    // console.log(info.event.id);
                    setNuevoArriendo({
                        id: info.event.id,
                        titulo: info.event.title,
                        fechaInicio: info.event.startStr,
                        fechaTermino: info.event.endStr,
                    })
                }}
            />
        </div>
    )
}

export default Calendario