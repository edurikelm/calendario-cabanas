import { doc, collection, addDoc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "../firebase"

export const postArriendo = async (data) => {
    const nuevoArriendo = await addDoc(collection(db, 'arriendos'), data)
    return nuevoArriendo
}

export const getArriendos = async () => {

    const data = []

    const querySnapshot = await getDocs(collection(db, 'arriendos'))

    querySnapshot.forEach((doc) => {

        if (doc.data().pago === false) {

            return data.push({ ...doc.data(), id: doc.id, color: 'red' })

        }
        return data.push({ ...doc.data(), id: doc.id })
    })

    return data
}

export const deleteArriendo = async (id) => {

    const querySnapshot = await deleteDoc(doc(db, 'arriendos', id))

    return querySnapshot
}

export const editArriendo = async (id, data) => {

    const res = updateDoc(doc(db, 'arriendos', id), data)

    return res
}