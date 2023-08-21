import { db } from '../Firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
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

  const getDataWithQuery = async (
    collectionName,
    requirement1,
    requirement2,
    requirement3
  ) => {
    const q = query(
      collection(db, collectionName),
      where(requirement1, requirement2, requirement3)
    )

    const snap = await getDocs(q)

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

  const addData = async (collectionName, id, data) => {
    if (id) {
      await setDoc(doc(db, collectionName, id), data)
    } else {
      await setDoc(doc(collection(db, collectionName)), data)
    }
  }

  const deleteData = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id))
  }

  return {
    getDataAll,
    getDataWithQuery,
    getDataOne,
    addData,
    deleteData,
  }
}

export default useFirestore
