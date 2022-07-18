import FullCalender from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import { useEffect, useState } from 'react'

function App() {

  const [eventos, setEventos] = useState([]);

  const dataLocal = JSON.parse(localStorage.getItem("eventos"))

  useEffect(() => {
    setEventos(dataLocal)
  }, [])

  let numClicks = 0

  const contarClicks = (info) => {
    ++numClicks
    const idEvento = info.event.id

    if(numClicks === 2){
      const mensaje = window.confirm("Eliminar evento?")
      const nuevaData = dataLocal.filter(item => item.id)
      console.log(nuevaData);
      numClicks=0
    }
  }

  return (
    <div>
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
          const num = Math.random()*345123
          const evento = { title: result, start: info.startStr, end: info.endStr, id: Math.floor(num) }

          if(evento.title === null || evento.title === ''){
            return
          }else{
            dataLocal.push(evento)
            localStorage.setItem('eventos', JSON.stringify(dataLocal))
          }

        }}
        eventClick={(info)=>{
          
          contarClicks(info)
          
        }}
      />
    </div>
  );
}

export default App;
