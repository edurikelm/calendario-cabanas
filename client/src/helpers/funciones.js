import { differenceInDays } from 'date-fns';

export const sumarDias = (fecha, dias) => {
    // console.log(fecha)
    fecha.setDate(fecha.getDate() + dias);
    return fecha;

}

export const enviarMensajeWhatsapp = (numero) => {
    return window.open(`https://wa.me/${numero}`)
}

export const formatoPesos = (monto) => {
    let format = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)
    return format
}

export const cantidadDiasArriendo = (fehcaEntrada, fechaSalida) => {

    const cantidadDias = differenceInDays(new Date(fechaSalida),new Date(fehcaEntrada)) 
    return cantidadDias
}