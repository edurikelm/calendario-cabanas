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

        // if (doc.data().pago === false) {

        //     return data.push({ ...doc.data(), id: doc.id, color: 'red' })

        // }

        switch (doc.data().cabana) {
            case 'Teja Uno':
                data.push({ ...doc.data(), id: doc.id, color: '#329F5B' })
                break;
            case 'Teja Dos':
                data.push({ ...doc.data(), id: doc.id, color: '#963D5A' })
                break;
            case 'Regional Uno':
                data.push({ ...doc.data(), id: doc.id, color: '#1D4E89' })
                break;
            case 'Regional Dos':
                data.push({ ...doc.data(), id: doc.id, color: '#87A7C2' })

                break;
            case 'Regional Tres':
                data.push({ ...doc.data(), id: doc.id, color: '#D5C7BC' })
                break;

            default:
                break;
        }
        return data
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