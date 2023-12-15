import { useEffect, useState } from 'react'
import { Avatar, Button, ButtonGroup, Card, CardContent, Chip, Divider, IconButton, Typography } from '@mui/material'
import WhatsApp from '@mui/icons-material/WhatsApp'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HouseIcon from '@mui/icons-material/House'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import './detalle.css'

import Formulario from '../formulario/Formulario'
import { cantidadDiasArriendo, enviarMensajeWhatsapp, formatoPesos } from '../../helpers/funciones'
import { deleteArriendo, editArriendo } from '../../helpers/funcionesFirebase'

const Detalle = ({ selectEvent, getEventos, setSelectEvent, recuperarIngresoTotal }) => {

  const [edit, setEdit] = useState(false);
  const [pagado, setPagado] = useState(false);


  const deleteBtn = async () => {
    await deleteArriendo(selectEvent.id)
    // setEdit(false)
    setSelectEvent("")
    getEventos()
    recuperarIngresoTotal()
  }

  const valorxNoche = formatoPesos(selectEvent.valorNoche)
  const diasArriendo = cantidadDiasArriendo(selectEvent.start, selectEvent.end)
  const costoTotalArriendo = formatoPesos(selectEvent.valorTotal)

  const cambiarPago = (estado) => {
    editArriendo(selectEvent.id, {pago: estado})
    setSelectEvent({...selectEvent, pago: estado})
    getEventos()
  }



  useEffect(()=>{
    setPagado(selectEvent.pago)
  },[selectEvent.pago])

  

  return (
    <Card className='containerDetalle'>
      {
        edit ? <Formulario selectEvent={selectEvent} getEventos={getEventos} setEdit={setEdit} setSelectEvent={setSelectEvent} recuperarIngresoTotal={recuperarIngresoTotal}/>
          : Object.keys(selectEvent).length === 0 ? <Typography sx={{ fontSize: 20, fontWeight: 'bold', margin: 5, textAlign:'center' }}>Seleccione un evento para ver el detalle</Typography> : <CardContent className='containerInfo'>
            <div className='headerContainer'>
              <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Detalle Arriendo</Typography>
              <ButtonGroup>
                <IconButton size='small' aria-label="edit" onClick={() => setEdit(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton size='small' aria-label="delete" onClick={deleteBtn}>
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup>
            </div>
            <div className='textDetalle'>
              {
                pagado 
                ? 
                <Chip label="Pagado" color="success" size="small" deleteIcon={<DoneIcon />} onDelete={()=> cambiarPago(false)} />
                :
                <Chip label="Pagado" color="error" size="small" deleteIcon={<CloseIcon />} onDelete={()=> cambiarPago(true)} />
              }
            </div>
            <Divider />
            <div className='textDetalle'>
              <HouseIcon />
              <Typography sx={{ fontSize: 15 }}>{selectEvent.cabana}</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{valorxNoche} / dia</Typography>
            </div>
            <Divider />
            <div className='containerCheck'>
              <Card className='check'>
                <Typography sx={{ fontSize: 14, opacity: 0.4 }}>Ingreso</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{selectEvent.start}</Typography>
              </Card>
              <Card className='check'>
                <Typography sx={{ fontSize: 14, opacity: 0.4 }}>Salida</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{selectEvent.end}</Typography>
              </Card>
            </div>
            <div className='constoTotal'>
              <Typography sx={{ fontSize: 15, }}>Costo Total</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{costoTotalArriendo === '$NaN' ? '$0' : costoTotalArriendo}</Typography>
            </div>
            <Divider />
            <div className='cantPersonas'>
              <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Cantidad de Personas</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 'bold', backgroundColor: '#eceffd', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>{selectEvent.cantPersonas}</Typography>
            </div>
            <Divider />
            <div className='containerContacto'>
              <Avatar sx={{ width: 56, height: 56 }} alt={`${selectEvent.title}`} src="/static/images/avatar/1.jpg" />
              <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{selectEvent.title}</Typography>
            </div>
            <Divider />
            <div className='containerInfoContacto'>
              <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Contacto info</Typography>
              <div className='detalleInfoContacto'>
                <Typography sx={{ fontSize: 12, display: 'flex', gap: 0.5 }}><MailIcon fontSize='small' sx={{fontSize: 15}}/>{selectEvent.correo}</Typography>
                <Typography sx={{ fontSize: 12, display: 'flex', gap: 0.5 }}><PhoneIcon fontSize='small' sx={{fontSize: 15}}/>+56 9 {selectEvent.celular}</Typography>
                <Typography sx={{ fontSize: 12, display: 'flex', gap: 0.5 }}><LocationOnIcon fontSize='small' sx={{fontSize: 15}}/>{selectEvent.ubicacion}</Typography>
                <Button variant='contained' size='small' color='success' startIcon={<WhatsApp />} onClick={() => enviarMensajeWhatsapp(`569${selectEvent.celular}`)}>Whatsapp</Button>
              </div>
            </div>
          </CardContent>}
    </Card>
  )
}

export default Detalle