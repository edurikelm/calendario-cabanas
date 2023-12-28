import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import swal from 'sweetalert';
import { sumarIngresos } from './funciones';

export const postArriendo = async (data) => {
  const nuevoArriendo = await addDoc(collection(db, 'arriendos'), data);

  swal({
    title: 'Guardar Evento',
    text: 'Se ha guardado correctamente el evento',
    icon: 'success',
    button: 'Cerrar',
  });
  return nuevoArriendo;
};

export const getArriendos = async () => {
  const data = [];

  const querySnapshot = await getDocs(collection(db, 'arriendos'));

  querySnapshot.forEach((doc) => {
    return data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

export const getArriendosPorCabana = async (cabana) => {
  const data = [];

  if (cabana === 'Todos') {
    return getArriendos();
  } else {
    const q = query(collection(db, 'arriendos'), where('cabana', '==', cabana));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  }
};

export const deleteArriendo = async (id) => {
  const respuesta = await swal({
    title: 'Eliminar Evento',
    text: 'Esta seguro de eliminar este evento?',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })

  if (respuesta) {
    const querySnapshot = await deleteDoc(doc(db, 'arriendos', id));
    
    swal('Se ha eliminado con exito este evento', {
      icon: 'success',
    });

    return querySnapshot;

  } else {
    swal('No se ha eliminado el evento');
  }
};

export const editArriendo = async (id, data) => {
  const res = await updateDoc(doc(db, 'arriendos', id), data);
  swal({
    title: 'Editar Evento',
    text: 'Se ha editado correctamente el evento',
    icon: 'success',
    button: 'Cerrar',
  });
  return res;
};

export const getTotalIngresosPorMes = async (valor) => {
  const mes = valor.toLowerCase();
  const suma = 0;

  if (valor === 'Todos') {
    return sumarIngresos();
  } else {
    const arriendos = await getArriendos()
    const filtrarArriendos = arriendos.filter(item => new Date(item.start).toLocaleDateString('default', { month: 'long' }) === mes)
    const mapFiltrarArriendos = filtrarArriendos.map(item => Number(item.valorTotal))
    const sumarIngresos = mapFiltrarArriendos.reduce((a, b) => a + b, suma)

    return sumarIngresos;
  }
}
