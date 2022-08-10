import { collection, addDoc, getDoc, getDocs } from 'firebase/firestore'
import { db } from "../firebase"

export const postArriendo = async (data) => {
    const nuevoArriendo = await addDoc(collection(db, 'arriendos'), data)
    return nuevoArriendo
}

export const getArriendos = async () => {

    const data = []

    const querySnapshot = await getDocs(collection(db, 'arriendos'))

    querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id: doc.id})
    })

    return data
}

export const putArriendo = async (id) => {

    const querySnapshot = await getDocs(collection(db, 'arriendos'))


    return 
}
