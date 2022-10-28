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

export const ordenarDataArriendos = (arriendos) => {

    const data = []

    arriendos.map(item => { 

        switch (item.cabana) {
            case 'Teja Uno':
                data.push({ ...item, title: `${item.title} (${item.cabana})`, color: '#329F5B' })
                break;
            case 'Teja Dos':
                data.push({ ...item, title: `${item.title} (${item.cabana})`, color: '#963D5A' })
                break;
            case 'Regional Uno':
                data.push({ ...item, title: `${item.title} (${item.cabana})`, color: '#1D4E89' })
                break;
            case 'Regional Dos':
                data.push({ ...item, title: `${item.title} (${item.cabana})`, color: '#87A7C2' })

                break;
            case 'Regional Tres':
                data.push({ ...item, title: `${item.title} (${item.cabana})`, color: '#D5C7BC' })
                break;

            default:
                break;
        }

        return data

    })

    return data
}