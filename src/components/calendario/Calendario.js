import { useEffect, useState } from 'react';
import FullCalender from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import esLocale from '@fullcalendar/core/locales/es';
import { format } from 'date-fns';

import './calendario.css';
import Detalle from '../detalle/Detalle';
import { Card, CardContent, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import ModalForm from '../modalForm/ModalForm';
import Filtro from '../filtro/Filtro';
import {
  editArriendo,
  getArriendos,
  getArriendosPorRagoFecha,
} from '../../helpers/funcionesFirebase';
import {
  calcularValorTotalCondDescuento,
  cantidadDiasArriendo,
  ordenarDataArriendos,
} from '../../helpers/funciones';
import { grey } from '@mui/material/colors';

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

  const [rangoFecha, setRangoFecha] = useState({
    inicial: new Date('10-03-2024'),
    final: new Date('03-03-2025'),
  });

  const getEventos = async () => {
    const data = await getArriendos();
    const nuevaData = ordenarDataArriendos(data);
    const nuevadataFecha = nuevaData.map((item) => ({
      ...item,
      start: new Date(item.start).toISOString().slice(0, 10),
      end: new Date(item.end).toISOString().slice(0, 10),
    }));
    setEventos(nuevadataFecha);
  };

  const recuperarIngresoTotal = async () => {
    const valor = await getArriendosPorRagoFecha(
      rangoFecha.inicial,
      rangoFecha.final
    );
    console.log(valor);
    return setIngresoTotal(valor);
  };

  useEffect(() => {
    getEventos();
    recuperarIngresoTotal();
  }, [rangoFecha]);

  // console.log(rangoFecha);

  return (
    <div className="containerApp">
      <Card className="cardEstadistica">
        <div style={{ display: 'flex', gap: 20 }}>
          <DatePicker
            slotProps={{ textField: { size: 'small' } }}
            label={'Desde Mes'}
            views={['month', 'year']}
            name="inicial"
            value={rangoFecha.inicial}
            onChange={(date) => setRangoFecha({ ...rangoFecha, inicial: date })}
          />
          -
          <DatePicker
            slotProps={{ textField: { size: 'small' } }}
            label={'Hasta Mes'}
            views={['month', 'year']}
            name="final"
            value={rangoFecha.final}
            onChange={(date) => setRangoFecha({ ...rangoFecha, final: date })}
          />
        </div>
        {/* <Filtro tipo='Total' setIngresoTotal={setIngresoTotal}/> */}
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, padding: 1, backgroundColor: grey[100] }}>
          <Typography sx={{ fontSize: 20 }} component="div">
            Total: 
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 20 }} component="div">
            ${new Intl.NumberFormat().format(ingresoTotal)}
          </Typography>
        </Card>
      </Card>
      <div className="containerPrincipal">
        <Card className="containerCalender">
          <Filtro setEventos={setEventos} tipo="Todas las Cabanas" />
          <ModalForm
            open={open}
            handleClose={handleClose}
            infoSelected={infoSelected}
            getEventos={getEventos}
            recuperarIngresoTotal={recuperarIngresoTotal}
            setSelectEvent={setSelectEvent}
          />
          <FullCalender
            events={eventos}
            editable={true}
            contentHeight="550px"
            plugins={[
              interactionPlugin,
              dayGridPlugin,
              multiMonthPlugin,
              listPlugin,
            ]}
            locale={esLocale}
            selectable={true}
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'prev,next today dayGridMonth,dayGridWeek,multiMonthYear',
            }}
            views={{
              listaBtn: {
                type: 'listMonth',
                buttonText: 'Lista',
              },
            }}
            eventChange={async (info) => {
              const cantDias = cantidadDiasArriendo(
                info.event.startStr,
                info.event.endStr
              );
              const valTotal = calcularValorTotalCondDescuento(
                info.event.extendedProps.descuento,
                cantDias,
                info.event.extendedProps.valorNoche
              );
              const data = {
                id: info.event.id,
                start: new Date(info.event.start).toISOString().slice(0, 10),
                end: new Date(info.event.end).toISOString().slice(0, 10),
                cantDias: cantDias,
                valorTotal: valTotal,
              };

              await editArriendo(info.event.id, data);
              getEventos();
              setSelectEvent({});
              recuperarIngresoTotal();
            }}
            // eventDrop={async (info) => {
            //   const data = {
            //     start: new Date(info.event.startStr).toISOString().slice(0,10),
            //     end: new Date(info.event.endStr).toISOString().slice(0,10),
            //   };

            //   await editArriendo(info.event.id, data);
            //   getEventos();
            //   recuperarIngresoTotal()
            // }}
            select={(info) => {
              console.log(info.start);
              handleOpen();
              setInfoSelected({
                fechaInicio: format(info.start, 'yyyy-MM-dd'),
                fechaTermino: format(info.end, 'yyyy-MM-dd'),
              });
            }}
            eventClick={(info) => {
              const fechaInicial = new Date(info.event.start).toISOString();
              // console.log(new Date(fechaInicial))
              const fechaFinal = format(info.event.end, 'yyyy-MM-dd');
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
                start: fechaInicial,
                end: fechaFinal,
                valorNoche: info.event._def.extendedProps.valorNoche,
                cabana: info.event._def.extendedProps.cabana,
                ubicacion: info.event._def.extendedProps.ubicacion,
                cantPersonas: info.event._def.extendedProps.cantPersonas,
                correo: info.event._def.extendedProps.correo,
                celular: info.event._def.extendedProps.celular,
                pago: info.event._def.extendedProps.pago,
                descuento: info.event._def.extendedProps.descuento,
                valorTotal: info.event._def.extendedProps.valorTotal,
                cantDias: info.event._def.extendedProps.cantDias,
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
    </div>
  );
};

export default Calendario;
