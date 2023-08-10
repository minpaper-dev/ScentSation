import { db } from '../Firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite'

const useFirestore = () => {
  const getDataAll = async collectionName => {
    const ref = collection(db, collectionName)
    const snap = await getDocs(ref)
    const data = snap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))

    return data
  }

  const getDataOne = async (collectionName, id) => {
    const ref = doc(db, collectionName, id)
    const snap = await getDoc(ref)

    return snap
  }

  const addData = async (collection, id, data) => {
    await setDoc(doc(db, collection, id), data)
  }

  return {
    getDataAll,
    getDataOne,
    addData,
  }
}

export default useFirestore
