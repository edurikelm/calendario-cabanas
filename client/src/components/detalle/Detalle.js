import { useState } from 'react'
import { Avatar, Button, ButtonGroup, Card, CardContent, Divider, IconButton, Typography } from '@mui/material'
import WhatsApp from '@mui/icons-material/WhatsApp'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HouseIcon from '@mui/icons-material/House'

import './detalle.css'
import Formulario from '../formulario/Formulario'
import { cantidadDiasArriendo, enviarMensajeWhatsapp, formatoPesos } from '../../helpers/funciones'

const Detalle = ({ selectEvent, getEventos }) => {

  const [edit, setEdit] = useState(false);

  const local = JSON.parse(localStorage.getItem('eventos'))
  const filterLocal = local.filter(item => item.id != selectEvent.id)

  const deleteBtn = () => {
    localStorage.setItem('eventos', JSON.stringify(filterLocal))
    getEventos()
  }

  const valorxNoche = formatoPesos(selectEvent.valorNoche)
  const diasArriendo = cantidadDiasArriendo(selectEvent.fechaInicio, selectEvent.fechaTermino)
  const costoTotalArriendo = formatoPesos(selectEvent.valorNoche*diasArriendo)
  // console.log(costoTotalArriendo)
  return (
    <Card className='containerDetalle'>
      {
        edit ? <Formulario selectEvent={selectEvent} getEventos={getEventos} setEdit={setEdit}/>
          : <CardContent className='containerInfo'>
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
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{selectEvent.fechaInicio}</Typography>
              </Card>
              <Card className='check'>
                <Typography sx={{ fontSize: 14, opacity: 0.4 }}>Salida</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{selectEvent.fechaTermino}</Typography>
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
              <Avatar sx={{ width: 56, height: 56 }} alt={`${selectEvent.titulo}`} src="/static/images/avatar/1.jpg" />
              <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{selectEvent.titulo}</Typography>
            </div>
            <Divider />
            <div className='containerInfoContacto'>
              <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Contacto info</Typography>
              <div className='detalleInfoContacto'>
                <Typography sx={{ fontSize: 12 }}>{selectEvent.correo}</Typography>
                <Typography sx={{ fontSize: 12 }}>+56 9 {selectEvent.celular}</Typography>
                <Typography sx={{ fontSize: 12 }}>{selectEvent.ubicacion}</Typography>
                <Button variant='contained' size='small'color='success' startIcon={<WhatsApp />} onClick={()=> enviarMensajeWhatsapp(`569${selectEvent.celular}`)}>Whatsapp</Button>
              </div>
            </div>
          </CardContent>}
    </Card>
  )
}

export default Detalle