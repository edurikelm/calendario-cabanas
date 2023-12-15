import { useEffect, useState } from 'react';
import FullCalender from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { format } from 'date-fns';

import './calendario.css';
import Detalle from '../detalle/Detalle';
import { Card, Typography } from '@mui/material';
import ModalForm from '../modalForm/ModalForm';
import Filtro from '../filtro/Filtro';
// import { sumarDias } from '../../helpers/funciones'
import { editArriendo, getArriendos } from '../../helpers/funcionesFirebase';
import { ordenarDataArriendos, sumarIngresos } from '../../helpers/funciones';

const Calendario = () => {
  const [infoSelected, setInfoSelected] = useState({
    start: '',
    end: '',
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectEvent, setSelectEvent] = useState({});

  const [eventos, setEventos] = useState([]);
  const [ingresoTotal, setIngresoTotal] = useState(0);

  const getEventos = async () => {
    const data = await getArriendos();
    const nuevaData = ordenarDataArriendos(data);
    setEventos(nuevaData);
  };

  const recuperarIngresoTotal = async () => {
    const valor = await sumarIngresos()
    return setIngresoTotal(valor)
  }

  useEffect(() => {
    getEventos();
    recuperarIngresoTotal()
  }, []);

  return (
    <>
      <div className="containerEstadistica">
        <Card className='cardEstadistica'>
        <Typography variant="h7" gutterBottom>
        Total Arriendos
      </Typography>
      <Typography variant="h5" component="div">${new Intl.NumberFormat().format(ingresoTotal)}</Typography>
        </Card>
      </div>
      <div className="containerPrincipal">
        <Card className="containerCalender">
          <Filtro setEventos={setEventos} eventos={eventos} />
          <ModalForm
            open={open}
            handleClose={handleClose}
            infoSelected={infoSelected}
            getEventos={getEventos}
            recuperarIngresoTotal={recuperarIngresoTotal}
          />
          <FullCalender
            events={eventos}
            editable={true}
            contentHeight="550px"
            plugins={[interactionPlugin, dayGridPlugin, listPlugin]}
            locale={esLocale}
            selectable={true}
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'prev,next today dayGridMonth,listaBtn',
            }}
            views={{
              listaBtn: {
                type: 'listMonth',
                buttonText: 'Lista',
              },
            }}
            eventDrop={async (info) => {
              const data = {
                start: info.event.startStr,
                end: info.event.endStr,
              };

              await editArriendo(info.event.id, data);
              getEventos();
            }}
            select={(info) => {
              handleOpen();
              setInfoSelected({
                fechaInicio: info.startStr,
                fechaTermino: info.endStr,
              });
            }}
            eventClick={(info) => {
              // console.log(info.event);
              // const fechaFinal = sumarDias(info.event.end)
              const fecha = format(info.event.end, 'yyyy-MM-dd');
              let nuevoArreglo = [];
              const tituloCabanaArreglo = info.event.title.split(' ');
              tituloCabanaArreglo.length = tituloCabanaArreglo.length - 2;
              for (let i = 0; i < tituloCabanaArreglo.length; i++) {
                const element = tituloCabanaArreglo[i];
                nuevoArreglo.push(element);
              }

              // const nuevaCabana = tituloCabanaArreglo[1] + " " + tituloCabanaArreglo[2]
              const nuevaTitlo = nuevoArreglo.toString().replace(/,/g, ' ');
              setSelectEvent({
                id: info.event.id,
                title: nuevaTitlo,
                start: info.event.startStr,
                end: fecha,
                valorNoche: info.event._def.extendedProps.valorNoche,
                cabana: info.event._def.extendedProps.cabana,
                ubicacion: info.event._def.extendedProps.ubicacion,
                cantPersonas: info.event._def.extendedProps.cantPersonas,
                correo: info.event._def.extendedProps.correo,
                celular: info.event._def.extendedProps.celular,
                pago: info.event._def.extendedProps.pago,
                descuento: info.event._def.extendedProps.descuento,
                valorTotal: info.event._def.extendedProps.valorTotal,
                cantDias: info.event._def.extendedProps.cantDias
              });
            }}
          />
        </Card>
        {/* <Formulario nuevoArriendo={nuevoArriendo} getEventos={getEventos}/> */}
        <Detalle
          selectEvent={selectEvent}
          getEventos={getEventos}
          setSelectEvent={setSelectEvent}
          recuperarIngresoTotal={recuperarIngresoTotal}
        />
      </div>
    </>
  );
};

export default Calendario;
