import { doc, collection, addDoc, deleteDoc, getDocs, updateDoc, where, query } from 'firebase/firestore'
import { db } from "../firebase"

export const postArriendo = async (data) => {
    const nuevoArriendo = await addDoc(collection(db, 'arriendos'), data)
    return nuevoArriendo
}

export const getArriendos = async () => {

    const data = []

    const querySnapshot = await getDocs(collection(db, 'arriendos'))

    querySnapshot.forEach((doc) => {

        return data.push({...doc.data(), id: doc.id})
    })

    return data
}

export const getArriendosPorCabana = async (cabana) => {
    
    const data = []

    if(cabana === 'Todos'){

        return getArriendos()

    }else{
        const q = query(collection(db, 'arriendos'),where('cabana', '==', cabana))
    
        const querySnapshot = await getDocs(q)
    
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(), id: doc.id})
        })
        
        return data;

    }

}

export const deleteArriendo = async (id) => {

    const querySnapshot = await deleteDoc(doc(db, 'arriendos', id))

    return querySnapshot
}

export const editArriendo = async (id, data) => {

    const res = updateDoc(doc(db, 'arriendos', id), data)

    return res
}